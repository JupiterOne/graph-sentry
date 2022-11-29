import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { SentryIssue } from '../../types';

import { Entities } from '../constants';

export function createFindingEntity(issue: SentryIssue): Entity {
  return createIntegrationEntity({
    entityData: {
      source: issue,
      assign: {
        _key: `sentry-finding:${issue.id}`,
        _type: Entities.FINDING._type,
        _class: Entities.FINDING._class,
        id: issue.id,
        shortId: issue.shortId,
        name: issue.id,
        title: issue.title,
        culprit: issue.culprit,
        webLink: issue.permalink,
        level: issue.level,
        status: issue.status,
        platform: issue.platform,
        projectSlug: issue.project.slug,
        projectPlatform: issue.project.platform,
        type: issue.type,
        numComments: issue.numComments,
        isBookmarked: issue.isBookmarked,
        isSubscribed: issue.isSubscribed,
        hasSeen: issue.hasSeen,
        issueType: issue.issueType,
        issueCategory: issue.issueCategory,
        isUnhandled: issue.isUnhandled,
        count: issue.count,
        userCount: issue.userCount,
        firstSeenOn: parseTimePropertyValue(issue.firstSeen),
        lastSeenOn: parseTimePropertyValue(issue.lastSeen),
        category: 'application',
        severity: 'unknown',
        numericSeverity: 0,
        open: issue.status === 'unresolved',
        public: issue.isPublic,
      },
    },
  });
}
