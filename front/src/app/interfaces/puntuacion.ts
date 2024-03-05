import { Image, User } from "./user";

/**
 * @author Marina Laguna
 */
export interface Puntuacion {
    id?: number
    nota?: number
    idEntrenamiento?: number | null
    userId?: number
    puntuacion?: {
        id: number;
        idEntrenamiento: number | null;
        nota: number;
     };
}

export interface Socio extends User {
    nota?: number | null;
    mostrarBoton?: boolean;
}