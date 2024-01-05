const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

// db connection
require("./database/connection");

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// routes
const userR = require("./routes/userRoutes");

// endpoints
app.use("/api/user", userR);

// Socket.IO logic
const httpServer = require("http").createServer(app);
const configureSocket = require("./utils/socketIO");

configureSocket(httpServer);

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
