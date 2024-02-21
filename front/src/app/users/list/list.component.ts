import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ModalComponent } from '../signup/modalSignup/modal.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogComponent } from '../../utils/dialog/dialog.component';

import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputTextModule, TableModule, DatePipe, CurrencyPipe, ProgressBarModule, FormsModule, TooltipModule, ModalComponent, ToastModule, ToolbarModule, FileUploadModule, ConfirmDialogModule, DialogModule, DialogComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ListComponent implements OnInit {
  user?:User
  arrUsers!: Array<User>
  searchValue: string = ''
  loading: boolean = true;
  selectUsers!: Array<User>
  userDialog: boolean = false;
  submitted: boolean = false;
  constructor(private filterService:FilterService, private userService: UserService){}

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
    this.loading = false
    this.allUsers()
  }

  allUsers() {
    this.userService.allUsers().subscribe({
      next: (user: any | undefined) => {
        console.log(user)
        this.arrUsers = user
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showUser(id:any) {
    this.userService.showUser(id).subscribe({
      next: (user: any | undefined) => {
        this.user = user
        console.log(user)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateUser(event: Boolean) {
    if(event){
      this.userService.updateUser(this.user!).subscribe({
        next: (user: any | undefined) => {
          console.log(user)
          this.user = user
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

}
