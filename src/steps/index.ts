import { accessSteps } from './access';
import { organizationSteps } from './account';
import { findingSteps } from './issue';
import { repoSteps } from './repository';
import { roleSteps } from './roles';
import { serviceSteps } from './service';

const integrationSteps = [
  ...organizationSteps,
  ...accessSteps,
  ...serviceSteps,
  ...roleSteps,
  ...repoSteps,
  ...findingSteps,
];

export { integrationSteps };
