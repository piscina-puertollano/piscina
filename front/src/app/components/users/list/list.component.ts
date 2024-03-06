import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { ModalComponent } from '../ShowUser/modal/modal.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogComponent } from '../../../utils/dialog/dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ShowComponent } from '../ShowUser/show/show.component';
import { SignupComponent } from '../signup/signup/signup.component';
import { ModalSignupComponent } from '../signup/modalSignup/modal.component';
import { Files } from '../../../interfaces/upload';
import { FileService } from '../../../services/file.service';
import { environment } from '../../../../environments/environment.development';

/**
 * @author: badr
 */

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
    ModalSignupComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [MessageService, ConfirmationService, DialogService],
})
export class ListComponent implements OnInit {
  user?: User;
  arrUsers!: Array<User>;
  arrPhotoProfile: Array<any> = [];
  searchValue: string = '';
  loading: boolean = true;
  selectUsers!: Array<User>;
  userDialog: boolean = false;
  submitted: boolean = false;
  test?: User;

  ref: DynamicDialogRef | undefined;

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private fileService: FileService
  ) {}

  openDialog(id: number) {
    this.userService.showUser(id).subscribe({
      next: (user: any | undefined) => {
        this.user = user;
        this.test = user;

        this.ref = this.dialogService.open(ShowComponent, {
          header: 'Editar usuario',
          modal: true,
          breakpoints: {
            '960px': '75vw',
            '640px': '90vw',
          },
          data: {
            user: user,
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createUSerDialog() {
    this.ref = this.dialogService.open(SignupComponent, {
      header: 'Editar usuario',
      data: {
        user: this.user,
      },
    });
    this.ref.onClose.subscribe((user: any) => {
      this.allUsers();
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
        this.arrUsers = user;
        console.log(this.arrUsers)
        this.showImages();
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showImages() {
    for (let user of this.arrUsers) {
      let image: Files = {
        id: user.image?.ruta,
        where: environment.photo_profile_path,
      };

      this.fileService.showImage(image).subscribe({
        next: (image: any | undefined) => {
          this.arrPhotoProfile.push({
            id: user.image?.ruta,
            image: URL.createObjectURL(image),
          });
        },
      });
    }
  }

  deleteUser(eventEmiter: Boolean, id: number) {
    if (eventEmiter) {
      this.userService.deleteUser(id).subscribe({
        next: (user: any | undefined) => {
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
          this.user = user;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
