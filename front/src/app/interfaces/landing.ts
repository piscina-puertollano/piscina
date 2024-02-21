export interface Club {
    _id?:     string;
    title?:   string;
    estructura?: Estructura[];
    history?: string;
    tag?:     string;
    assets?:     Array<number>|undefined;
    order?:  string;
    fotos?:  Foto[];
}

export interface Estructura {
    puesto: string;
    nombre: string;
}

export interface Asset{
    id?:    number;
    ruta?:  string;
}

export interface Foto {
    ruta: string;
}
