import { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  // 点击按钮时获取欢迎消息
  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
  };

  // 页面加载时自动获取欢迎消息
  const fetchWelcomeOnLoad = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnLoad(message);
  };

  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div>
      <h3>HTTP Client</h3>
      <hr />

      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button>
      <br />
      Response from server (click): <b>{welcomeOnClick}</b>

      <hr />

      <h4>Requesting on Load</h4>
      Response from server (load): <b>{welcomeOnLoad}</b>

      <hr />
    </div>
  );
}
