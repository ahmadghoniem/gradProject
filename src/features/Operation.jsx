import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Graph from "../components/Graph";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3003", {
  transports: ["websocket"],
  autoConnect: false,
});

const Operation = () => {
  const [serialPorts, setSerialPorts] = useState(null);
  const [chartdata, setChartData] = useState([
    {
      time: 0,
      temp: 23,
    },
  ]);
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ path, baudRate }) => {
    socket.connect();
    socket.emit(
      "sendCred",
      { path, baudRate: parseInt(baudRate) },
      (response) => {
        console.log(response); // "got it"
      }
    );
  };

  useEffect(() => {
    socket.on("getParsedData", (data) => {
      setChartData((prevData) => [
        ...prevData,
        { time: prevData.length * 1, temp: data },
      ]);
    });
    socket.on("connect", () => {
      alert("connected");
      //live tag
    });

    socket.on("disconnect", () => {
      alert("disconnected");
      //NOT LIVE
    });

    return () => {
      socket.disconnect();
    };
  });

  async function listPorts() {
    let res = await fetch("./api/listPorts");
    let ports = await res.json();
    setSerialPorts(ports);
  }

  return (
    <section className="flex flex-col">
      <h1>Operation</h1>
      <h1>live or not live</h1>
      <button
        onClick={() =>
          setChartData((prevData) => [
            ...prevData,
            {
              time: prevData.length,
              temp: 23.53,
            },
          ])
        }
      >
        ADD NEW{" "}
      </button>
      <button onClick={listPorts}>list COM PORTS</button>
      {serialPorts !== null && (
        <div>
          <span>
            found {serialPorts.length} serial port
            {serialPorts.length !== 1 && "s"}
          </span>
          {serialPorts.map(
            (
              { path, manufacturer, serialNumber, vendorId, productId },
              index
            ) => (
              <div key={index} className="flex flex-col justify-center">
                <span>path: {path}</span>
                <span>manufacturer: {manufacturer}</span>
                <span>serialNumber: {serialNumber}</span>
                <span>vendorId: {vendorId}</span>
                <span>productId: {productId}</span>
              </div>
            )
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Enter serial port number"
          {...register("path", { required: true })}
        />
        <input
          placeholder="Enter baudRate"
          type="number"
          {...register("baudRate", { required: true })}
        />
        <input type="submit" value="send" />
      </form>
      <button onClick={() => socket.disconnect()}>disconnect</button>

      <Graph chartdata={chartdata} />
    </section>
  );
};

export default Operation;
