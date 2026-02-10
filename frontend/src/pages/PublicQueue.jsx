import { useEffect, useState } from "react";
import { getQueue } from "../services/api";
import QueueList from "../components/QueueList";

export default function PublicQueue() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    getQueue().then(data => setQueue(data.queue));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Live Queue</h1>
        {queue.length === 0 ? (
          <p className="empty">No one in queue</p>
        ) : (
          <QueueList queue={queue} />
        )}
      </div>
    </div>
  );
}
