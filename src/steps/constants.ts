import {
  RelationshipClass,
  RelationshipDirection,
  StepEntityMetadata,
  StepMappedRelationshipMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const SERVICE_ENTITY_KEY = 'service_entity';

export const Steps = {
  ORGANIZATIONS: 'fetch-organization',
  TEAMS: 'fetch-teams',
  ROLES: 'fetch-roles',
  BUILD_ORG_REPO_RELATIONSHIP: 'build-organization-repository-relationship',
  SERVICE: 'fetch-service',
  TEAMS_ASSIGNED_PROJECT: 'fetch-teams-assignments',
  PROJECTS: 'fetch-projects',
  ISSUES: 'fetch-project-issues',
  USERS: 'fetch-members',
  USER_MEMBERSHIP: 'fetch-teams-members',
};

export const Entities: Record<
  | 'ORGANIZATION'
  | 'TEAM'
  | 'PROJECT'
  | 'MEMBER'
  | 'SERVICE'
  | 'VULNERABILITY'
  | 'ROLE'
  | 'FINDING',
  StepEntityMetadata
> = {
  ORGANIZATION: {
    resourceName: 'Organization',
    _type: 'sentry_organization',
    _class: ['Account'],
  },
  TEAM: {
    resourceName: 'Team',
    _type: 'sentry_team',
    _class: ['UserGroup'],
  },
  PROJECT: {
    resourceName: 'Project',
    _type: 'sentry_project',
    _class: ['Project'],
  },
  MEMBER: {
    resourceName: 'Member',
    _type: 'sentry_member',
    _class: ['User'],
  },
  SERVICE: {
    resourceName: 'Service',
    _type: 'sentry_service',
    _class: ['Service'],
  },
  ROLE: {
    resourceName: 'Role',
    _type: 'sentry_role',
    _class: ['AccessRole'],
  },
  FINDING: {
    resourceName: 'Finding',
    _type: 'sentry_finding',
    _class: ['Finding'],
  },
  VULNERABILITY: {
    resourceName: 'Source Vulnerability',
    _type: 'sentry_vulnerability',
    _class: ['Vulnerability'],
  },
};

export const MappedRelationships: Record<
  'PROJECT_HAS_REPO' | 'ORGANIZATION_HAS_REPO',
  StepMappedRelationshipMetadata
> = {
  PROJECT_HAS_REPO: {
    _type: 'sentry_project_has_repository',
    sourceType: Entities.PROJECT._type,
    _class: RelationshipClass.HAS,
    targetType: 'repository',
    direction: RelationshipDirection.FORWARD,
  },
  ORGANIZATION_HAS_REPO: {
    _type: 'sentry_organization_has_repository',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: 'repository',
    direction: RelationshipDirection.FORWARD,
  },
};

export const Relationships: Record<
  | 'ORGANIZATION_HAS_SERVICE'
  | 'ORGANIZATION_HAS_TEAM'
  | 'ORGANIZATION_HAS_PROJECT'
  | 'ORGANIZATION_HAS_USER'
  | 'TEAM_ASSIGNED_PROJECT'
  | 'MEMBER_ASSIGNED_ROLE'
  | 'ORGANIZATION_HAS_ROLE'
  | 'PROJECT_HAS_FINDING'
  | 'FINDING_EXPLOITS_VULNERABILITY'
  | 'TEAM_HAS_USER',
  StepRelationshipMetadata
> = {
  ORGANIZATION_HAS_TEAM: {
    _type: 'sentry_organization_has_team',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.TEAM._type,
  },
  ORGANIZATION_HAS_PROJECT: {
    _type: 'sentry_organization_has_project',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.PROJECT._type,
  },
  ORGANIZATION_HAS_USER: {
    _type: 'sentry_organization_has_member',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.MEMBER._type,
  },
  TEAM_ASSIGNED_PROJECT: {
    _type: 'sentry_team_assigned_project',
    sourceType: Entities.TEAM._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.PROJECT._type,
  },
  TEAM_HAS_USER: {
    _type: 'sentry_team_has_member',
    sourceType: Entities.TEAM._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.MEMBER._type,
  },
  ORGANIZATION_HAS_SERVICE: {
    _type: 'sentry_organization_has_service',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.SERVICE._type,
  },
  ORGANIZATION_HAS_ROLE: {
    _type: 'sentry_organization_has_role',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ROLE._type,
  },
  MEMBER_ASSIGNED_ROLE: {
    _type: 'sentry_member_assigned_role',
    sourceType: Entities.MEMBER._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.ROLE._type,
  },
  PROJECT_HAS_FINDING: {
    _type: 'sentry_project_has_finding',
    sourceType: Entities.PROJECT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.FINDING._type,
  },
  FINDING_EXPLOITS_VULNERABILITY: {
    _type: 'sentry_finding_exploits_vulnerability',
    sourceType: Entities.FINDING._type,
    _class: RelationshipClass.EXPLOITS,
    targetType: Entities.VULNERABILITY._type,
  },
};
