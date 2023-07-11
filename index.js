import express from "express";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const SERIALPORT = new SerialPort({
  path: "COM15",
  baudRate: 115200,
});
const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\n" }));
parser.on("data", (data) => {
  console.log("data:", data);
});

const app = express();
const PORT = 6001;
app.use(express.json({ extended: false }));

app.get("/api", (req, res) => {
  try {
    const mockData = {
      firstName: "Adeesh",
      lastName: "Sharma",
    };

    res.json(mockData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(6001, "localhost", () => {
  console.log(`Server listening on port ${PORT}`);
});
