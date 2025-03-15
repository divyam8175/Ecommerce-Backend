import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
//configure env
dotenv.config();
const __filename=fileURLToPath(import.meta.url); 
const __dirname=path.dirname(__filename);
//databse config
// const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')));
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});
app.use(express.static(path.join(__dirname, 'client', 'build')));
const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

//rest api
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
} );

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
