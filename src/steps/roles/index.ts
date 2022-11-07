import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { SentryOrganization } from '../../types';
import { Entities, Relationships, Steps } from '../constants';
import { createRoleEntity } from './converter';

export async function fetchRoles({
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.ORGANIZATION._type },
    async (organizationEntity) => {
      const organization = getRawData<SentryOrganization>(organizationEntity);

      if (!organization) {
        logger.warn(
          { _key: organizationEntity._key },
          'Could not get raw data for organization entity',
        );
        return;
      }

      for (const role of organization.orgRoleList) {
        const roleEntity = await jobState.addEntity(createRoleEntity(role));

        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: organizationEntity,
            to: roleEntity,
          }),
        );
      }
    },
  );
}

export const roleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ROLES,
    name: 'Fetch Roles',
    entities: [Entities.ROLE],
    relationships: [Relationships.ORGANIZATION_HAS_ROLE],
    dependsOn: [Steps.ORGANIZATIONS],
    executionHandler: fetchRoles,
  },
];
