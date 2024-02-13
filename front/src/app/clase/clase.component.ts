import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {
  datos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const apiUrl = 'http://localhost:9090/api/clases';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.datos = data;
      },
      error: (err) => {
        console.error('Hubo un error al obtener los datos:', err);
      }
    });
  }

  trackByNombre(index: number, user: any): string | undefined {
    return user?.id; // Suponiendo que 'nombre' es una propiedad única de cada usuario
  }
}
