import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UsersComponent } from './users/users.component';
import { ClaseComponent} from "./clase/clase.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UsersComponent },
  {path: 'clases', component: ClaseComponent}
];
