import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment.development';

/**
 * @author: badr
 */

export const adminTutorGuard: CanActivateFn = (route, state) => {

  let router = inject(Router)
  let authService = inject(AuthService)
  let roles = authService.getRolesOfToken()
  if(roles && (roles.includes(environment.rolTutor) || roles.includes(environment.rol_admin))){
    return true;
  }else{
    return router.navigate(['/']);
  }

};
