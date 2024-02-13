import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-clase',
  standalone: true,
  imports: [TableModule],
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {
  datos: any[] = [];
  selectedUser: any;
  currentNombre: string = "";
  currentTemporada: string = "";
  isEditing: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const apiUrl = 'http://localhost:9090/api/clases';
    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.datos = data;
      },
      error => {
        console.error('Hubo un error al obtener los datos:', error);
      }
    );
  }

  prepareEdit(user: any): void {
    this.currentNombre = user.nombre;
    this.currentTemporada = user.temporada;
    this.isEditing = true;
  }

  saveChanges(): void {
    // Implementa la lógica para guardar los cambios
    // Por ejemplo, puedes hacer una petición HTTP para actualizar los datos en el servidor
  }

  eliminar(user: any): void {
    const apiUrl = `http://localhost:9090/api/clases/${user.id}`;
    this.http.delete(apiUrl)
      .subscribe(() => {
        // Elimina la clase del arreglo local después de una respuesta exitosa
        this.datos = this.datos.filter(clase => clase.id !== user.id);
      }, error => {
        // Maneja el error, por ejemplo, mostrando un mensaje al usuario
        console.error('Error al eliminar la clase:', error);
      });
  }
}