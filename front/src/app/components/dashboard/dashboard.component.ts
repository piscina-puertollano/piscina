import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [RouterLink, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.myCards();
  }

  cards: any[] = [
    {
      id_rol: environment.rol_admin,
      image: environment.admin_card_image,
      title: 'Panel de usuarios',
      content: 'Gestión de usuarios',
      link: '/users',
    },
    {
      id_rol: environment.rol_redactor,
      image: environment.redactor_card_image,
      title: 'Panel del redactor',
      content: 'Para la gestión de las noticias',
      link: '/list-news',
    },
    {
      id_rol: environment.rol_tutor,
      image: environment.tutor_card_image,
      title: 'Gestionar mis socios',
      content: 'Para gestionar mis socios',
      link: '/admin-partners',
    },
    {
      id_rol: environment.rol_admin,
      image: environment.admin_gestion_image,
      title: 'Gestionar Clases',
      content: 'Para gestionar las clases',
      link: '/class',
    },
    {
      id_rol: environment.rol_entrenador,
      image: environment.entrenador_faltas_image,
      title: 'Gestionar Faltas',
      content: 'Para gestionar las faltas de los usuarios',
      link: '/faults',
    },
    {
      id_rol: environment.rol_socio,
      image: environment.socio_card_image,
      title: 'Consultar Calificaciones',
      content: 'Par consultar la calificación general y si tenemos entrenamientos asignados',
      link: '/score',
    },
    {
      id_rol: environment.rol_entrenador,
      image: environment.entrenador_card_image,
      title: 'Gestionar entrenamientos',
      content: 'Para realizar el gestión de los entrenamientos',
      link: '/training',
    },
    {
      id_rol: environment.rol_entrenador,
      image: environment.puntuacion_card_image,
      title: 'Gestión de Calificaciones de los Socios',
      content: 'Añadir calificaciones a los socios',
      link: '/scores',
    },
    {
      id_rol: environment.rol_admin,
      image: environment.gestion_eventos_image,
      title: 'Gestionar Eventos',
      content: 'Para gestionar eventos, categorias y no socios',
      link: '/event-management',
    },
    {
      id_rol: environment.rol_webmaster,
      image: environment.contact_card_image,
      title: 'Gestionar Contactos',
      content: 'Para la gestión de los contactos',
      link: '/edit/contact',
    },
    {
      id_rol: environment.rol_webmaster,
      image: environment.landing_card_image,
      title: 'Gestionar Home',
      content: 'Para la gestión del home y editar la estructura de la dirección, la historia y la galería',
      link: '/edit/landing',
    }
  ];

  myCards() {
    if(!this.authService.getRolesOfToken().includes(environment.rol_admin)){
      this.cards = this.cards.filter((element) =>
      this.authService.getRolesOfToken().includes(element.id_rol)
      );
    }
  }
}
