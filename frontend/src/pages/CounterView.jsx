import { dequeueToken } from "../services/api";

export default function CounterView() {
  return (
    <div>
      <h1>Counter</h1>
      <button onClick={dequeueToken}>Serve Next</button>
    </div>
  );
}
