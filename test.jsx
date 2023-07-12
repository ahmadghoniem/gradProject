function App() {
  const [data, setData] = useState({ firstName: "", lastName: "" });
  const [serialPorts, serSerialPorts] = useState([]);

  // useEffect(() => {
  //   const ApiCall = async () => {
  //     const response = await fetch("/api/listPorts");
  //     const data = await response.json();
  //     console.log(data);
  //     setData(data);
  //   };
  //   ApiCall();
  // }, []);

  async function getSerialPorts() {
    const response = await fetch("/api/listPorts");
    const data = await response.json();
    serSerialPorts(data);
  }

  async function getSerialPortData() {
    const response = await fetch("/api/getSerialData");
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={getSerialPorts}>show serial ports</button>
      <br />
      <button onClick={getSerialPortData}>get Data</button>

      <div id="serial-port-list">
        {serialPorts.map((port, index) => (
          <pre key={index}>{JSON.stringify(port)}</pre>
        ))}
      </div>
      <Graph />
    </div>
  );
}
