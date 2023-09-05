import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

async function getNotes() {
  const res = await fetch("https://orzpass-api.netlify.app/notes");
  const data = await res.json();
  return data;
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("");

  useEffect(() => {
    const fn = async () => {
      const res = await getNotes();
      console.log("rrrrrrr", res);
      setData(JSON.stringify(res));
    };

    fn();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <p>{data}</p>
    </>
  );
}

export default App;
