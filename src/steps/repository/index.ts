import {
  createMappedRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { SentryOrganization } from '../../types';
import { Entities, MappedRelationships, Steps } from '../constants';

export async function buildOrgRepoRelationship({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.ORGANIZATION._type },
    async (orgEntity) => {
      const organization = getRawData<SentryOrganization>(orgEntity);

      if (!organization) {
        logger.warn(
          { _key: orgEntity._key },
          'Could not get raw data for organization entity',
        );
        return;
      }

      await apiClient.iterateOrganizationRepositories(async (repo) => {
        await jobState.addRelationship(
          createMappedRelationship({
            _class: MappedRelationships.ORGANIZATION_HAS_REPO._class,
            _type: MappedRelationships.ORGANIZATION_HAS_REPO._type,
            _mapping: {
              relationshipDirection:
                MappedRelationships.ORGANIZATION_HAS_REPO.direction,
              sourceEntityKey: orgEntity._key,
              targetFilterKeys: [['webLink', '_class']],
              targetEntity: {
                _class: 'CodeRepo',
                webLink: repo.url,
              },
            },
          }),
        );
      });
    },
  );
}

export const repoSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.BUILD_ORG_REPO_RELATIONSHIP,
    name: 'Build Organization and Repository Mapped Relationship',
    entities: [],
    relationships: [],
    dependsOn: [Steps.ORGANIZATIONS],
    mappedRelationships: [MappedRelationships.ORGANIZATION_HAS_REPO],
    executionHandler: buildOrgRepoRelationship,
  },
];
