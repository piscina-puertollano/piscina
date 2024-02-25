import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UsersComponent } from './users/users.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component'
import { GestionEventosComponent } from './eventos/gestion-eventos/gestion-eventos.component';
import { GestionCategoriasComponent } from './eventos/gestion-categorias/gestion-categorias.component';
import { EventoComponent } from './eventos/evento/evento.component';
import { GestionarNoSociosComponent } from './eventos/gestionar-no-socios/gestionar-no-socios.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UsersComponent },
  {path: 'listaEventos', component: ListaEventosComponent },
  {path: 'gestionEventos', component: GestionEventosComponent },
  {path: 'gestionCategorias', component: GestionCategoriasComponent},
  {path: 'descEvento/:id', component: EventoComponent},
  {path: 'gestionNoSocios', component: GestionarNoSociosComponent},



];
