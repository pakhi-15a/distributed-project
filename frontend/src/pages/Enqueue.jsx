import { useState } from "react";
import { enqueueToken } from "../services/api";

export default function Enqueue() {
  const [token, setToken] = useState(null);

  async function handleEnqueue() {
    const data = await enqueueToken();
    setToken(data.queue[data.queue.length - 1]);
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Take a Token</h1>
        <button onClick={handleEnqueue}>Generate Token</button>

        {token && (
          <p style={{ marginTop: "20px" }}>
            Your token number: <strong>{token.id}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
