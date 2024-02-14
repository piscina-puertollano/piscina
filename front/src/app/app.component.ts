import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadersComponent } from './headers/headers.component';
import { PrimeNGConfig } from 'primeng/api';
import { ModalComponent } from './utils/modal/modal.component';
import { SignupComponent } from './users/signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadersComponent, ModalComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Club deportivo';

  constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.primengConfig.zIndex = {
            modal: 1100,
            overlay: 1000,
            menu: 1000,
            tooltip: 1100
        };
    }

}
