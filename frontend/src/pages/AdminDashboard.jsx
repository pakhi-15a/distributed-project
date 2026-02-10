import { useEffect, useState } from "react";
import { getStatus } from "../services/api";

export default function AdminDashboard() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getStatus().then(setStatus);
  }, []);

  if (!status) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Node ID: {status.nodeId}</p>
      <p>Peers Connected: {status.peerCount}</p>
    </div>
  );
}

