import { Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { ClaseComponent} from "./components/clase/clase.component";
import { EntrenamientoComponent } from './components/entrenamientos/entrenamiento/entrenamiento.component';
import { ListComponent } from './components/users/list/list.component';
import { ClubComponent } from './components/landing/club/club.component';
import { ClubEditComponent } from './components/editor/club/club.component';
import { ContactComponent } from './components/landing/contact/contact.component';
import { ListNewsComponent } from './components/news/list/list.component';
import { CreateNewComponent } from './components/news/create-new/create-new.component';
import { ModificarEntrenamientoComponent } from './components/entrenamientos/modificar-entrenamiento/modificar-entrenamiento.component';
import { CrearEntrenamientoComponent } from './components/entrenamientos/crear-entrenamiento/crear-entrenamiento.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { FaltasComponent } from './components/faltas/faltas.component';
import { ConsultarEntrenamientoComponent } from './components/entrenamientos/consultar-entrenamiento/consultar-entrenamiento.component';
import { ShowNewComponent } from './components/news/show-new/show-new.component';
import { ListaEventosComponent } from './components/eventos/lista-eventos/lista-eventos.component';
import { GestionEventosComponent } from './components/eventos/gestion-eventos/gestion-eventos.component';
import { GestionCategoriasComponent } from './components/eventos/gestion-categorias/gestion-categorias.component';
import { EventoComponent } from './components/eventos/evento/evento.component';
import { GestionarNoSociosComponent } from './components/eventos/gestionar-no-socios/gestionar-no-socios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminSociosComponent } from './components/users/admin-socios/admin-socios.component';
import { AdminComponent } from './components/news/admin/admin.component';
import { EditNewComponent } from './components/news/edit-new/edit-new.component';
import { PuntuacionComponent } from './components/puntuaciones/puntuacion/puntuacion.component';
import { AsignarClasesUsuariosComponent } from './components/asignar-clases-usuarios/asignar-clases-usuarios.component';
import { ExamplePdfViewerComponent } from './components/example-pdf-viewer/example-pdf-viewer.component';

export const routes: Routes = [
  {path: '', component: ClubComponent },
  {path: 'home', component: DashboardComponent },
  {path: 'login', component: LoginComponent },
  {path: 'users', component: ListComponent },
  {path: 'admin-socios', component: AdminSociosComponent },
  {path: 'my-profile', component: ProfileComponent },
  {path: 'news', component: ListNewsComponent },
  {path: 'list-news', component: AdminComponent },
  {path: 'edit-new/:id', component: EditNewComponent },
  {path: 'new/:id', component: ShowNewComponent },
  {path: 'create-new', component: CreateNewComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'clases', component: ClaseComponent},
  {path: 'entrenamientos', component: EntrenamientoComponent},
  {path: 'edit', component: ClubEditComponent},
  {path: 'consultar-entrenamiento/:id', component: ConsultarEntrenamientoComponent},
  {path: 'faltas', component: FaltasComponent},
  {path: 'asignar/clases', component: AsignarClasesUsuariosComponent},
  {path: 'listaEventos', component: ListaEventosComponent },
  {path: 'gestionEventos', component: GestionEventosComponent },
  {path: 'gestionCategorias', component: GestionCategoriasComponent},
  {path: 'descEvento/:id', component: EventoComponent},
  {path: 'gestionNoSocios', component: GestionarNoSociosComponent},
  {path: 'puntuaciones', component: PuntuacionComponent},

  {path: 'pdf', component: ExamplePdfViewerComponent},



];
