"use strict";

// Imports
const express = require("express");
const session = require("express-session");
const { ExpressOIDC } = require("@okta/oidc-middleware");
const { auth, requiresAuth } = require('express-openid-connect');
const path = require('path');
const http = require('http'); // Para el servidor HTTP
const { Server } = require("socket.io"); // Socket.IO
require('dotenv').config();


// Inicializar Express y HTTP Server
let app = express();
const server = http.createServer(app); // Crear servidor HTTP con Express
const io = new Server(server); // Inicializar Socket.IO

// Globals
const PORT = process.env.PORT || 3002; // Definir el puerto desde las variables de entorno
const SECRET = process.env.AUTH0_SECRET || "default_secret_key"; // Usar el secreto de las variables de entorno o un valor por defecto

// Configuración de Okta/Auth0
const config = {
  authRequired: false, // No es obligatorio para la raíz
  auth0Logout: true, 
  secret: SECRET, // Usar la variable SECRET aquí
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Configuración de Express y Middlewares
app.engine('html', require('consolidate').swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use("/static", express.static("static"));
app.use(session({
  cookie: { httpOnly: true },
  secret: SECRET, // Usar la variable SECRET aquí también
  resave: false,
  saveUninitialized: true,
}));

// Autenticación con OpenID Connect
app.use(auth(config));

// Rutas
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", requiresAuth(), (req, res) => {
  const payload = Buffer.from(req.oidc.idToken.split('.')[1], 'base64').toString('utf-8');
  const userInfo = JSON.parse(payload);
  res.render("dashboard", { user: userInfo });
});

// Manejo de eventos de conexión de Socket.IO
io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado");

  socket.on("Evento-Mensaje-Server", (msg) => {
    console.log("Mensaje recibido:", msg);
    io.emit("Evento-Mensaje-Server", msg); // Reenvía el mensaje a todos los clientes
  });

  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado");
  });
});

// Iniciar servidor HTTP y Socket.IO
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
