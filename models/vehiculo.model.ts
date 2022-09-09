
import { Schema, Document, model } from 'mongoose';



const vehiculoSchema = new Schema({

    created: {
        type: Date
    },
    patente: {
        type: String,
        unique: true,
        required: [ true, 'La patente es obligatoria' ]
    },
    marca: {
        type: String
    },
    modelo: {
        type: String
    },
    anio: {
        type: String
    },
    color: {
        type: String
    },
    gps: {
        type: String,
        unique: true,
        required: [ true, 'El número de GPS es requerido' ]
    },
    numeroMotor: {
        type: String
    },
    numeroVin: {
        type: String
    },
    sistemaRastreo: {
        type: String
    },
    fechaVencimiento: {
        type: Date
    },
    apagadoMotor: {
        type: String
    },
    inmovilizador: {
        type: String
    },
    nombreConductor: {
        type: String
    },
    apellidoConductor: {
        type: String
    },
    rutConductor: {
        type: String,
        required: [ true, 'El RUT es obligatorio' ]
    },
    movilConductor: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }
    
});



vehiculoSchema.pre<IVehiculo>('save', function( next ) {
    this.created = new Date();
    next();
});



interface IVehiculo extends Document {
    created:           Date;
    patente:           string;
    marca?:            string;
    modelo?:           string;
    anio?:             string;
    color?:            string;
    gps:               string;
    numeroMotor:       string;
    numeroVin:         string;
    sistemaRastreo:    string;
    fechaVencimiento:  Date;
    apagadoMotor:      string,
    inmovilizador:     string,
    nombreConductor:   string;
    apellidoConductor: string;
    rutConductor:      string;
    movilConductor:    string;
}



export const Vehiculo = model<IVehiculo>('Vehiculo', vehiculoSchema);
