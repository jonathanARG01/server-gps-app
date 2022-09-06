import { Router, Response } from 'express';
import { verificaToken    } from '../middlewares/autenticacion';
import { Vehiculo         } from '../models/vehiculo.model';





const vehiculoRoutes = Router();





// Obtener VEHÍCULOS paginados
vehiculoRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const vehiculos = await Vehiculo.find()
                            .sort({ _id: -1 })
                            .skip( skip )
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec();

    res.json({
        ok: true,
        pagina,
        vehiculos
    });

});





// Obtener un VEHÍCULO por PATENTE
vehiculoRoutes.get('/vehiculo', (req: any, res: Response) => {

    let patenteParams = req.query.patente;
    
    Vehiculo.findOne({ patente: patenteParams }, ( err: any, patenteDB: any ) => {

        if ( err ) throw err;

        if ( !patenteDB ) {
            return res.json({
                ok: false,
                mensaje: 'La patente no existe en la base de datos',
                patente: patenteDB
            });
        } else {
            res.json({
                id:                patenteDB._id,
                created:           patenteDB.created,
                patente:           patenteDB.patente,
                marca:             patenteDB.marca,
                modelo:            patenteDB.modelo,
                anio:              patenteDB.anio,
                color:             patenteDB.color,
                gps:               patenteDB.gps,
                numeroMotor:       patenteDB.numeroMotor,
                numeroVin:         patenteDB.numeroVin,
                sistemaRastreo:    patenteDB.sistemaRastreo,
                fechaVencimiento:  patenteDB.fechaVencimiento,
                apagadoMotor:      patenteDB.apagadoMotor,
                inmovilizador:     patenteDB.inmovilizador,
                nombreConductor:   patenteDB.nombreConductor,
                apellidoConductor: patenteDB.apellidoConductor,
                rutConductor:      patenteDB.rutConductor,
                movilConductor:    patenteDB.movilConductor,
                usuario:           patenteDB.usuario
            });

        }        

    })

});





// Obtener un VEHÍCULO por RUT
vehiculoRoutes.get('/vehiculo/rut', (req: any, res: Response) => {

    let rutParams = req.query.rut;
    
    Vehiculo.findOne({ rutConductor: rutParams }, ( err: any, rutDB: any ) => {

        if ( err ) throw err;

        if ( !rutDB ) {
            return res.json({
                ok: false,
                mensaje: 'El rut no existe en la base de datos',
                rut: rutDB
            });
        } else {
            res.json({
                id:                rutDB._id,
                created:           rutDB.created,
                patente:           rutDB.patente,
                marca:             rutDB.marca,
                modelo:            rutDB.modelo,
                anio:              rutDB.anio,
                color:             rutDB.color,
                gps:               rutDB.gps,
                numeroMotor:       rutDB.numeroMotor,
                numeroVin:         rutDB.numeroVin,
                sistemaRastreo:    rutDB.sistemaRastreo,
                fechaVencimiento:  rutDB.fechaVencimiento,
                apagadoMotor:      rutDB.apagadoMotor,
                inmovilizador:     rutDB.inmovilizador,
                nombreConductor:   rutDB.nombreConductor,
                apellidoConductor: rutDB.apellidoConductor,
                rutConductor:      rutDB.rutConductor,
                movilConductor:    rutDB.movilConductor,
                usuario:           rutDB.usuario
            });

        }        

    })

});





// Crear VEHÍCULO
vehiculoRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    Vehiculo.create( body ).then( async vehiculoDB => {

        await vehiculoDB.populate('usuario', '-password');

        res.json({
            ok: true,
            vehiculo: vehiculoDB
        });

    }).catch( err => {
        res.json(err)
    });

});





// Editar un VEHÍCULO
// vehiculoRoutes.get('/', (req: any, res: Response) => {

// });





// Eliminar un VEHÍCULO
vehiculoRoutes.delete('/:patente', [ verificaToken ], async (req: any, res: Response) => {

    const patente = req.params.patente;

    try {
        
        const vehiculoDB = await Vehiculo.deleteOne({ patente: patente });

        if ( vehiculoDB ) {

            res.json({
                ok: true,
                vehiculoDB,
                mensaje: 'Eliminado...'
            });

        } else {

            res.json({
                ok: false,
                mensaje: 'No se pudo eliminar !!'
            });

        }    

    } catch ( error ) {
        
        console.log( error );

        res.json({
            ok: false,
            mensaje: 'No se pudo eliminar...........'
        });

    }

});





export default vehiculoRoutes;