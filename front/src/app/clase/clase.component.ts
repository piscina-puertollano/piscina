import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {
  datos: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const apiUrl = 'http://localhost:9090/api/clases';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.datos = data;
      })
      .catch(error => {
        console.error('Hubo un error al obtener los datos:', error);
      });
  }

  trackByNombre(index: number, user: any): string | undefined {
    return user?.nombre; // Suponiendo que 'nombre' es una propiedad única de cada usuario
  }
}
