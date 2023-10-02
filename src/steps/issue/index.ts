import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { SentryProject } from '../../types';
import { Entities, Relationships, Steps } from '../constants';
import { createFindingEntity } from './converter';

export async function fetchProjectIssues({
  jobState,
  instance,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.PROJECT._type },
    async (projectEntity) => {
      const project = getRawData<SentryProject>(projectEntity);

      if (!project) {
        logger.warn(
          { _key: projectEntity._key },
          'Could not get raw data for project entity',
        );
        return;
      }

      await apiClient.iterateProjectIssues(project.slug, async (issue) => {
        const findingEntity = createFindingEntity(issue);

        if (jobState.hasKey(findingEntity._key)) return;

        const addedFindingEntity = await jobState.addEntity(findingEntity);

        await jobState.addRelationships([
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: projectEntity,
            to: addedFindingEntity,
          }),
        ]);
      });
    },
  );
}

export const findingSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ISSUES,
    name: 'Fetch Project Issues',
    entities: [Entities.FINDING],
    relationships: [Relationships.PROJECT_HAS_FINDING],
    dependsOn: [Steps.PROJECTS],
    executionHandler: fetchProjectIssues,
  },
];
