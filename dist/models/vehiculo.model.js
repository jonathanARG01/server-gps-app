"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehiculo = void 0;
const mongoose_1 = require("mongoose");
const vehiculoSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    patente: {
        type: String,
        unique: true,
        required: [true, 'La patente es obligatoria']
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
        required: [true, 'El número de GPS es requerido']
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
        required: [true, 'El RUT es obligatorio']
    },
    movilConductor: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
vehiculoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Vehiculo = mongoose_1.model('Vehiculo', vehiculoSchema);
