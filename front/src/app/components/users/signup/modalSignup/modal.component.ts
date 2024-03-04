import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SignupComponent } from '../signup/signup.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

/**
 * @author: badr
 */


@Component({
  selector: 'app-modal-signup',
  standalone: true,
  imports: [ButtonModule, ToastModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [DialogService, MessageService]

})
export class ModalSignupComponent implements OnDestroy{

      
  constructor(public dialogService: DialogService, public messageService: MessageService) {}

  ref: DynamicDialogRef | undefined;

  show() {
    this.ref = this.dialogService.open(SignupComponent, {
        header: 'Nuevo usuario',
        width: '50vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        }
    });

    this.ref.onClose.subscribe((data: any) => {
        console.log(data);
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se ha creado el usuario' });
    });

}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}

