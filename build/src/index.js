import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import process from 'process';
import { Server } from 'socket.io';
const app = express();
const port = parseInt(process.env.PORT || '', 10);
const publicRoot = path.join(process.cwd(), 'public');
const credentials = {
    cert: fs.readFileSync(process.env.CERT_PATH || ''),
    key: fs.readFileSync(process.env.KEY_PATH || ''),
    ecdhCurve: process.env.ECDH_CURVE,
    passphrase: process.env.KEY_PASSPHRASE,
};
const server = https.createServer(credentials, app);
const io = new Server(server);
app.use(express.static(publicRoot));
app.get('/', (_, res) => {
    res.sendFile(path.join(publicRoot, 'index.html'));
});
io.on('connection', socket => {
    console.log('User connected');
    socket.on('disconnect', reason => {
        console.log(`User disconnected; reason: ${reason}`);
    });
});
server.listen(port, () => {
    console.log(`Listening at localhost:${port}`);
});
//# sourceMappingURL=index.js.map