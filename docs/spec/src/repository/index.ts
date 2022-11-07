import {
  RelationshipClass,
  RelationshipDirection,
  StepSpec,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const repositorySpec: StepSpec<IntegrationConfig>[] = [
  /**
   * ENDPOINT: N/A
   * PATTERN: Build Mapped Relationships
   */

  {
    id: 'build-organization-repository-relationship',
    name: 'Build Organization and Repository Mapped Relationship',
    entities: [],
    relationships: [],
    dependsOn: ['fetch-organization'],
    mappedRelationships: [
      {
        _type: 'sentry_organization_has_repository',
        sourceType: 'sentry_organization',
        _class: RelationshipClass.HAS,
        targetType: 'repository',
        direction: RelationshipDirection.FORWARD,
      },
    ],
    implemented: true,
  },
];
