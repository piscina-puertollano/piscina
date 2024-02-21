export interface Club {
    _id?:     string;
    title?:   string;
    estructura?: Estructura[];
    history?: string;
    tag?:     string;
    assets?:     Array<number>|undefined;
}

export interface Estructura {
    puesto: string;
    nombre: string;
}

export interface Asset{
    id?:    number;
    ruta?:  string;
}