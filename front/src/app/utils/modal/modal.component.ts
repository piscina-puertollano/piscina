import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SignupComponent } from '../../users/signup/signup/signup.component';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonModule, ToastModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [DialogService, MessageService]

})
export class ModalComponent implements OnDestroy{

      
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
        console.log('se ha cerrado')
        this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized:` });
    });

    this.ref.onMaximize.subscribe((value) => {
        console.log('se ha maximizadi')

        this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}