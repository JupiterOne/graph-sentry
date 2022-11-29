import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { SentryOrganization } from '../../types';

import { Entities } from '../constants';

export function getRoleKey(name: string) {
  return `sentry-role:${name}`;
}

export function createRoleEntity(
  role: SentryOrganization['orgRoleList'][0],
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _key: getRoleKey(role.id),
        _type: Entities.ROLE._type,
        _class: Entities.ROLE._class,
        name: role.name,
        desc: role.desc,
        allowed: role.allowed,
        isAllowed: role.isAllowed,
        isRetired: role.isRetired,
        isGlobal: role.isGlobal,
        minimumTeamRole: role.minimumTeamRole,
      },
    },
  });
}
