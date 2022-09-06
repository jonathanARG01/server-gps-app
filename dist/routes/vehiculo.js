"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const vehiculo_model_1 = require("../models/vehiculo.model");
const vehiculoRoutes = express_1.Router();
// Obtener VEHÍCULOS paginados
vehiculoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const vehiculos = yield vehiculo_model_1.Vehiculo.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        vehiculos
    });
}));
// Obtener un VEHÍCULO por PATENTE
vehiculoRoutes.get('/vehiculo', (req, res) => {
    let patenteParams = req.query.patente;
    vehiculo_model_1.Vehiculo.findOne({ patente: patenteParams }, (err, patenteDB) => {
        if (err)
            throw err;
        if (!patenteDB) {
            return res.json({
                ok: false,
                mensaje: 'La patente no existe en la base de datos',
                patente: patenteDB
            });
        }
        else {
            res.json({
                id: patenteDB._id,
                created: patenteDB.created,
                patente: patenteDB.patente,
                marca: patenteDB.marca,
                modelo: patenteDB.modelo,
                anio: patenteDB.anio,
                color: patenteDB.color,
                gps: patenteDB.gps,
                numeroMotor: patenteDB.numeroMotor,
                numeroVin: patenteDB.numeroVin,
                sistemaRastreo: patenteDB.sistemaRastreo,
                fechaVencimiento: patenteDB.fechaVencimiento,
                apagadoMotor: patenteDB.apagadoMotor,
                inmovilizador: patenteDB.inmovilizador,
                nombreConductor: patenteDB.nombreConductor,
                apellidoConductor: patenteDB.apellidoConductor,
                rutConductor: patenteDB.rutConductor,
                movilConductor: patenteDB.movilConductor,
                usuario: patenteDB.usuario
            });
        }
    });
});
// Obtener un VEHÍCULO por RUT
vehiculoRoutes.get('/vehiculo/rut', (req, res) => {
    let rutParams = req.query.rut;
    vehiculo_model_1.Vehiculo.findOne({ rutConductor: rutParams }, (err, rutDB) => {
        if (err)
            throw err;
        if (!rutDB) {
            return res.json({
                ok: false,
                mensaje: 'El rut no existe en la base de datos',
                rut: rutDB
            });
        }
        else {
            res.json({
                id: rutDB._id,
                created: rutDB.created,
                patente: rutDB.patente,
                marca: rutDB.marca,
                modelo: rutDB.modelo,
                anio: rutDB.anio,
                color: rutDB.color,
                gps: rutDB.gps,
                numeroMotor: rutDB.numeroMotor,
                numeroVin: rutDB.numeroVin,
                sistemaRastreo: rutDB.sistemaRastreo,
                fechaVencimiento: rutDB.fechaVencimiento,
                apagadoMotor: rutDB.apagadoMotor,
                inmovilizador: rutDB.inmovilizador,
                nombreConductor: rutDB.nombreConductor,
                apellidoConductor: rutDB.apellidoConductor,
                rutConductor: rutDB.rutConductor,
                movilConductor: rutDB.movilConductor,
                usuario: rutDB.usuario
            });
        }
    });
});
// Crear VEHÍCULO
vehiculoRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    vehiculo_model_1.Vehiculo.create(body).then((vehiculoDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield vehiculoDB.populate('usuario', '-password');
        res.json({
            ok: true,
            vehiculo: vehiculoDB
        });
    })).catch(err => {
        res.json(err);
    });
});
// Editar un VEHÍCULO
// vehiculoRoutes.get('/', (req: any, res: Response) => {
// });
// Eliminar un VEHÍCULO
vehiculoRoutes.delete('/:patente', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patente = req.params.patente;
    try {
        const vehiculoDB = yield vehiculo_model_1.Vehiculo.deleteOne({ patente: patente });
        if (vehiculoDB) {
            res.json({
                ok: true,
                vehiculoDB,
                mensaje: 'Eliminado...'
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: 'No se pudo eliminar !!'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            ok: false,
            mensaje: 'No se pudo eliminar...........'
        });
    }
}));
exports.default = vehiculoRoutes;
