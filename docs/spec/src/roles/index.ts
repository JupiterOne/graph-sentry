import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const roleSpec: StepSpec<IntegrationConfig>[] = [
  /**
   * ENDPOINT: N/A
   * PATTERN: Build Child Relationships
   */

  {
    id: 'fetch-roles',
    name: 'Fetch Roles',
    entities: [
      {
        resourceName: 'Role',
        _type: 'sentry_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [
      {
        _type: 'sentry_organization_has_role',
        sourceType: 'sentry_organization',
        _class: RelationshipClass.HAS,
        targetType: 'sentry_role',
      },
    ],
    dependsOn: ['fetch-organization'],
    implemented: true,
  },
];
