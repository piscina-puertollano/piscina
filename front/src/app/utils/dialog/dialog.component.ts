import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ToastModule, ConfirmDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  providers: [ConfirmationService, MessageService]
})
export class DialogComponent {

  @Input() header = ''
  @Input() message = ''
  @Input() nameBtn = ''
  @Output() eventEmiter = new EventEmitter<Boolean>()

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Please confirm to proceed moving forward.',
            acceptIcon: 'pi pi-check mr-2',
            rejectIcon: 'pi pi-times mr-2',
            rejectButtonStyleClass: 'p-button-sm',
            acceptButtonStyleClass: 'p-button-outlined p-button-sm',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                this.eventEmiter.emit(true);
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                this.eventEmiter.emit(false);

            }
        });
    }
    // confirm() {
    //     this.confirmationService.confirm({
    //         header: this.header,
    //         message: this.message,
    //         accept: () => {
    //             this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Ha aceptado correctamente', life: 3000 });
    //         },
    //         reject: () => {
    //             this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Ha cancelado', life: 3000 });
    //         }
    //     });
    // }
}