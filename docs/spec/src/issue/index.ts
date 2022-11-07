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
      {
        resourceName: 'Source Vulnerability',
        _type: 'sentry_vulnerability',
        _class: ['Vulnerability'],
      },
    ],
    relationships: [
      {
        _type: 'sentry_project_has_finding',
        sourceType: 'sentry_project',
        _class: RelationshipClass.HAS,
        targetType: 'sentry_finding',
      },
      {
        _type: 'sentry_finding_exploits_vulnerability',
        sourceType: 'sentry_finding',
        _class: RelationshipClass.EXPLOITS,
        targetType: 'sentry_vulnerability',
      },
    ],
    dependsOn: ['fetch-projects'],
    implemented: true,
  },
];
