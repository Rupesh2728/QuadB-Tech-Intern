const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer=async ()=>{
    server.listen(PORT,()=>{
        console.log("Server started on port "+ PORT);
    });
}

startServer();