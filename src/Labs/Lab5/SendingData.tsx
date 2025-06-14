const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function SendingData() {
  return (
    <div id="wd-sending-data">
      <h3>Sending Data to Server</h3>

      {/* Path Parameters 示例 */}
      <a
        href={`${REMOTE_SERVER}/lab5/add/2/5`}
        className="list-group-item"
        target="_blank"
        rel="noreferrer"
      >
        Add 2 + 5 using Path Parameters
      </a>

      {/* Query Parameters 示例 */}
      <a
        href={`${REMOTE_SERVER}/lab5/add?a=3&b=7`}
        className="list-group-item"
        target="_blank"
        rel="noreferrer"
      >
        Add 3 + 7 using Query Parameters
      </a>
      <hr />
    </div>
  );
}
