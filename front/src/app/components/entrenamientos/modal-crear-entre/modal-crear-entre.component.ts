import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CrearEntrenamientoComponent } from '../crear-entrenamiento/crear-entrenamiento.component';

/**
 * @author Marina Laguna
 */
@Component({
  selector: 'app-modal-crear-entre',
  standalone: true,
  imports: [ButtonModule, ToastModule],
  templateUrl: './modal-crear-entre.component.html',
  styleUrl: './modal-crear-entre.component.css',
  providers: [DialogService, MessageService]
})
export class ModalCrearEntreComponent {
  constructor (public dialogService: DialogService, public messageService: MessageService) {}
  ref: DynamicDialogRef | undefined;

  show() {
    this.ref = this.dialogService.open(CrearEntrenamientoComponent, {
      header: 'Nuevo entrenamiento',
      width: '65%',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '90px': '90w',
        '640px': '90w',
      }
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
          this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se ha creado el entrenamiento' });
      }
    });
  }
}