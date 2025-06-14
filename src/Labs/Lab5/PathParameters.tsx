import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div>
      <h3>Path Parameters</h3>

      <FormControl
        className="mb-2"
        id="wd-path-parameter-a"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        className="mb-2"
        id="wd-path-parameter-b"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <a
        className="btn btn-primary me-2"
        id="wd-path-parameter-add"
        href={`${REMOTE_SERVER}/lab5/add/${a}/${b}`}
        target="_blank"
        rel="noreferrer"
      >
        Add {a} + {b}
      </a>

      <a
        className="btn btn-danger me-2"
        id="wd-path-parameter-subtract"
        href={`${REMOTE_SERVER}/lab5/subtract/${a}/${b}`}
        target="_blank"
        rel="noreferrer"
      >
        Subtract {a} - {b}
      </a>

      <a
        className="btn btn-success me-2"
        id="wd-path-parameter-multiply"
        href={`${REMOTE_SERVER}/lab5/multiply/${a}/${b}`}
        target="_blank"
        rel="noreferrer"
      >
        Multiply {a} × {b}
      </a>

      <a
        className="btn btn-warning"
        id="wd-path-parameter-divide"
        href={`${REMOTE_SERVER}/lab5/divide/${a}/${b}`}
        target="_blank"
        rel="noreferrer"
      >
        Divide {a} ÷ {b}
      </a>

      <hr />
    </div>
  );
}
