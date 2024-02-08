import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UsersComponent } from './users/users.component';
import { ClaseComponent} from "./clase/clase.component";
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UsersComponent },
  {path: 'clases', component: ClaseComponent},
  {path: 'entrenamientos', component: EntrenamientoComponent},
];
