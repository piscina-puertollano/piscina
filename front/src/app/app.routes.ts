import { Routes } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { UsersComponent } from './users/admin/users.component';
import { ClaseComponent} from "./clase/clase.component";
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { ListComponent } from './users/list/list.component';
import { ClubComponent } from './landing/club/club.component';
import { ClubEditComponent } from './editor/club/club.component';
import { ContactComponent } from './landing/contact/contact.component';
import { ListNewsComponent } from './news/list/list.component';
import { CreateNewComponent } from './news/create-new/create-new.component';
import { ModificarEntrenamientoComponent } from './modificar-entrenamiento/modificar-entrenamiento.component';
import { CrearEntrenamientoComponent } from './crear-entrenamiento/crear-entrenamiento.component';
import { ProfileComponent } from './users/profile/profile.component';


export const routes: Routes = [
  {path: '', component: ClubComponent },
  {path: 'login', component: LoginComponent },
  {path: 'users', component: ListComponent },
  {path: 'my-profile', component: ProfileComponent },
  {path: 'news', component: ListNewsComponent },
  {path: 'create-new', component: CreateNewComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'clases', component: ClaseComponent},
  {path: 'entrenamientos', component: EntrenamientoComponent},
  {path: 'edit', component: ClubEditComponent},
  {path: 'modificar-entrenamiento/:id', component: ModificarEntrenamientoComponent},
  {path: 'crear-entrenamiento', component: CrearEntrenamientoComponent}
];
