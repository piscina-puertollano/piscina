import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../../services/landing.service';
import { Contact } from '../../../interfaces/landing';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { MailService } from '../../../services/mail.service';

/**
 * @author: badr
 */

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    MessagesModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  constructor(
    private landingService: LandingService,
    private mailService: MailService
  ) {}

  ngOnInit(): void {
    this.showContacts();
  }

  arrContact?: Array<any>;

  name: string = '';
  email: string = '';
  sendMessage: string = '';

  showAlert: boolean = false;
  message: Message[] | undefined;

  showContacts() {
    this.arrContact = [];
    this.landingService.getContact().subscribe({
      next: (contact: Array<Contact> | undefined) => {
        console.log(contact);
        this.arrContact = contact;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  validateForm(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(this.email!)) {
      this.showAlert = true;
      this.message = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, introduce un correo válido',
          life: 3000,
        },
      ];
      return false;
    }

    if (!this.name) {
      this.showAlert = true;
      this.message = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, introduce un nombre',
          life: 3000,
        },
      ];
      return false;
    }

    if (!this.sendMessage) {
      this.showAlert = true;
      this.message = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, debe de rellenar el mensaje',
          life: 3000,
        },
      ];
      return false;
    }
    return true;
  }

  sendMail() {
    if (this.validateForm()) {
      let message = {
        to: this.email,
        name: this.name,
        message: this.message
      }
      this.mailService.sendMail(message).subscribe({
        next: (data: any | undefined) => {
          console.log(data);
          this.showAlert = true;
          this.message = [
            {
              severity: 'success',
              summary: 'Correcto',
              detail: 'Mensaje enviado correctamente',
              life: 3000,
            },
          ];
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
