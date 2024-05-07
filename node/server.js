const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socked.io')(http,{
        allowEIO3:true,
        cors:{
            origin:['http://localhost'],
            credential:true
        }
    }),
    { MongoClient } = require('mongodb'),
    url = 'mongodb://localhost:27017',
    client = new MongoClient(url),
    dbname = 'chatUGB',
    port = 3001;
app.use(express.json());

async function conectarMongoDb(){
    await client.connect();
    return client.db(dbname);
}
app.get('/', (req, resp)=>{
    resp.sendFile(__dirname + '/index.html');
});
app.post('/usuarios/guardar',async(req, resp)=>{
    let db = await conectarMongoDb(),
        collection=db.collection('usuarios');
    collection.insertOne(req.body);
    resp.send(req.body);
});
http.listen(port, event=>{
    console.log("Server ejecutado en el puerto", port);
});