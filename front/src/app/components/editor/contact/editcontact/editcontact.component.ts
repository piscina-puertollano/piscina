import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { Contact } from '../../../../interfaces/landing';
import { LandingService } from '../../../../services/landing.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editcontact',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, ToastModule],
  templateUrl: './editcontact.component.html',
  styleUrl: './editcontact.component.css',
  providers: [MessageService],
})
export class EditcontactComponent implements OnInit {
  contact?: Contact;

  constructor(
    public config: DynamicDialogConfig,
    private landingService: LandingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contact = this.config.data.contact;
  }

  updateContact() {
    this.landingService.updateContact(this.contact!).subscribe({
      next: (contact: Contact | undefined) => {
        console.log(contact);
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Contacto actualizado correctamente',
          life: 3000
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
