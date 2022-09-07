// Node
import Server         from './classes/server';
import mongoose       from 'mongoose';
import cors           from 'cors';
import bodyParser     from 'body-parser';
import fileUpload     from 'express-fileupload';

// Routes
import userRoutes     from './routes/usuario';
import postRoutes     from './routes/post';
import vehiculoRoutes from './routes/vehiculo';



const server = new Server();



// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );



// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) );


// Configurar CORS
server.app.use( cors({ origin: true, credentials: true }) );


// Rutas de mi app
server.app.use('/user',      userRoutes );
server.app.use('/posts',     postRoutes );
server.app.use('/vehiculos', vehiculoRoutes );



const DB_URI : any = process.env.DB_URI;


// Conectar DB
mongoose.connect(DB_URI , {
                    // useNewUrlParser: true,
                    // useUnifiedTopology: true,
                    // useCreateIndex: true,
                    // useFindAndModify: false
                }, ( err ) => {

   if ( err ) throw err;

   console.log('Base de datos ONLINE en DB_URI', DB_URI);
   
});





// // Conectar DB
// mongoose.connect('mongodb://localhost:27017/gpsusersdb', {
//                     // useNewUrlParser: true,
//                     // useUnifiedTopology: true,
//                     // useCreateIndex: true,
//                     // useFindAndModify: false
//                 }, ( err ) => {

//    if ( err ) throw err;

//    console.log('Base de datos ONLINE a localhost:27017/gpsusersdb');
   
// });





// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});


