import { Routes } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { UsersComponent } from './users/admin/users.component';
import { ClaseComponent} from "./clase/clase.component";
import { EntrenamientoComponent } from './entrenamientos/entrenamiento/entrenamiento.component';
import { ListComponent } from './users/list/list.component';
import { ClubComponent } from './landing/club/club.component';
import { ClubEditComponent } from './editor/club/club.component';
import { ContactComponent } from './landing/contact/contact.component';
import { ListNewsComponent } from './news/list/list.component';
import { CreateNewComponent } from './news/create-new/create-new.component';
import { ModificarEntrenamientoComponent } from './entrenamientos/modificar-entrenamiento/modificar-entrenamiento.component';
import { CrearEntrenamientoComponent } from './entrenamientos/crear-entrenamiento/crear-entrenamiento.component';
import { ProfileComponent } from './users/profile/profile.component';
import { FaltasComponent } from './faltas/faltas.component';
import { ConsultarEntrenamientoComponent } from './entrenamientos/consultar-entrenamiento/consultar-entrenamiento.component';
import { ShowNewComponent } from './news/show-new/show-new.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component'
import { GestionEventosComponent } from './eventos/gestion-eventos/gestion-eventos.component';
import { GestionCategoriasComponent } from './eventos/gestion-categorias/gestion-categorias.component';
import { EventoComponent } from './eventos/evento/evento.component';
import { GestionarNoSociosComponent } from './eventos/gestionar-no-socios/gestionar-no-socios.component';
import { PuntuacionComponent } from './puntuaciones/puntuacion/puntuacion.component';

export const routes: Routes = [
  {path: '', component: ClubComponent },
  {path: 'login', component: LoginComponent },
  {path: 'users', component: ListComponent },
  {path: 'my-profile', component: ProfileComponent },
  {path: 'news', component: ListNewsComponent },
  {path: 'new/:id', component: ShowNewComponent },
  {path: 'create-new', component: CreateNewComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'clases', component: ClaseComponent},
  {path: 'entrenamientos', component: EntrenamientoComponent},
  {path: 'edit', component: ClubEditComponent},
  {path: 'consultar-entrenamiento/:id', component: ConsultarEntrenamientoComponent},
  {path: 'faltas', component: FaltasComponent},
  {path: 'listaEventos', component: ListaEventosComponent },
  {path: 'gestionEventos', component: GestionEventosComponent },
  {path: 'gestionCategorias', component: GestionCategoriasComponent},
  {path: 'descEvento/:id', component: EventoComponent},
  {path: 'gestionNoSocios', component: GestionarNoSociosComponent},
  {path: 'puntuaciones', component: PuntuacionComponent},


];
