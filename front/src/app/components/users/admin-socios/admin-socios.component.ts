import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Socio, User } from '../../../interfaces/user';
import { FileService } from '../../../services/file.service';
import { environment } from '../../../../environments/environment.development';

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
  image: any
  constructor(private userService: UserService, private authService: AuthService, private fileService: FileService){
  }
  
  ngOnInit(): void {
    this.userId = this.authService.getIdOfToken()
    this.getMyUsers();
      
  }

  getMyUsers(){

    this.userService.getAsignedSocios(this.userId).subscribe({
      next: (users: any) => {
        console.log(users);
        let searchImage = {
          id: users.photo_profile,
          where: environment.photo_profile_path
        }
        this.fileService.showImage(searchImage).subscribe({
          next: (image: any) => {
            this.image = URL.createObjectURL(image);
          },
          error: (err) => {
            console.log(err);
          }
        })
        this.arrUsers = users;
      }
    })
  }
}
