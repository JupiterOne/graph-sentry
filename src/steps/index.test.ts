import { createMockStepExecutionContext } from '@jupiterone/integration-sdk-testing';

import { IntegrationConfig } from '../config';
import { fetchOrganizations } from './account';
import {
  fetchUsers,
  fetchTeams,
  fetchUserAssignments,
  fetchProjects,
  fetchTeamsAssignments,
} from './access';
import { integrationConfig } from '../../test/config';
import { Recording, setupSentryRecording } from '../../test/recording';
import { fetchService } from './service';
import { fetchRoles } from './roles';
import { buildOrgRepoRelationship } from './repository';
import { fetchProjectIssues } from './issue';

let recording: Recording;

function isRecordingEnabled() {
  return Boolean(process.env.LOAD_ENV) === true;
}

test('should collect data', async () => {
  const context = createMockStepExecutionContext<IntegrationConfig>({
    instanceConfig: integrationConfig,
  });
  recording = setupSentryRecording({
    directory: __dirname,
    name: 'should collect data',
    options: {
      mode: isRecordingEnabled() ? 'record' : 'replay',
    },
  });

  // Simulates dependency graph execution.
  // See https://github.com/JupiterOne/sdk/issues/262.
  await fetchService(context);
  await fetchOrganizations(context);
  await fetchTeams(context);
  await fetchProjects(context);
  await fetchTeamsAssignments(context);
  await fetchRoles(context);
  await fetchUsers(context);
  await fetchUserAssignments(context);
  await buildOrgRepoRelationship(context);
  await fetchProjectIssues(context);

  // Review snapshot, failure is a regression
  expect({
    numCollectedEntities: context.jobState.collectedEntities.length,
    numCollectedRelationships: context.jobState.collectedRelationships.length,
    collectedEntities: context.jobState.collectedEntities,
    collectedRelationships: context.jobState.collectedRelationships,
    encounteredTypes: context.jobState.encounteredTypes,
  }).toMatchSnapshot();

  const accounts = context.jobState.collectedEntities.filter((e) =>
    e._class.includes('Account'),
  );
  expect(accounts.length).toBeGreaterThan(0);
  expect(accounts).toMatchGraphObjectSchema({
    _class: ['Account'],
    schema: {
      additionalProperties: false,
      properties: {
        _type: { const: 'sentry_organization' },
        slug: { type: 'string' },
        _rawData: {
          type: 'array',
          items: { type: 'object' },
        },
      },
      required: ['slug'],
    },
  });

  const users = context.jobState.collectedEntities.filter((e) =>
    e._class.includes('User'),
  );
  expect(users.length).toBeGreaterThan(0);
  expect(users).toMatchGraphObjectSchema({
    _class: ['User'],
    schema: {
      additionalProperties: false,
      properties: {
        _type: { const: 'sentry_member' },
        username: { type: 'string' },
        role: { type: 'string' },
        mfaEnabled: { type: 'boolean' },
        active: { type: 'boolean' },
        isManaged: { type: 'boolean' },
        isStaff: { type: 'boolean' },
        isSuperuser: { type: 'boolean' },
        dateJoined: { type: 'number' },
        lastActive: { type: 'number' },
        lastLogin: { type: 'number' },
        _rawData: {
          type: 'array',
          items: { type: 'object' },
        },
      },
      required: ['username'],
    },
  });

  const userGroups = context.jobState.collectedEntities.filter((e) =>
    e._class.includes('UserGroup'),
  );
  expect(userGroups.length).toBeGreaterThan(0);
  expect(userGroups).toMatchGraphObjectSchema({
    _class: ['UserGroup'],
    schema: {
      additionalProperties: false,
      properties: {
        _type: { const: 'sentry_team' },
        slug: { type: 'string' },
        _rawData: {
          type: 'array',
          items: { type: 'object' },
        },
      },
      required: ['slug'],
    },
  });

  const projects = context.jobState.collectedEntities.filter((e) =>
    e._class.includes('Project'),
  );
  expect(projects.length).toBeGreaterThan(0);
  expect(projects).toMatchGraphObjectSchema({
    _class: ['Project'],
    schema: {
      additionalProperties: false,
      properties: {
        _type: { const: 'sentry_project' },
        name: { type: 'string' },
        _rawData: {
          type: 'array',
          items: { type: 'object' },
        },
      },
      required: ['name'],
    },
  });

  if (recording) {
    await recording.stop();
  }
});
