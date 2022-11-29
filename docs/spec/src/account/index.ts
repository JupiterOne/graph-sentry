import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const accountSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Singleton
     */
    id: 'fetch-organization',
    name: 'Fetch Organization Details',
    entities: [
      {
        resourceName: 'Organization',
        _type: 'sentry_organization',
        _class: ['Account'],
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: 'sentry_organization_has_service',
        sourceType: 'sentry_organization',
        targetType: 'sentry_service',
      },
    ],
    dependsOn: ['fetch-service'],
    implemented: true,
  },
];
