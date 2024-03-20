/**
 * @author: badr
 */

export interface Club {
    _id?:     string;
    title?:   string;
    estructura?: string;
    history?: string;
    tag?:     string;
    assets?:     Array<number>|any|undefined;
    order?:  string;
    fotos?:  Foto[];
}

export interface Asset{
    id?:    number;
    ruta?:  string;
}

export interface Foto {
    ruta: string;
}

export interface Contact {
    _id?:   string;
    name:  string;
    tlf:   string;
    email: string;
}
