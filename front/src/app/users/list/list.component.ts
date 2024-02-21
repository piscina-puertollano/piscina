import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import {
  ConfirmationService,
  FilterService,
  MessageService,
} from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ModalComponent } from '../ShowUser/modal/modal.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ShowComponent } from '../ShowUser/show/show.component';
import { firstValueFrom } from 'rxjs';
import { SignupComponent } from '../signup/signup/signup.component';
import { ModalSignupComponent } from '../signup/modalSignup/modal.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    InputTextModule,
    TableModule,
    DatePipe,
    CurrencyPipe,
    ProgressBarModule,
    FormsModule,
    TooltipModule,
    ModalComponent,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    ConfirmDialogModule,
    DialogModule,
    DialogComponent,
    ModalSignupComponent
    
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [MessageService, ConfirmationService, DialogService],
})
export class ListComponent implements OnInit {
  user?: User;
  arrUsers!: Array<User>;
  searchValue: string = '';
  loading: boolean = true;
  selectUsers!: Array<User>;
  userDialog: boolean = false;
  submitted: boolean = false;
  test?: User;

  ref: DynamicDialogRef | undefined;

  constructor(
    private filterService: FilterService,
    private userService: UserService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}

  openDialog(id:number){

    this.userService.showUser(id).subscribe({
      next: (user: any | undefined) => {
        this.user = user;
        console.log(user);
        this.test = user;

        this.ref = this.dialogService.open(ShowComponent, { 
          header: 'Editar usuario',
          data:{
            user:user
          }
      });
        
        this.ref.onClose.subscribe((user: User ) => {
          if (user) {
              this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: user.email });
          }
      });
      },
      error: (err) => {
        console.log(err);
      },
    });
    
  }


  createUSerDialog(id:number){

    this.ref = this.dialogService.open(SignupComponent, { 
      header: 'Editar usuario',
      data:{
        user:this.user
      }
  });
    
    this.ref.onClose.subscribe((user: User ) => {
      if (user) {
          this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: user.email });
      }
  });
    
  }


  clear(table: Table) {
    table.clear();
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
  ngOnInit() {
    this.loading = false;
    this.allUsers();
  }

  allUsers() {
    this.userService.allUsers().subscribe({
      next: (user: any | undefined) => {
        console.log(user);
        this.arrUsers = user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showUser(id: any) {
    this.userService.showUser(id).subscribe({
      next: (user: any | undefined) => {
        this.user = user;
        console.log(user);
        this.test = user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser(eventEmiter: Boolean, id:number){
    if(eventEmiter){
      this.userService.deleteUser(id).subscribe({
        next: (user: any | undefined) => {
          console.log(user);
          this.user = user;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }



  updateUser(event: Boolean) {
    if (event) {
      this.userService.updateUser(this.user!).subscribe({
        next: (user: any | undefined) => {
          console.log(user);
          this.user = user;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
