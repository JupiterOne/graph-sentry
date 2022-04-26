# v1.2.0 (Tue Apr 26 2022)

#### 🚀 Enhancement

- Only publish when release tag is included on PR [#17](https://github.com/adam-in-ict/graph-sentry-adam-in-ict-testing/pull/17) ([@adam-in-ict](https://github.com/adam-in-ict))

#### ⚠️ Pushed to `main`

- Bump version to: 1.2.1 and automatically update CHANGELOG [auto] ([@adam-in-ict](https://github.com/adam-in-ict))

#### Authors: 1

- Adam Pierson ([@adam-in-ict](https://github.com/adam-in-ict))

---

# v1.1.4 (Mon Apr 25 2022)

#### 🐛 Bug Fix

- Switching to just GITHUB_TOKEN [#16](https://github.com/adam-in-ict/graph-sentry-adam-in-ict-testing/pull/16) ([@adam-in-ict](https://github.com/adam-in-ict))

#### ⚠️ Pushed to `main`

- Bump version to: 1.2.0 and automatically update CHANGELOG [auto] ([@adam-in-ict](https://github.com/adam-in-ict))

#### Authors: 1

- Adam Pierson ([@adam-in-ict](https://github.com/adam-in-ict))

---

# v1.2.0 (Mon Apr 25 2022)

#### 🚀 Enhancement

- Including CHANGELOG in NPM package. [#15](https://github.com/adam-in-ict/graph-sentry-adam-in-ict-testing/pull/15) ([@adam-in-ict](https://github.com/adam-in-ict))

#### ⚠️ Pushed to `main`

- Bump version to: 1.1.5 and automatically update CHANGELOG [auto] ([@adam-in-ict](https://github.com/adam-in-ict))

#### Authors: 1

- Adam Pierson ([@adam-in-ict](https://github.com/adam-in-ict))

---

# v1.1.4 (Mon Apr 25 2022)

#### 🐛 Bug Fix

- Adding in changelog update. [#14](https://github.com/adam-in-ict/graph-sentry-adam-in-ict-testing/pull/14) ([@adam-in-ict](https://github.com/adam-in-ict))

#### Authors: 1

- Adam Pierson ([@adam-in-ict](https://github.com/adam-in-ict))

---

# v1.1.3 (Mon Apr 25 2022)

#### 🐛 Bug Fix

- Updating package name [#8](https://github.com/adam-in-ict/graph-sentry-adam-in-ict-testing/pull/8) ([@adam-in-ict](https://github.com/adam-in-ict))
- Updating .env naming [#7](https://github.com/adam-in-ict/graph-sentry-adam-in-ict-testing/pull/7) ([@adam-in-ict](https://github.com/adam-in-ict))

#### Authors: 1

- Adam Pierson ([@adam-in-ict](https://github.com/adam-in-ict))

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
