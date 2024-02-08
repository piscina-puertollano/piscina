import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UsersComponent } from './users/users.component';
<<<<<<< HEAD
import { ClaseComponent} from "./clase/clase.component";
=======
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
>>>>>>> 22c912fd8f955c74144267adab183460345466bd

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UsersComponent },
<<<<<<< HEAD
  {path: 'clases', component: ClaseComponent}
=======
  {path: 'entrenamientos', component: EntrenamientoComponent},
>>>>>>> 22c912fd8f955c74144267adab183460345466bd
];
