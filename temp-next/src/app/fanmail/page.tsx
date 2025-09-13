"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface FanMessage {
  username: string;
  message: string;
  time: string;
}

export default function FanMailPage() {
  const [messages, setMessages] = useState<FanMessage[]>([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fanMailMessages");
      setMessages(raw ? JSON.parse(raw) : []);
    } catch {
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("fanMailMessages", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const send = () => {
    const u = username.trim();
    const m = message.trim();
    if (!u || !m) {
      alert("Please enter both name and message!");
      return;
    }
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([...messages, { username: u, message: m, time }]);
    setUsername("");
    setMessage("");
  };

  const removeAt = (index: number) => {
    const next = messages.slice();
    next.splice(index, 1);
    setMessages(next);
  };

  return (
    <div className="root">
      <div className="sidebar">
        <img src="/my-logo.png" alt="Logo" />
        <h1>IronBro26 Fan Club</h1>
        <Link href="/">🏠 Home</Link>
        <Link href="/fanmail">💌 Fan Mail</Link>
        <Link href="/signup" target="_blank">🔑 Sign Up</Link>
      </div>

      <div className="content">
        <h2 className="title">💌 Fan Mail Wall</h2>
        <div className="chat-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="chat-bubble"
              onContextMenu={(e) => {
                e.preventDefault();
                if (confirm("Do you want to delete this message?")) removeAt(index);
              }}
            >
              <strong>{msg.username}</strong>
              <div className="chat-time">{msg.time}</div>
              <div>{msg.message}</div>
            </div>
          ))}
        </div>
        <div className="chat-form">
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            placeholder="Write your message..."
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={send}>Send</button>
        </div>
      </div>

      <style jsx>{`
        .root { margin:0; display:flex; height:100vh; background: linear-gradient(135deg, #0a0a0a, #1a1a1a); color:white; font-family: Arial, sans-serif; }
        .sidebar { width:250px; background:#111; padding:20px; position:sticky; top:0; height:100vh; display:flex; flex-direction:column; align-items:center; box-shadow:0 0 20px #ff1a1a inset; }
        .sidebar img { width:100px; border-radius:50%; margin-bottom:15px; box-shadow:0 0 15px #ff1a1a, 0 0 30px #ff3333; }
        .sidebar h1 { font-size:22px; margin-bottom:20px; text-align:center; color:#ff1a1a; text-shadow:0 0 10px #ff1a1a, 0 0 25px #ff4444; }
        .sidebar a { color:#fff; text-decoration:none; padding:10px; display:block; text-align:center; margin:5px 0; border-radius:8px; transition:.3s; box-shadow:0 0 5px #ff1a1a; }
        .sidebar a:hover { background:#ff1a1a; color:#000; box-shadow:0 0 15px #ff3333, 0 0 30px #ff6666; }
        .content { margin-left:20px; padding:20px; flex:1; display:flex; flex-direction:column; }
        .title { text-align:center; color:#ff1a1a; text-shadow:0 0 10px #ff1a1a, 0 0 25px #ff4444; }
        .chat-container { flex:1; overflow-y:auto; padding:10px; background:#111; border-radius:12px; display:flex; flex-direction:column; gap:10px; margin-bottom:15px; box-shadow:0 0 20px #ff1a1a inset; }
        .chat-bubble { max-width:80%; padding:12px; border-radius:18px; word-wrap:break-word; line-height:1.4; display:inline-block; background:#222; border-left:4px solid #ff1a1a; box-shadow:0 0 10px #ff1a1a; cursor:pointer; transition:0.2s; }
        .chat-bubble:hover { transform: scale(1.03); box-shadow: 0 0 15px #ff4444; }
        .chat-time { font-size:10px; color:#ccc; margin-top:4px; text-align:right; }
        .chat-form { display:flex; flex-direction:column; gap:8px; }
        .chat-form input, .chat-form textarea { padding:10px; border-radius:12px; border:none; font-size:14px; resize:none; background:#222; color:#fff; box-shadow:0 0 8px #ff1a1a inset; }
        .chat-form button { padding:12px; border-radius:12px; border:none; background:#ff1a1a; color:white; font-weight:bold; cursor:pointer; transition:.3s; box-shadow:0 0 10px #ff1a1a, 0 0 20px #ff4444; }
        .chat-form button:hover { background:#ff3333; box-shadow:0 0 15px #ff6666, 0 0 30px #ff9999; }
      `}</style>
    </div>
  );
}
