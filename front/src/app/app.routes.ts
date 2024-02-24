import { Routes } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { UsersComponent } from './users/admin/users.component';
import { ClaseComponent} from "./clase/clase.component";
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { ListComponent } from './users/list/list.component';
import { ClubComponent } from './landing/club/club.component';
import { ClubEditComponent } from './editor/club/club.component';
/* import { ContactComponent } from './landing/contact/contact.component';
 */import { ModificarEntrenamientoComponent } from './modificar-entrenamiento/modificar-entrenamiento.component';
import { CrearEntrenamientoComponent } from './crear-entrenamiento/crear-entrenamiento.component';
import { ConsultarEntrenamientoComponent } from './consultar-entrenamiento/consultar-entrenamiento.component';

export const routes: Routes = [
  {path: '', component: ClubComponent },
/*   {path: 'contact', component: ContactComponent },
 */  {path: 'login', component: LoginComponent },
  {path: 'users', component: ListComponent },
  {path: 'clases', component: ClaseComponent},
  {path: 'entrenamientos', component: EntrenamientoComponent},
  {path: 'edit', component: ClubEditComponent},
  {path: 'modificar-entrenamiento/:id', component: ModificarEntrenamientoComponent},
  {path: 'crear-entrenamiento', component: CrearEntrenamientoComponent},
  {path: 'consultar-entrenamiento/:id', component: ConsultarEntrenamientoComponent}
];
