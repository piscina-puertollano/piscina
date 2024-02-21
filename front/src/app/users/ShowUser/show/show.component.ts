import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../../interfaces/user';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-show',
  standalone: true,
  imports: [FormsModule, InputTextModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit {
  user?: User;
  @Output() updateUSer = new EventEmitter<User>

  constructor(public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.user = this.config.data.user; 
    console.log(this.config);
  }
}
