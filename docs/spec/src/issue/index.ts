import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const issueSpec: StepSpec<IntegrationConfig>[] = [
  /**
   * ENDPOINT: /api/0projects/{sentryOrganization}/{projectSlug}/issues/
   * PATTERN: Fetch Entities
   */

  {
    id: 'fetch-project-issues',
    name: 'Fetch Project Issues',
    entities: [
      {
        resourceName: 'Finding',
        _type: 'sentry_finding',
        _class: ['Finding'],
      },
    ],
    relationships: [
      {
        _type: 'sentry_project_has_finding',
        sourceType: 'sentry_project',
        _class: RelationshipClass.HAS,
        targetType: 'sentry_finding',
      },
    ],
    dependsOn: ['fetch-projects'],
    implemented: true,
  },
];
