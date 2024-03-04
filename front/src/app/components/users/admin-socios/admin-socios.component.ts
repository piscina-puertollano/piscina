import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Socio } from '../../../interfaces/user';

@Component({
  selector: 'app-admin-socios',
  standalone: true,
  imports: [],
  templateUrl: './admin-socios.component.html',
  styleUrl: './admin-socios.component.css'
})
export class AdminSociosComponent implements OnInit{

  userId = 0
  arrUsers?: Array<Socio>;
  constructor(private userService: UserService, private authService: AuthService){
  }
  
  ngOnInit(): void {
    this.userId = this.authService.getIdOfToken()
    this.getMyUsers();
      
  }

  getMyUsers(){

    this.userService.getAsignedSocios(this.userId).subscribe({
      next: (users: any) => {
        console.log(users);
        this.arrUsers = users;
      }
    })
  }
}
