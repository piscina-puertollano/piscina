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
  @Input() icon = 'pi pi-check'
  @Input() header = ''
  @Input() message = ''
  @Input() nameBtn = ''
  @Output() eventEmiter = new EventEmitter<Boolean>()

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    confirm() {
        this.confirmationService.confirm({

            header: this.header,
            message: this.message,
            acceptIcon: 'pi pi-check mr-2',
            rejectIcon: 'pi pi-times mr-2',
            rejectButtonStyleClass: 'p-button-sm',
            acceptButtonStyleClass: 'p-button-outlined p-button-sm',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Su solicitud se está procesando', life: 3000 });
                this.eventEmiter.emit(true);
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se han producido los cambios', life: 3000 });
                this.eventEmiter.emit(false);
            }
        });
    }
}