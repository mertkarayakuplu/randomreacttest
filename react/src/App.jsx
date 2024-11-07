import { useState, useCallback, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// const useInterval = function useInterval(callback, time, state) {
//   const savedCallback = useRef();

//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   useEffect(() => {
//     function tick() {
//       if (state) {
//         savedCallback.current();
//       }
//     }

//     let id = setInterval(tick, time);
//     return () => clearInterval(id);
//   }, [time, state]);
// };

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        console.log('useInterval useEffect')
        function tick() {
            console.log('useInterval useTick')
            savedCallback.current();
        }


        if (delay !== null) {
            let id = setInterval(tick, delay);
            console.log('create Interval:' + id)

            return () => {
                clearInterval(id)
                console.log('destroy Interval:' + id)
            };
        }
    }, [delay]);
}


function App() {
  const [count, setCount] = useState(0);

  const [randState, setRandState] = useState("a");

  // const randFn = useCallback(() => {
  //   console.log('called interval, setting state next');
  //   setRandStat("a");
  // }, []);
  const randFn = function () {
    console.log("called interval, setting state next");
    setRandState("a");
  };

  useInterval(randFn, 3000);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
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
          {" "}
          Rand State is {randState}
          <ChildComp passedState={randState} />{" "}
        </p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

const ChildComp = function ({ passedState }) {
  console.log("rendering child comp");

  return (
    <div>
      {"we got"} {passedState}{" "}
    </div>
  );
};

export default App;
