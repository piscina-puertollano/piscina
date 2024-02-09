

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent implements OnInit {

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Nuestro club',
                // icon: 'pi pi-fw pi-file',
            },
            {
                label: 'Actividad deportiva',
                // icon: 'pi pi-fw pi-pencil',
            },
            {
                label: 'Master',
                // icon: 'pi pi-fw pi-user',
            },
            {
                label: 'Contacto',
                // icon: 'pi pi-fw pi-calendar',
            },
            {
                label: 'Enlaces',
                // icon: 'pi pi-fw pi-power-off'
            }
        ];
    }
}

