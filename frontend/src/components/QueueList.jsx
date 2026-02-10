export default function QueueList({ queue }) {
  return (
    <ul>
      {queue.map((item, index) => (
        <li key={item.id}>
          <span>Token #{index + 1}</span>
          <span>{item.status}</span>
        </li>
      ))}
    </ul>
  );
}
