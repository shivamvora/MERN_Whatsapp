// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import Cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher( {
    appId: "1324740",
    key: "6795240dbeff49a7bac1",
    secret: "7aa89b5fd0985d465a99",
    cluster: "ap2",
    useTLS: true
} );


// middleware
app.use( express.json() );
app.use( Cors() );
// app.use( ( req, res, next ) => {
//     res.setHeader( 'Access-Control-Allow-Origin', '*' );
//     res.setHeader( 'Access-Control-Allow-Headers', '*' );
//     next();
// } )

// DB config
const connection_url = 'mongodb+srv://shivam:whatsapp_mern@cluster0.wl6kt.mongodb.net/WHATSAPP-MERN-BACKEDN?retryWrites=true&w=majority';

mongoose.connect( connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function ( err ) {
    err ? console.log( `MongoDB failed to connect see what's the error : ${err}` ) : console.log( 'Connected to MongoDB.....' );
} );
// api routes

const db = mongoose.connection;
db.once( 'open', () => {
    console.log( 'DB is connected' );
    const msgCollection = db.collection( 'messagecontents' );
    const changeStream = msgCollection.watch();

    changeStream.on( 'change', ( change ) => {
        console.log( 'change: ', change );
        if ( change.operationType === 'insert' ) {
            const messageDetails = change.fullDocument;
            console.log( 'messageDetails: ', messageDetails );
            pusher.trigger( 'messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            } )
        } else {
            console.log( "Error triggering Pusher" );
        }
    } )
} )

app.get( '/', ( req, res ) => res.status( 200 ).send( 'Server starting' ) )

app.get( '/messages/sync', ( req, res ) => {
    Messages.find( ( err, data ) => {
        if ( err ) {
            res.status( 500 ).send( err );
        } else {
            res.status( 200 ).send( data );
        }
    } )
} )

app.post( '/messages/new', ( req, res ) => {
    const dbMessage = req.body;
    console.log( 'dbMessage: ', dbMessage );
    Messages.create( dbMessage, ( err, data ) => {
        if ( err ) {
            res.status( 500 ).send( err );
        } else {
            res.status( 201 ).send( data );
        }
    } )

} )

// listen
app.listen( port, () => console.log( `Listening on localhost:${port}` ) )