import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../services/landing.service';
import { Asset, Club } from '../../interfaces/landing';
import { GalleriaModule } from 'primeng/galleria';
import { FileService } from '../../services/file.service';
import { File } from '../../interfaces/upload';
import { Image } from '../../interfaces/user';



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
  images: Array<any> = [];
  arrFotos?: Array<any>;

  position: string = 'bottom';

  showIndicatorsOnItem: boolean = false;
  positionOptions = [
    {
        label: 'Bottom',
        value: 'bottom'
    },
    {
        label: 'Top',
        value: 'top'
    },
    {
        label: 'Left',
        value: 'left'
    },
    {
        label: 'Right',
        value: 'right'
    }
];
    
  responsiveOptions: any[] | undefined;

  constructor(private landingService: LandingService, private fileService: FileService){}

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
        this.arrFotos = club?.fotos
        this.responsiveOptions = club?.fotos
        this.showImages(club?.fotos!)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showImages(arrFotos:Array<any>) {
    arrFotos.forEach((assetId:Image) => {
      let image:File = {
        id: assetId.ruta,
        where: 'photo_profile'
      }
      this.fileService.showImage(image).subscribe({
        next: (asset: any | undefined) => {
          this.images!.push({ruta: assetId.ruta, image: URL.createObjectURL(asset)})
          console.log(this.images)
        },error: (err) => {
          console.log(err)
        }
      })
    })
  }
}
