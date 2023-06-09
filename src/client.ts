import Axios, * as axios from 'axios';
import parse from 'parse-link-header';
import { IntegrationProviderAuthenticationError } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import {
  SentryOrganization,
  SentryTeam,
  SentryProject,
  SentryUser,
  SentryOrganizationRepository,
  SentryIssue,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  private axiosInstance: axios.AxiosInstance;
  private sentryBaseUrl: string;
  private sentryOrganization: string | null;

  constructor(readonly config: IntegrationConfig) {
    this.axiosInstance = Axios.create({
      headers: {
        Authorization: 'Bearer ' + config.authToken,
      },
    });
    this.sentryBaseUrl = 'https://sentry.io/api/0/';

    this.sentryOrganization = config.organizationSlug;
  }

  public async verifyAuthentication(): Promise<void> {
    // A call to the baseURL will return a valid 200 status as long as we have a
    // valid bearer token for authentication.
    try {
      await this.axiosInstance.get(this.sentryBaseUrl);
    } catch (err) {
      const response = err.response || {};

      throw new IntegrationProviderAuthenticationError({
        endpoint: this.sentryBaseUrl,
        status: response.status,
        statusText: response.statusText,
      });
    }
  }

  /**
   * Iterates each group resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateOrganizations(
    iteratee: ResourceIteratee<SentryOrganization>,
  ): Promise<void> {
    const url = `${this.sentryBaseUrl}organizations/${this.sentryOrganization}/`;

    const orgResponse = await this.axiosInstance.get(url);
    const orgResults = orgResponse.data;

    await iteratee(orgResults);
  }

  /**
   * Iterates each organization repository resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateOrganizationRepositories(
    iteratee: ResourceIteratee<SentryOrganizationRepository>,
  ): Promise<void> {
    let url = `${this.sentryBaseUrl}organizations/${this.sentryOrganization}/repos/`;

    while (url) {
      const orgRepoResponse = await this.axiosInstance.get(url);
      const orgRepoResults = orgRepoResponse.data;

      const orgRepoHeaders = orgRepoResponse.headers;
      url = this.getNextUrl(orgRepoHeaders.link);
      for (const orgRepo of orgRepoResults) {
        await iteratee(orgRepo);
      }
    }
  }

  /**
   * Iterates each group resource in the provider.
   *
   * @param orgSlug added to URL to specify correct Sentry organization
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateTeams(
    organizationSlug: string,
    iteratee: ResourceIteratee<SentryTeam>,
  ): Promise<void> {
    let url = `${this.sentryBaseUrl}organizations/${organizationSlug}/teams/`;

    while (url) {
      const teamResponse = await this.axiosInstance.get(url);
      const teamResults = teamResponse.data;

      const teamHeaders = teamResponse.headers;
      url = this.getNextUrl(teamHeaders.link); //results=true when more than 100 results are available

      for (const team of teamResults) {
        await iteratee(team);
      }
    }
  }

  /**
   * Iterates each project resource in the provider.
   *
   * @param orgSlug added to URL to specify correct Sentry organization
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateProjects(
    organizationSlug: string,
    iteratee: ResourceIteratee<SentryProject>,
  ): Promise<void> {
    let url = `${this.sentryBaseUrl}organizations/${organizationSlug}/projects/`;

    while (url) {
      const projectResponse = await this.axiosInstance.get(url);
      const projectResults = projectResponse.data;

      const projectHeaders = projectResponse.headers;
      url = this.getNextUrl(projectHeaders.link); //results=true when more than 100 results are available

      for (const project of projectResults) {
        await iteratee(project);
      }
    }
  }

  /**
   * Iterates each project issue resource in the provider.
   *
   * @param projectSlug added to URL to specify correct Sentry prokect
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateProjectIssues(
    projectSlug: string,
    iteratee: ResourceIteratee<SentryIssue>,
  ): Promise<void> {
    let url = `${this.sentryBaseUrl}projects/${this.sentryOrganization}/${projectSlug}/issues/`;

    while (url) {
      const projectIssueResponse = await this.axiosInstance.get(url);
      const projectIssueResults = projectIssueResponse.data;

      const projectIssueHeaders = projectIssueResponse.headers;
      url = this.getNextUrl(projectIssueHeaders.link); //results=true when more than 100 results are available

      for (const projectIssue of projectIssueResults) {
        await iteratee(projectIssue);
      }
    }
  }

  /**
   * Iterates each user resource in the provider.
   *
   * @param orgSlug added to URL to specify correct Sentry organization
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateUsers(
    organizationSlug: string,
    iteratee: ResourceIteratee<SentryUser>,
  ): Promise<void> {
    let url = `${this.sentryBaseUrl}organizations/${organizationSlug}/members/`;

    while (url) {
      const userResponse = await this.axiosInstance.get(url);
      const userResults = userResponse.data;

      const userHeaders = userResponse.headers;
      url = this.getNextUrl(userHeaders.link); //results=true when more than 100 results are available

      for (const user of userResults) {
        await iteratee(user);
      }
    }
  }

  /**
   * Iterates each team resource in the provider.
   *
   * @param orgSlug added to URL to specify correct Sentry organization
   * @param teamSlug added to URL to specify correct Sentry team
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateTeamAssignments(
    orgSlug: string,
    teamSlug: string,
    iteratee: ResourceIteratee<SentryUser>,
  ): Promise<void> {
    let url = `${this.sentryBaseUrl}teams/${orgSlug}/${teamSlug}/members/`;

    while (url) {
      const teamAssignmentResponse = await this.axiosInstance.get(url);
      const teamAssignmentResults = teamAssignmentResponse.data;

      const teamAssignmentHeaders = teamAssignmentResponse.headers;
      url = this.getNextUrl(teamAssignmentHeaders.link); //results=true when more than 100 results are available

      for (const member of teamAssignmentResults) {
        await iteratee(member);
      }
    }
  }

  private getNextUrl(linkHeader?: string): string | undefined {
    if (linkHeader) {
      const parsed = parse(linkHeader);
      if (parsed.next.results == 'true') {
        return parsed.next.url;
      }
      return;
    }
    return;
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
