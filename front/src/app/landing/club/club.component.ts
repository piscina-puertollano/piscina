import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../services/landing.service';
import { Asset, Club } from '../../interfaces/landing';
import { GalleriaModule } from 'primeng/galleria';



@Component({
  selector: 'app-club',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent implements OnInit{
  club?:Club
  arrClub?:Array<Club>
  images?: Asset[];
    
  responsiveOptions: any[] | undefined;

  constructor(private landingService: LandingService){}

  ngOnInit(): void {
    this.showGalery()
    this.showAll()
    this.responsiveOptions = [{
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
  }


  showAll() {
    this.landingService.index().subscribe({
      next: (club: any | undefined) => {
        console.log(club)
        this.arrClub = club
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showGalery() {
    this.landingService.showSection('galeria').subscribe({
      next: (club: Club | undefined) => {
        console.log('llego',club)
        let i = 0
        this.images = club?.fotos
        this.responsiveOptions = club?.fotos
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
