import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

export { app, server };
