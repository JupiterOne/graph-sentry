# v1.1.3 (Fri Apr 22 2022)

#### ⚠️ Pushed to `main`

- Merged via j1-codeowners-automation-v1.0.0 ([@erichs](https://github.com/erichs))
- Require security team review for CODEOWNERS (security@jupiterone.com)
- Added Sentry to the H1 ([@janettelynch](https://github.com/janettelynch))
- v1.1.2 ([@adam-in-ict](https://github.com/adam-in-ict))
- Updating CHANGELOG ([@adam-in-ict](https://github.com/adam-in-ict))
- Addressing PR comment. ([@adam-in-ict](https://github.com/adam-in-ict))
- Updating documentation. Bumping SDK dependency up. ([@adam-in-ict](https://github.com/adam-in-ict))
- Bump ajv from 6.12.2 to 6.12.6 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump minimist from 1.2.5 to 1.2.6 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Add CODEOWNERS (security@jupiterone.com)
- Bump lodash-es from 4.17.15 to 4.17.21 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump url-parse from 1.5.3 to 1.5.10 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump follow-redirects from 1.14.3 to 1.14.8 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- v1.1.1 ([@adam-in-ict](https://github.com/adam-in-ict))
- Updated CHANGELOG ([@adam-in-ict](https://github.com/adam-in-ict))
- Switching from /user/ to /member/ API call. ([@adam-in-ict](https://github.com/adam-in-ict))
- 1.1.0 ([@austinkelleher](https://github.com/austinkelleher))
- Prepare v1.1.0 ([@austinkelleher](https://github.com/austinkelleher))
- INT-2230 - New properties added to `sentry_member` ([@austinkelleher](https://github.com/austinkelleher))
- Bump aws-sdk from 2.690.0 to 2.1030.0 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- v1.0.2 ([@adam-in-ict](https://github.com/adam-in-ict))
- Fixing questions.yaml syntax error. ([@adam-in-ict](https://github.com/adam-in-ict))
- v1.0.3 ([@adam-in-ict](https://github.com/adam-in-ict))
- Update jupiterone/questions/questions.yaml ([@adam-in-ict](https://github.com/adam-in-ict))
- Updating included questions with initial questions our ingested data should be able to answer. ([@adam-in-ict](https://github.com/adam-in-ict))
- Adding in updates for questions to match new template and yeoman generated integration-sentry project. ([@adam-in-ict](https://github.com/adam-in-ict))
- v1.0.1 ([@adam-in-ict](https://github.com/adam-in-ict))
- Properly setting package name and description. ([@adam-in-ict](https://github.com/adam-in-ict))
- v1.0.0 ([@adam-in-ict](https://github.com/adam-in-ict))
- Addressing missed PR comments. ([@adam-in-ict](https://github.com/adam-in-ict))
- Addressing PR comments. ([@adam-in-ict](https://github.com/adam-in-ict))
- Final pre-PR cleanup ([@adam-in-ict](https://github.com/adam-in-ict))
- Cleaning up unit tests. ([@adam-in-ict](https://github.com/adam-in-ict))
- Adding optional organization .env config option. Updating documentation. ([@adam-in-ict](https://github.com/adam-in-ict))
- Adding handling of cursor pagination on all API calls. ([@adam-in-ict](https://github.com/adam-in-ict))
- Cleaning up unit tests. Adding recording for testing without API access. ([@adam-in-ict](https://github.com/adam-in-ict))
- Initial implementation. ([@adam-in-ict](https://github.com/adam-in-ict))
- Adding Insomnia collection of API Sentry calls. ([@adam-in-ict](https://github.com/adam-in-ict))
- Cleaning up unused import. ([@adam-in-ict](https://github.com/adam-in-ict))
- Addressing PR comments on initial spec. ([@adam-in-ict](https://github.com/adam-in-ict))
- Initial spec ([@ninetreats](https://github.com/ninetreats))
- Bump url-parse from 1.5.1 to 1.5.3 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump path-parse from 1.0.6 to 1.0.7 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump ansi-regex from 5.0.0 to 5.0.1 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump tmpl from 1.0.4 to 1.0.5 ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Initial commit ([@ninetreats](https://github.com/ninetreats))

#### Authors: 7

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Adam Pierson ([@adam-in-ict](https://github.com/adam-in-ict))
- Austin Kelleher ([@austinkelleher](https://github.com/austinkelleher))
- Erich Smith ([@erichs](https://github.com/erichs))
- J1 CODEOWNERS Automation v1.0.0 (security@jupiterone.com)
- Janette Lynch ([@janettelynch](https://github.com/janettelynch))
- Sam Andrus ([@ninetreats](https://github.com/ninetreats))

---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.1.2 - 2021-03-30

### Fixed

- Updates (primarily documentation) for switching to using auth tokens.

## 1.1.1 - 2021-12-03

### Fixed

- Switched from /users/ to /members/ API call to pull in all available members
  of an organization.

## 1.1.0 - 2021-12-03

### Added

- New properties added to resources:

  | Entity          | Properties                                                                                            |
  | --------------- | ----------------------------------------------------------------------------------------------------- |
  | `sentry_member` | `createdOn`, `active`, `isManaged`, `isStaff`, `isSuperuser`, `dataJoined`, `lastActive`, `lastLogin` |

## 1.0.0 - 2021-11-12

### Added

- Initial Sentry integration release

- Added support for ingesting the following **new** resources:

  | Resources    | Entity `_type`        | Entity `_class` |
  | ------------ | --------------------- | --------------- |
  | Member       | `sentry_member`       | `User`          |
  | Organization | `sentry_organization` | `Account`       |
  | Project      | `sentry_project`      | `Project`       |
  | Team         | `sentry_team`         | `UserGroup`     |

- Added support for ingesting the following **new** relationships:

  | Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
  | --------------------- | --------------------- | --------------------- |
  | `sentry_organization` | **HAS**               | `sentry_member`       |
  | `sentry_organization` | **HAS**               | `sentry_project`      |
  | `sentry_organization` | **HAS**               | `sentry_team`         |
  | `sentry_team`         | **ASSIGNED**          | `sentry_project`      |
  | `sentry_team`         | **HAS**               | `sentry_member`       |
