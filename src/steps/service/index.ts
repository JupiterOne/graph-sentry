import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { Entities, SERVICE_ENTITY_KEY, Steps } from '../constants';
import { createServiceEntity } from './converter';

export async function fetchService({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const serviceEntity = await jobState.addEntity(createServiceEntity());

  await jobState.setData(SERVICE_ENTITY_KEY, serviceEntity);
}

export const serviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.SERVICE,
    name: 'Fetch Service',
    entities: [Entities.SERVICE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchService,
  },
];
