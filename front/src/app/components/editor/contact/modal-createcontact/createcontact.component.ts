import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CreatecontactComponent } from '../createcontact/createcontact.component';
import { Contact } from '../../../../interfaces/landing';
import { FormsModule } from '@angular/forms';
import { LandingService } from '../../../../services/landing.service';

/**
 * @author: badr
 */

@Component({
  selector: 'app-modal-create-contact',
  standalone: true,
  imports: [ButtonModule, ToastModule, FormsModule],
  templateUrl: './createcontact.component.html',
  styleUrl: './createcontact.component.css',
  providers: [DialogService, MessageService],
})
export class ModalCreateContactComponent implements OnDestroy {
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private landingService: LandingService
  ) {}

  ref: DynamicDialogRef | undefined;

  contact?: Contact;

  show() {
    this.ref = this.dialogService.open(CreatecontactComponent, {
      header: 'Nuevo Contacto',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  createContact() {
    this.landingService.createContact(this.contact!).subscribe((data) => {
      console.log(data);
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Se ha creado el contacto',
      });
    });

    this.ngOnDestroy()
  }
}
