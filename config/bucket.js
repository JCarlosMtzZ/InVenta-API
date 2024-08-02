import oci from 'oci-sdk';
import common from 'oci-common';

const configFilePath = 'config/.oci/config';
const profile = 'DEFAULT';

const provider = new common.ConfigFileAuthenticationDetailsProvider(configFilePath, profile);

export const bucketClient = new oci.objectstorage.ObjectStorageClient({
  authenticationDetailsProvider: provider
});