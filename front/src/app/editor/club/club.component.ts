import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { LandingService } from '../../services/landing.service';
import { Club, Estructura } from '../../interfaces/landing';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-club-edit',
  standalone: true,
  imports: [
    EditorModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DialogComponent,
    ToastModule,
    ToolbarModule,
    AvatarModule,
    TableModule
  ],

  templateUrl: './club.component.html',
  styleUrl: './club.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ClubEditComponent implements OnInit {
  text: string | undefined;
  title: string | undefined;
  directiva: Estructura[] | undefined;
  fotos = []

  club?: Club;

  constructor(
    private landingService: LandingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.showHistory();
  }

  showHistory() {
    this.landingService.showSection('history').subscribe({
      next: (club: Club | undefined) => {
        console.log(club);
        this.club = club;
        this.text = club?.history;
        this.title = club?.title;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  update(confirm: Boolean) {
    if (confirm) {
      console.log('aceptado');
      this.club!.history = this.text;
      this.club!.title = this.title;
      this.landingService.updateClub(this.club!).subscribe({
        next: (club: Club | undefined) => {
          this.club = club;
          setTimeout(() => {            
            this.messageService.add({
              severity: 'success',
              summary: 'Aceptado',
              detail: 'Su solicitud ha sido procesada correctamente',
              life: 3000,
            });
          }, 1500);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('cancelado');
    }
  }
}
