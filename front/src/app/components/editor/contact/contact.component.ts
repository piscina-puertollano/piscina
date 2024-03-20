import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../interfaces/landing';
import { LandingService } from '../../../services/landing.service';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditcontactComponent } from './editcontact/editcontact.component';
import { ModalCreateContactComponent } from './modal-createcontact/createcontact.component';

/**
 * @author badr
 */

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ToastModule,
    InputTextModule,
    TooltipModule,
    ToolbarModule,
    FormsModule,
    ConfirmDialogModule,
    TableModule,
    DialogComponent,
    ModalCreateContactComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  providers: [MessageService, ConfirmationService, DialogService],
})
export class EditContactComponent implements OnInit {
  constructor(
    private landingService: LandingService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {

    this.showContacts()
  }
  selectContact = '';
  arrContact: any;
  contact?: Contact;

  ref: DynamicDialogRef | undefined;

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

  openDialog(id: number) {
    this.landingService.showContact(id).subscribe({
      next: (contact: any | undefined) => {
        this.contact = contact;
        console.log(contact);

        this.ref = this.dialogService.open(EditcontactComponent, {
          header: 'Editar contacto',
          modal: true,
          breakpoints: {
            '960px': '75vw',
            '640px': '90vw',
          },
          data: {
            contact: contact,
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteContact(eventEmiter: Boolean, id:number) {
    if(eventEmiter){
      this.landingService.deleteContact(id).subscribe({
        next: (contact: any | undefined) => {
          console.log(contact);
          this.showContacts();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
