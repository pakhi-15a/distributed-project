import { WebSocketServer } from "ws";
import WebSocket from "ws";
import { getState, setState } from "./queue.js";
import { PEERS } from "./config.js";

const peers = new Set();

export function startPeerSync(server) {
  const wss = new WebSocketServer({ server });

  // Handle incoming connections
  wss.on("connection", ws => {
    peers.add(ws);

    // Send our state immediately
    ws.send(JSON.stringify({
      type: "STATE",
      ...getState()
    }));

    ws.on("message", data => {
      const msg = JSON.parse(data);
      const local = getState();

      if (msg.type === "STATE" && msg.version > local.version) {
        setState(msg.queue, msg.version);
        console.log("State updated from peer");
      }
    });

    ws.on("close", () => peers.delete(ws));
  });

  // Outgoing connections
PEERS.forEach(peerUrl => {
  const ws = new WebSocket(peerUrl);

  ws.on("open", () => {
    peers.add(ws);
    ws.send(JSON.stringify({
      type: "STATE",
      ...getState()
    }));
    console.log(`Connected to peer ${peerUrl}`);
  });

  ws.on("message", data => {
    const msg = JSON.parse(data);
    const local = getState();
    if (msg.type === "STATE" && msg.version > local.version) {
      setState(msg.queue, msg.version);
      console.log("State updated from peer");
    }
  });

  // ✅ ADD THIS (CRITICAL)
  ws.on("error", err => {
    console.log(`Peer ${peerUrl} unreachable (will retry later)`);
  });

  ws.on("close", () => {
    peers.delete(ws);
  });
});

}

export function broadcastState() {
  const state = getState();
  peers.forEach(ws => {
    ws.send(JSON.stringify({
      type: "STATE",
      ...state
    }));
  });
}

// set NODE_ID=counter-2
// set PORT=5001
// set PEERS=ws://10.13.225.28:5000
// npm start
