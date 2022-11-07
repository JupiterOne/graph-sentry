import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

export function createServiceEntity(): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {},
      assign: {
        _key: `sentry-service`,
        _type: Entities.SERVICE._type,
        _class: Entities.SERVICE._class,
        name: 'Sentry',
        category: ['platform'],
        function: ['project-management'],
      },
    },
  });
}
