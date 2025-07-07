import express from 'express';
import notesRoutes from "./src/routes/notes.js"
import morgan from 'morgan';
import cors from "cors";
import { connectDB } from './src/db/connect.js';

const app= express()
const PORT= 4000;

app.use(express.json())
app.use(morgan( (tokens, req, res) => [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  ))
app.use(cors({
  origin: "*",
}));


app.listen(PORT, ()=> console.log(`listend in http://localhost:${PORT}`))

connectDB()

app.use("/api/notes", notesRoutes)