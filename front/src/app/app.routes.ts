import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UsersComponent } from './users/users.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { ModificarEntrenamientoComponent } from './modificar-entrenamiento/modificar-entrenamiento.component';
import { CrearEntrenamientoComponent } from './crear-entrenamiento/crear-entrenamiento.component';
import { ConsultarEntrenamientoComponent } from './consultar-entrenamiento/consultar-entrenamiento.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UsersComponent },
  {path: 'entrenamientos', component: EntrenamientoComponent},
  {path: 'modificar-entrenamiento/:id', component: ModificarEntrenamientoComponent},
  {path: 'crear-entrenamiento', component: CrearEntrenamientoComponent},
  {path: 'consultar-entrenamiento/:id', component: ConsultarEntrenamientoComponent}
];
