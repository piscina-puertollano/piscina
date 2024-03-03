// Gonzalo Martinez Haro
export interface Evento {
    id?: number;
    nombre?: string;
    fecha?: string;
    sede?: string;
    categoria?: Categoria;
    visible?: boolean;
    privado?: boolean;
    desc?: Text,
    pdf?:   Pdf | null;
  }

  export interface Pdf {

    ruta?: string;
  }

  export interface Categoria{

    id?: number;
    nombre?: string;
  }