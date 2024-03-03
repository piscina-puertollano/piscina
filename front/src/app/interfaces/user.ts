/**
 * @author: badr
 */

export interface User {
    id?:        number;
    idSocio?:   number;
    firstName?: string;
    lastName?:  string;
    password?:  string;
    email?:     string;
    domicilio?:     string;
    tlf?:     string;
    active?:     boolean;
    corriente_pago?:     boolean;
    roles?:     Role[];
    image?:     Image | null;
}

export interface Image {
    ruta: string;
}

export interface Role {
    id: number;
    name?: string;
}

export interface UserRol {
    id: number;
    roles:  Role[];
}

export interface SocioTutor {
    id_tutor: number;
    id_socio: any;
}

export interface Socio {
    id:            number;
    firstName:     string;
    lastName:      string;
    email:         string;
    photo_profile: string;
}

export interface Alergias {
    id:   number;
    name: string;
}

