import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, ToastModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers:[MessageService]
})

export class SignupComponent {
  user:User
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {
    this.user = {};

  }

  signup(){
    
  }


}
