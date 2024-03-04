

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/**
 * @author: badr
 */

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [MenubarModule, ButtonModule, DialogModule],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent implements OnInit {

    items: MenuItem[] | undefined;
    visible: boolean = false;

    constructor(private authService: AuthService, private route: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Nuestro club',
                routerLink: '/'
            },
            {
                label: 'Noticias',
                routerLink: '/news'
            },
            {
                label: 'Actividad deportiva',
            },
            {
                label: 'Master',
            },
            {
                label: 'Contacto',
                routerLink: '/contact'
            },
            {
                label: 'Enlaces',
                routerLink: '/edit'
            }
        ];
    
        if (this.authService.isLoggedIn()) {
            this.items.push({
                label: 'Home',
                routerLink: '/home'
            });
            this.items.push({
                label: 'Mi perfil',
                routerLink: '/my-profile'
            });

            this.items.push({
                label: 'Logout',
                command: () => {
                    this.authService.logout()
                    this.route.navigate(['/login'])
                }
            });
        } else {
            this.items.push({
                label: 'Área privada',
                routerLink: '/login'
            });
        }
    }

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
        this.visible = false;
    }
}

