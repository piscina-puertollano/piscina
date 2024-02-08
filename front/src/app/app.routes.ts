import { Routes } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { UsersComponent } from './users/admin/users.component';
import { ClaseComponent} from "./clase/clase.component";
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UsersComponent },
  {path: 'clases', component: ClaseComponent},
  {path: 'entrenamientos', component: EntrenamientoComponent},
];
