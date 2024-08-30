import { QueryTypes, literal, col, Op } from 'sequelize';
import { sequelize } from '../config/db.js';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { Admin } from '../models/Admin.js';
import { Order } from '../models/Order.js';
import { OrderItem } from '../models/OrderItem.js';

import { getOrdersMinDate, getOrdersMaxDate } from './Common.js';

export const getAdmins = async () => {
    const admins = await Admin.findAll({
        attributes: { exclude: ['password'] }
    });
    return admins;
};

export const getAdminById = async (id) => {
    const admin = await Admin.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
    return admin;
};

export const getAdminByEmail = async (email) => {
    const admin = await Admin.findOne({
        where: { email: email }
    });
    return admin;
};

export const addAdmin = async (body) => {
    const id = uuidv4();
    const {
        firstName,
        lastName,
        email,
        password
    } = body;
    const newAdmin = await Admin.create({
        id,
        firstName,
        lastName,
        email,
        password
    });
    return newAdmin;
};

export const updateAdmin = async (admin, body) => {
    admin.set(body);
    await admin.save();
    return admin;
};

export const deleteAdmin = async (id) => {
    await Admin.destroy({
        where: { id }
    });
};

export const getAdminsSummariesByDateRange = async (sDate, eDate) => {
    const summaries = await Order.findAll({
        attributes: [
            [col('Admin.id'), 'adminId'],
            [literal(`"Admin"."firstName" || ' ' || "Admin"."lastName"`), 'adminFullName'],
            [col('Admin.email'), 'adminEmail'],
            [literal('CAST(SUM("OrderItems"."quantity") AS INTEGER)'), 'totalUnits'],
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."unitPrice" * "OrderItems"."quantity") AS NUMERIC), 2) AS FLOAT)'), 'subtotal'],
            [literal('CAST(ROUND(CAST(SUM("OrderItems"."netUnitPrice" * "OrderItems"."quantity") AS NUMERIC), 2) AS FLOAT)'), 'total']
        ],
        include: [{
            model: Admin,
            attributes: []
        }, 
        {
            model: OrderItem,
            attributes: []
        }],
        where: {
            date: {
                [Op.gte]: sDate,
                [Op.lte]: eDate
            }
        },
        group: [
            'Admin.id'
        ],
        raw:true
    });
    return summaries;
};

export const getAdminsMonthlySummariesByDateRange = async (sDate, eDate) => {
    const admins = await Admin.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email']
    });

    let dateRange = [{}];

    if (sDate && eDate) {
        dateRange[0] = {
            startdate: new Date(sDate),
            enddate: new Date(eDate)
        };
    } else if (sDate) {
        const maxDate = await getOrdersMaxDate();
        dateRange[0] = {
            startdate: new Date(sDate),
            enddate: new Date(maxDate[0].enddate)
        };
    } else if (eDate) {
        const minDate = await getOrdersMinDate();
        dateRange[0] = {
            startdate: new Date(minDate[0].startdate),
            enddate: new Date(eDate)
        };
    } else {
        const minDate = await getOrdersMinDate();
        const maxDate = await getOrdersMaxDate();
        dateRange[0] = {
            startdate: new Date(minDate[0].startdate),
            enddate: new Date(maxDate[0].enddate)
        };
    }
    
    let startDate = moment(dateRange[0].startdate).utc().startOf('month').startOf('day').add(14, 'days');
    let endDate = moment(dateRange[0].enddate).utc().startOf('month').startOf('day').add(14, 'days');
    
    let allMonths = [];
    let currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate, 'month')) {
        allMonths.push(currentDate.clone().toISOString());
        currentDate.add(1, 'month').startOf('month').startOf('day').add(14, 'days');
    }
    
    for (let admin of admins) {
        const monthlySummary = await sequelize.query(`
          SELECT 
            DATE_TRUNC('month', "o"."date") + INTERVAL '14 day' as month,
            CAST(SUM("oi"."quantity") as INTEGER)  as "totalUnits",
            CAST(ROUND(CAST(SUM("oi"."unitPrice" * "oi"."quantity") as NUMERIC), 2) as FLOAT) as "subtotal",
            CAST(ROUND(CAST(SUM("oi"."netUnitPrice" * "oi"."quantity") as NUMERIC), 2) as FLOAT) as "total",
            CAST(COUNT(DISTINCT "o"."id") as INTEGER) as "orderCount"
          FROM "Orders" AS "o"
          LEFT JOIN "OrderItems" AS "oi" ON "o"."id" = "oi"."orderId"
          WHERE "o"."adminId" = :adminId AND "o"."date" >= :startDate AND "o"."date" <= :endDate
          GROUP BY DATE_TRUNC('month', "o"."date") + INTERVAL '14 day'
          ORDER BY DATE_TRUNC('month', "o"."date") + INTERVAL '14 day' ASC
        `, {
          replacements: {
            adminId: admin.id,
            startDate: new Date(dateRange[0].startdate),
            endDate: new Date(dateRange[0].enddate)
         },
          type: QueryTypes.SELECT
        });

        const filledMonthlySummary = allMonths.map(month => {
            const foundMonth = monthlySummary.find(m => {
                return moment(m.month).isSame(moment(month), 'month');
            });
            return foundMonth || {
                month,
                totalUnits: 0,
                subtotal: 0,
                total: 0,
                orderCount: 0
            };
        });
    
        admin.setDataValue('monthlySummary', filledMonthlySummary);
    }
    
    return admins;
};