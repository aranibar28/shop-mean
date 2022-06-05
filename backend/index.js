require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db_connection } = require("./database/config");

const app = express(); // Servidor Express
app.use(cors()); // Configuración CORS
app.use(express.json()); // Lectura y Parseo del body
db_connection(); // Conexión Base de Datos

const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("insert-item-cart", (data) => {
    io.emit("new-item-cart", data);
  });
  socket.on("delete-item-cart", (data) => {
    io.emit("update-item-cart", data);
  });
  socket.on("login", (data) => {
    io.emit("new-login", data);
  });
});

// Rutas API
app.use("/api/login", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/config", require("./routes/config"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/suppliers", require("./routes/suppliers"));
app.use("/api/discounts", require("./routes/discounts"));
app.use("/api/coupons", require("./routes/coupons"));

app.use("/api/public", require("./routes/public"));
app.use("/api/cart", require("./routes/cart"));

server.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
