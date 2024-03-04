import { Routes } from '@angular/router';
import { ClaseComponent } from "./clase/clase.component";
import { ClubEditComponent } from './editor/club/club.component';
import { ConsultarEntrenamientoComponent } from './entrenamientos/consultar-entrenamiento/consultar-entrenamiento.component';
import { EntrenamientoComponent } from './entrenamientos/entrenamiento/entrenamiento.component';
import { EventoComponent } from './eventos/evento/evento.component';
import { GestionCategoriasComponent } from './eventos/gestion-categorias/gestion-categorias.component';
import { GestionEventosComponent } from './eventos/gestion-eventos/gestion-eventos.component';
import { GestionarNoSociosComponent } from './eventos/gestionar-no-socios/gestionar-no-socios.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { FaltasComponent } from './faltas/faltas.component';
import { ClubComponent } from './landing/club/club.component';
import { ContactComponent } from './landing/contact/contact.component';
import { CreateNewComponent } from './news/create-new/create-new.component';
import { ListNewsComponent } from './news/list/list.component';
import { ShowNewComponent } from './news/show-new/show-new.component';
import { PuntuacionComponent } from './puntuaciones/puntuacion/puntuacion.component';
import { ListComponent } from './users/list/list.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { AsignarClasesUsuariosComponent } from './asignar-clases-usuarios/asignar-clases-usuarios.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './news/admin/admin.component';
import { EditNewComponent } from './news/edit-new/edit-new.component';

export const routes: Routes = [
  {path: '', component: ClubComponent },
  {path: 'home', component: DashboardComponent },
  {path: 'login', component: LoginComponent },
  {path: 'users', component: ListComponent },
  {path: 'admin-partners', component: AdminComponent },//admin-socios
  {path: 'my-profile', component: ProfileComponent },
  {path: 'news', component: ListNewsComponent },
  {path: 'list-news', component: AdminComponent },
  {path: 'edit-new/:id', component: EditNewComponent },
  {path: 'new/:id', component: ShowNewComponent },
  {path: 'create-new', component: CreateNewComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'class', component: ClaseComponent},//clases
  {path: 'training', component: EntrenamientoComponent},//entrenamientos
  {path: 'edit', component: ClubEditComponent},
  {path: 'training/:id', component: ConsultarEntrenamientoComponent},
  {path: 'faults', component: FaltasComponent},//faltas
  {path: 'list-events', component: ListaEventosComponent },
  {path: 'event-management', component: GestionEventosComponent },//gestionar-evento
  {path: 'event-category', component: GestionCategoriasComponent},//gestionar-categoria
  {path: 'events/:id', component: EventoComponent},//eventos
  {path: 'non-member-management', component: GestionarNoSociosComponent},//gestion-no-socios
  {path: 'scores', component: PuntuacionComponent},//puntuaciones
  {path: 'assign-class', component: AsignarClasesUsuariosComponent},//asignar-clase
  {path: 'pdf', component: ExamplePdfViewerComponent},



];
