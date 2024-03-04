import { Component, Input, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShowComponent } from '../show/show.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

/**
 * @author: badr
 */

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ToastModule, ButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [DialogService, MessageService]
})
export class ModalComponent implements OnDestroy{

  constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ref: DynamicDialogRef | undefined;
    @Input() userId:number = 1

    show() {
        this.ref = this.dialogService.open(ShowComponent, {
            header: 'Select a Product',
            width: '50vw',
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.ref.onClose.subscribe((data: any) => {
            let summary_and_detail;
            if (data) {
                const buttonType = data?.buttonType;
                summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data?.name };
            } else {
                summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
            }
            this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}
