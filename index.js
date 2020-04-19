/**
 * @file index.js
 * @description Entry point of App
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 * @version 1.0
 */




//
// ────────────────────────────────────────────────────────── INIT APP ─────
//

const utils = require("./utils");
utils.initApp();

// modules import
const express = require("express");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;
const INDEX = "./index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => utils.info('Server', `http://localhost:${PORT}`));

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  utils.log("Client connected");
  ws.on("close", (code, reason) => utils.log("Client disconnected:", code, reason));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 10000);