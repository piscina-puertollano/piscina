import { Routes } from '@angular/router';
import { AsignarClasesUsuariosComponent } from './components/asignar-clases-usuarios/asignar-clases-usuarios.component';
import { ClaseComponent } from "./components/clase/clase.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClubEditComponent } from './components/editor/club/club.component';
import { ConsultarEntrenamientoComponent } from './components/entrenamientos/consultar-entrenamiento/consultar-entrenamiento.component';
import { EntrenamientoComponent } from './components/entrenamientos/entrenamiento/entrenamiento.component';
import { EventoComponent } from './components/eventos/evento/evento.component';
import { GestionCategoriasComponent } from './components/eventos/gestion-categorias/gestion-categorias.component';
import { GestionEventosComponent } from './components/eventos/gestion-eventos/gestion-eventos.component';
import { GestionarNoSociosComponent } from './components/eventos/gestionar-no-socios/gestionar-no-socios.component';
import { ListaEventosComponent } from './components/eventos/lista-eventos/lista-eventos.component';
import { ExamplePdfViewerComponent } from './components/example-pdf-viewer/example-pdf-viewer.component';
import { FaltasComponent } from './components/faltas/faltas.component';
import { ClubComponent } from './components/landing/club/club.component';
import { ContactComponent } from './components/landing/contact/contact.component';
import { AdminComponent } from './components/news/admin/admin.component';
import { CreateNewComponent } from './components/news/create-new/create-new.component';
import { EditNewComponent } from './components/news/edit-new/edit-new.component';
import { ListNewsComponent } from './components/news/list/list.component';
import { ShowNewComponent } from './components/news/show-new/show-new.component';
import { PuntuacionComponent } from './components/puntuaciones/puntuacion/puntuacion.component';
import { ListComponent } from './components/users/list/list.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ConsultarPuntuacionComponent } from './components/puntuaciones/consultar-puntuacion/consultar-puntuacion.component';

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
  {path: 'score', component: ConsultarPuntuacionComponent}


];
