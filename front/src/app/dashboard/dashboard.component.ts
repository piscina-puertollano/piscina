import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AuthService } from '../services/auth.service';

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
      link: '/admin-socios',
    },
  ];

  myCards() {
    if(!this.authService.getRolesOfToken().includes(environment.rol_admin)){
      this.cards = this.cards.filter((element) =>
      this.authService.getRolesOfToken().includes(element.id_rol)
      );
    }
  }
}
