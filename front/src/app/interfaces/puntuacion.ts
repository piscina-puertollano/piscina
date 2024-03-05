import { User } from "./user";

/**
 * @author Marina Laguna
 */
export interface Puntuacion {
    id?: number
    nota?: number
    idEntrenamiento?: number
    userId?: number
}

export interface Socio extends User {
    nota?: number | null;
    mostrarBoton?: boolean;
  }