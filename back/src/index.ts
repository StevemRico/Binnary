import "reflect-metadata";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import {createConnection} from "typeorm";

import UserRoutes from './routes/User.routes'
import PublicationRoutes from './routes/Publication.routes';
import helmet from "helmet";

//Soketio
// import {Server as WebSocketServer} from 'socket.io';
// import http from 'http';

const app = express();

// const httpServer = http.createServer(app);
// const io = new WebSocketServer(httpServer);
createConnection();

// Settings
app.set('port', process.env.PORT || 3030);

// middlewares
app.use(cors());
app.use(morgan('dev')); //dev y common
app.use(helmet());
app.use(express.json());

// routes
app.use(UserRoutes);
app.use(PublicationRoutes);

app.use('/public', express.static(path.resolve('public')));
app.use(express.static(__dirname + "/public"));

app.listen(app.get('port'), () =>{console.log(`server on port ${app.get("port")}`);});
// httpServer.listen(app.get('port'));