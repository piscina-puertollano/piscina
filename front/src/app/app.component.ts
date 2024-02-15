import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadersComponent } from './headers/headers.component';
import { PrimeNGConfig } from 'primeng/api';
import { ModalComponent } from './users/signup/modalSignup/modal.component';
import { SignupComponent } from './users/signup/signup/signup.component';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadersComponent, ModalComponent, SignupComponent,ToolbarModule, AvatarModule, AvatarGroupModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Club deportivo';
  isLogged = false;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    };
    this.checkToken();
  }

  checkToken() {
    if (
      localStorage.getItem('user') != null &&
      JSON.parse(localStorage.getItem('user') as string).token != null
    ) {
      this.isLogged = true;
    }
  }
}
