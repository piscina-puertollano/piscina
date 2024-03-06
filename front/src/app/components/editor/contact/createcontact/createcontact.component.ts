import { Component } from '@angular/core';
import { Contact } from '../../../../interfaces/landing';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LandingService } from '../../../../services/landing.service';
import { ToastModule } from 'primeng/toast';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

/**
 * @author: badr
 */

@Component({
  selector: 'app-createcontact',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
  ],
  templateUrl: './createcontact.component.html',
  styleUrl: './createcontact.component.css',
  providers: [MessageService],
})
export class CreatecontactComponent {
  contact?: Contact;
  showAlert: boolean = false;
  message: Message[] | undefined;

  constructor(
    private landingService: LandingService,
    private messageService: MessageService
  ) {
    this.contact = {} as Contact;
  }

  validateForm(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const tlfRegex = /^\d{9}$/;

    if (!this.contact?.name) {
      this.showAlert = true;
      this.message = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, introduce una descripción al contacto',
          life: 3000,
        },
      ];
      return false;
    }

    if (!emailRegex.test(this.contact?.email!)) {
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
    if (!tlfRegex.test(this.contact.tlf)) {
      this.showAlert = true;
      this.message = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, introduce un teléfono válido',
          life: 3000,
        },
      ];
      return false;
    }
    return true;
  }

  createContact() {
    if (this.validateForm()) {
      this.landingService.createContact(this.contact!).subscribe({
        next: (contact: Contact | undefined) => {
          console.log(contact);
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Contacto creado correctamente',
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
