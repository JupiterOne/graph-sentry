export interface SentryOrganization {
  id: string;
  slug: string;
  status: { id: string; name: string };
  name: string;
  dateCreated: string;
  isEarlyAdopter: boolean;
  require2FA: boolean;
  requireEmailVerification: boolean;
  avatar: { avatarType: string; avatarUuid: string };
  features: string[];
  links: {
    organizationUrl: string;
    regionUrl: string;
  };
  hasAuthProvider: boolean;
  experiments: {
    OnboardingHighlightWizardExperiment: number;
    MobilePerformanceAdoptionExperiment: number;
  };
  quota: {
    maxRate: number;
    maxRateInterval: number;
    accountLimit: number;
    projectLimit: number;
  };
  isDefault: boolean;
  defaultRole: string;
  availableRoles: { id: string; name: string }[];
  orgRoleList: {
    id: string;
    name: string;
    desc: string;
    allowed: boolean;
    isAllowed: boolean;
    isRetired: boolean;
    is_global: boolean;
    isGlobal: boolean;
    minimumTeamRole: string;
  }[];
  openMembership: boolean;
  allowSharedIssues: boolean;
  enhancedPrivacy: boolean;
  dataScrubber: boolean;
  dataScrubberDefaults: boolean;
  storeCrashReports: number;
  attachmentsRole: string;
  debugFilesRole: string;
  eventsMemberAdmin: boolean;
  alertsMemberWrite: boolean;
  scrubIPAddresses: boolean;
  scrapeJavaScript: boolean;
  allowJoinRequests: boolean;
  access: string[];
  role: string;
  orgRole: string;
  pendingAccessRequests: number;
  onboardingTasks: {
    task: string;
    status: string;
    dateCompleted: string;
  }[];
  teams: {
    id: string;
    slug: string;
    name: string;
    dateCreated: string;
    isMember: boolean;
    teamRole: string;
    hasAccess: boolean;
    isPending: boolean;
    memberCount: number;
  }[];
  projects: {
    id: string;
    name: string;
    slug: string;
    isBookmarked: boolean;
    isMember: boolean;
    hasAccess: boolean;
    dateCreated: string;
    firstTransactionEvent: boolean;
    hasSessions: boolean;
    hasProfiles: boolean;
    hasReplays: boolean;
    platform: string;
    hasUserReports: boolean;
  }[];
}

export interface SentryTeam {
  id: string;
  name: string;
  slug: string;
  projects: SentryProject[];
}

export interface SentryProject {
  id: string;
  name: string;
  slug: string;
}

export interface SentryUser {
  id: string;
  name: string;
  email: string;
  role: string;
  dateCreated: string; // Date
  user?: {
    dateJoined: string; // Date
    has2fa: boolean;
    hasPasswordAuth: boolean;
    isActive: boolean;
    isManaged: boolean;
    isStaff: boolean;
    isSuperuser: boolean;
    lastActive: string; // Date
    lastLogin: string; // Date
  };
  projects?: SentryProject[];
}

export interface SentryOrganizationRepository {
  id: string;
  name: string;
  url: string;
  provider: { id: string; name: string };
  status: string;
  dateCreated: string;
  integrationId: string;
  externalSlug: string;
}

export interface SentryIssue {
  id: string;
  shortId: string;
  title: string;
  culprit: string;
  permalink: string;
  level: string;
  status: string;
  isPublic: boolean;
  platform: string;
  project: {
    id: string;
    name: string;
    slug: string;
    platform: string;
  };
  type: string;
  metadata: {
    value: string;
    type: string;
    filename: string;
    function: string;
    display_title_with_tree_label: boolean;
  };
  numComments: number;
  isBookmarked: boolean;
  isSubscribed: boolean;
  hasSeen: boolean;
  issueType: string;
  issueCategory: string;
  isUnhandled: boolean;
  count: string;
  userCount: number;
  firstSeen: string;
  lastSeen: string;
}
