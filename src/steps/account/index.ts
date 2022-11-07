import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import {
  Entities,
  Relationships,
  SERVICE_ENTITY_KEY,
  Steps,
} from '../constants';
import { createOrganizationEntity } from './converter';

export async function fetchOrganizations({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const serviceEntity = (await jobState.getData(SERVICE_ENTITY_KEY)) as Entity;

  await apiClient.iterateOrganizations(async (orgData) => {
    const organizationEntity = await jobState.addEntity(
      createOrganizationEntity(orgData),
    );

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        to: serviceEntity,
        from: organizationEntity,
      }),
    );
  });
}

export const organizationSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ORGANIZATIONS,
    name: 'Fetch Organization Details',
    entities: [Entities.ORGANIZATION],
    relationships: [Relationships.ORGANIZATION_HAS_SERVICE],
    dependsOn: [Steps.SERVICE],
    executionHandler: fetchOrganizations,
  },
];
