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
      width: '50w',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75w',
        '640px': '90w',
      }
    });

    this.ref.onClose.subscribe((data: any) => {
      console.log('se ha cerrado');
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: 'maximized:'});
    });

    this.ref.onMaximize.subscribe((value) => {
      console.log('se ha maximizado');
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.Maximized}`});
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}