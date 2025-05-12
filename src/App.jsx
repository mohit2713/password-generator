import { useState, useCallback, useRef } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyVariable, setCopyVariable] = useState("copy");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let passwordGenerated = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#<>$%&*()=+";
    for (let i = 0; i < length; i++) {
      const pass = Math.floor(Math.random() * str.length);
      passwordGenerated += str.charAt(pass);
    }
    setPassword(passwordGenerated);
    setCopyVariable("copy");
  }, [length, numberAllowed, charAllowed, setPassword, setCopyVariable]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password);
    setCopyVariable("copied");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="sm:w-full lg:w-[40%] mx-auto mt-10 h-full justify-center text-center border rounded-lg bg-green-800 text-white">
      <h1 className="text-2xl mt-3">Password Generator</h1>
      <div className="w-full">
        <input
          type="text"
          value={password}
          placeholder="password"
          readOnly
          ref={passwordRef}
          className="text-black outline-none  bg-white w-[70%] rounded-l-sm p-2 mt-2 "
        />
        <button
          className="bg-blue-600 cursor-pointer rounded-r-lg p-2   "
          onClick={copyPasswordToClipboard}
        >
          {copyVariable}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-3 p-2">
        <div>
          <input
            type="range"
            min="8"
            max="50"
            className="w-[200px] mr-2"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length:{length}</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            className="mr-2"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label>Number</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
                className="mr-2"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
