import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../../utils/alert/alert.component';
import { Alert } from '../../interfaces/alert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: User;
  alert: Alert;

  constructor(private userService: UserService, private router: Router) {
    this.user = {};
    this.alert = new Alert();
  }

  login() {
    this.userService.login(this.user).subscribe({
      next: (user: any | undefined) => {

        if (user.status == 404) {
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo';
        } else {
          localStorage.clear()
          localStorage.setItem('user', JSON.stringify(user));
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    if (
      localStorage.getItem('user') != null ||
      localStorage.getItem('user') != undefined
    ) {
    }
  }
}
