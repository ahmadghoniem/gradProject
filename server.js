import express from "express";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;
app.use(express.json({ extended: false }));

const SERIALPORT = new SerialPort({
  path: "COM15",
  baudRate: 115200,
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\n" }));
  parser.on("data", (data) => {
    console.log(data);
  });
});

app.get("/api/getSerialData", (req, res) => {
  try {
    const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\n" }));
    parser.on("data", (data) => {
      res.json(data);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/listPorts", async (req, res) => {
  try {
    const serialPorts = await SerialPort.list();
    res.json(serialPorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(6001, "localhost", () => {
  console.log(`Server listening on port ${PORT}`);
});
