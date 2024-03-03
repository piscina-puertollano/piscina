import { Component, OnInit } from '@angular/core';
import { ShowComponent } from '../ShowUser/show/show.component';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileService } from '../../services/file.service';
import { environment } from '../../../environments/environment.development';
import { Files } from '../../interfaces/upload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

/**
 * @author: badr
 */

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    InputSwitchModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  user?: User;
  image?: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fileService: FileService,
    private messageService: MessageService
  ) {
    this.user = JSON.parse(localStorage.getItem('user')! as string).msg;
  }

  ngOnInit(): void {
    this.showUser();
  }

  showUser() {
    this.authService.getUserByToken().subscribe({
      next: (user: User | undefined) => {
        this.showImage(user!.image!.ruta!);
        this.user = user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showImage(id: string) {
    let image: Files = {
      id: id,
      where: environment.photo_profile_path,
    };
    console.log(image);
    this.fileService.showImage(image).subscribe({
      next: (image: any | undefined) => {
        console.log(image);
        this.image = URL.createObjectURL(image);
      },
    });
  }
  updateUser() {
    this.userService.updateUser(this.user!).subscribe({
      next: (user: User | undefined) => {
        console.log(user);
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Actualización completada',
          life:3000
        });

        this.user = user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
