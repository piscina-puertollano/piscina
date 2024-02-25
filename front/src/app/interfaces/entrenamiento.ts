import { EjercicioEntrenamiento } from "./ejercicio-entrenamiento"
import { Ejercicios } from "./ejercicios"

/**
 * author: Marina Laguna
 */
export interface Entrenamiento {
    id?:number
    nombre?:string
    descripcion?:string
    ejercicios?:Array<Ejercicios>
    EjercicioEntrenamientos?: EjercicioEntrenamiento[];
}
