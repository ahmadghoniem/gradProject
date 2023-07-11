import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const ApiCall = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      setData(data);
    };
    ApiCall();
  }, []);
  const { firstName, lastName } = data;
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">
        DATA FROM API: {`${firstName} ${lastName}`}
      </h1>
    </div>
  );
}

export default App;
