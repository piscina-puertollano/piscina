import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../services/user.service';
import { CheckboxModule } from 'primeng/checkbox';

/**
 * @author: badr
 */

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, ToastModule, CheckboxModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers:[MessageService]
})

export class SignupComponent {
  user?:User
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService, private userService: UserService) {
    this.user ={}
  }

  signup(){
    this.userService.signup(this.user!).subscribe({
      next: (user: any | undefined) => {
        console.log(user);
        this.messageService.add({severity:'success', summary:'Success', detail:'Usuario creado'});

      }
    })
  }


}
