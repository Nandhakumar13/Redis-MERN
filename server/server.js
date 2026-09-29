const app  = require('./app');
const db = require('./db/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path:path.join(__dirname,'utils/config.env')});

db();

const server = app.listen(process.env.PORT,()=>{
    console.log("==Server running on "+ process.env.PORT);
})

process.on('unHandledRejection', (err)=>{
    console.log(`Error :: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection');

    server.close(()=>{ 
        process.exit(1)
    })
    
})

