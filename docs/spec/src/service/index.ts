import { StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const serviceSpec: StepSpec<IntegrationConfig>[] = [
  /**
   * ENDPOINT: N/A
   * PATTERN: Build Child Relationships
   */

  {
    id: 'fetch-service',
    name: 'Fetch Service',
    entities: [
      {
        resourceName: 'Service',
        _type: 'sentry_service',
        _class: ['Service'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
];
