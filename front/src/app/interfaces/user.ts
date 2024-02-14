export interface User {
    id?:        number;
    idSocio?:   number;
    firstName?: string;
    lastName?:  string;
    password?:  string;
    email?:     string;
    roles?:     Role[];
    image?:     Image | null;
}

export interface Image {
    ruta: string;
}

export interface Role {
    id: number;
}
