import { Component,OnInit } from '@angular/core';
import { NoSocio } from '../../interfaces/noSocio';
import { noSocioService } from '../../services/noSocio.service';
import { Alert } from '../../interfaces/alert';
import { AlertComponent } from '../../utils/alert/alert.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-gestionar-no-socios',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './gestionar-no-socios.component.html',
  styleUrl: './gestionar-no-socios.component.css'
})
export class GestionarNoSociosComponent implements OnInit{

  alert: Alert;
  noSocio: NoSocio;
  noSocios: Array<NoSocio> = [];

  constructor(private noSocioService: noSocioService, ) {
    this.alert = new Alert();
    this.noSocio = {};
  }

  ngOnInit(): void {
    this.getNoSocios(); 
      
  }

  getNoSocios() {

    
    this.noSocioService.getNoSocios().subscribe({
      next: (noSocio: any | undefined) => {
        
        if (noSocio.status >= 400){
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'No se han podido cargar a los eventos.';
        } else {
          this.noSocios = noSocio
        }
      },
      error: (err) => {
        console.log(err);
      },
    })
  }


  getNoSocio(id:any) {

    this.noSocioService.getNoSocio(id).subscribe({
      next: (noSocio: any | undefined) => {
        this.noSocio = noSocio
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateNoSocio() {
    this.noSocioService.updateNoSocio(this.noSocio).subscribe({

      next:( noSocio: any |undefined) => {
        this.noSocio = noSocio
      },
      error: (err) => {
        console.log(err);
      }
    })
    window.location.reload();
  }

  deleteNoSocio(id:any) {
    this.alert.show = false;
    this.noSocioService.deleteNoSocio(id).subscribe({
      next: (noSocio: any | undefined) => {
        console.log(noSocio)
        if (noSocio.length == 0 || noSocio.status == 404) {
          this.alert.type = 'danger'
          this.alert.show = true;
          this.alert.header = 'Error';
          this.alert.message =
            'El evento no se ha podido eliminar';
            
        } else {
          this.alert.type = 'success'
          this.alert.show = true;
          this.alert.header = 'Operación completada';
          this.alert.message =
            'Evento eliminado correctamente';
          
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    setTimeout(() => window.location.reload(), 2000);
  }



}
