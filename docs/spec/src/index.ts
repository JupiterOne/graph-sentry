import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accessSpec } from './access';
import { accountSpec } from './account';
import { issueSpec } from './issue';
import { repositorySpec } from './repository';
import { roleSpec } from './roles';
import { serviceSpec } from './service';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...accessSpec,
    ...issueSpec,
    ...repositorySpec,
    ...roleSpec,
    ...serviceSpec,
  ],
};
