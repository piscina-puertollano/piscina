import { CanActivateFn } from '@angular/router';

export const adminTrainerGuard: CanActivateFn = (route, state) => {
  return true;
};
