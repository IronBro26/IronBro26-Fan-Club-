"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function useLocalStorageState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue] as const;
}

export default function BroSquadPage() {
  const [active, setActive] = useState<"home" | "squad" | "chat" | "members">(
    "home"
  );

  // Chat state
  const [chatMessages, setChatMessages] = useLocalStorageState<Array<{
    username: string;
    message: string;
    time: string;
  }>>("chatMessages", []);

  // Members state
  const [members, setMembers] = useLocalStorageState<
    Array<{ displayName: string; email: string }>
  >("members", []);

  // Inputs
  const [chatUsername, setChatUsername] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const squad = useMemo(
    () => [
      { src: "/IronBro.jpg", name: "IronBro" },
      { src: "/Gigzy.jpg", name: "Gigzy" },
      { src: "/AL737.jpg", name: "AL737" },
      { src: "/MonkeyBull1113.jpg", name: "MonkeyBull1113" },
    ],
    []
  );

  const sendChat = () => {
    const u = chatUsername.trim();
    const m = chatMessage.trim();
    if (!u || !m) {
      alert("Enter name and message!");
      return;
    }
    const t = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages([...chatMessages, { username: u, message: m, time: t }]);
    setChatUsername("");
    setChatMessage("");
  };

  const addMember = () => {
    let name = memberName.trim();
    const email = memberEmail.trim();
    if (!name || !email) {
      alert("Enter both name and email!");
      return;
    }
    if (email.toLowerCase() === "krfuchs11@icloud.com") {
      name = "IronBro26";
    }
    setMembers([...members, { displayName: name, email }]);
    setMemberName("");
    setMemberEmail("");
  };

  const deleteChatAt = (index: number) => {
    const next = chatMessages.slice();
    next.splice(index, 1);
    setChatMessages(next);
  };

  return (
    <div className="page-root">
      <div className="sidebar">
        <img src="/my-logo.png" alt="Logo" />
        <h1>BroSquad</h1>
        <Link href="/">🏠 Home</Link>
        <a
          href="https://www.youtube.com/watch?v=91CukCAOb8o&list=PLTJ9h1gG8tHnzvKt0C06Nf7WFD4NPZMDr"
          target="_blank"
          rel="noreferrer"
        >
          🎬 Premium Videos
        </a>
        <button className="nav" onClick={() => setActive("chat")}>💬 Chat</button>
        <button className="nav" onClick={() => setActive("squad")}>
          👥 Meet the Squad
        </button>
        <a href="https://www.greenfoot.org/scenarios/35419" target="_blank" rel="noreferrer">
          🎮 Play Space Blasters
        </a>
        <button className="nav" onClick={() => setActive("members")}>
          📝 Members Signed Up
        </button>
      </div>

      <div className="content">
        {active === "home" && (
          <div className="section active">
            <h2 className="section-title">🏠 BroSquad Homepage</h2>
            <p className="welcome">
              Welcome to <strong>BroSquad</strong>! 🚀 Join the squad, chat with fans,
              watch premium videos, meet our members, play our Greenfoot game
              <strong> Space Blasters</strong>, and see who has signed up! Also make sure
              to sub to my channel — it really helps a lot. Thank you so much and have a
              great visit!
            </p>
          </div>
        )}

        {active === "squad" && (
          <div className="section active">
            <h2 className="section-title">👥 Meet the Squad</h2>
            <div className="squad-container">
              {squad.map((m) => (
                <div className="squad-member" key={m.name}>
                  <img src={m.src} alt={m.name} />
                  <span>{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "chat" && (
          <div className="section active">
            <h2 className="section-title">💬 Chat</h2>
            <div className="chat-container">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className="chat-bubble"
                  onContextMenu={(e) => {
                    e.preventDefault();
                    if (confirm("Delete?")) deleteChatAt(index);
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
                value={chatUsername}
                onChange={(e) => setChatUsername(e.target.value)}
              />
              <textarea
                placeholder="Write your message..."
                rows={2}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button onClick={sendChat}>Send</button>
            </div>
          </div>
        )}

        {active === "members" && (
          <div className="section active">
            <h2 className="section-title">📝 Members Signed Up</h2>
            <div className="members-list">
              {members.map((m, i) => {
                const hideEmail = m.email.toLowerCase() === "krfuchs11@icloud.com";
                return (
                  <div className="member-item" key={i}>
                    {m.displayName}
                    {!hideEmail && <span className="email"> ({m.email})</span>}
                  </div>
                );
              })}
            </div>
            <div className="members-form">
              <input
                type="text"
                placeholder="Your Name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
              />
              <button onClick={addMember}>Sign Up</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .page-root { margin: 0; font-family: Arial, sans-serif; background: linear-gradient(135deg,#0a0a0a,#1a1a1a); color: white; min-height: 100vh; display: flex; }
        .sidebar { width: 250px; background: #111; padding: 20px; position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; align-items: center; box-shadow: 0 0 20px #ff1a1a inset; }
        .sidebar img { width: 100px; border-radius: 50%; margin-bottom: 15px; box-shadow: 0 0 15px #ff1a1a, 0 0 30px #ff3333; }
        .sidebar h1 { font-size: 22px; margin-bottom: 20px; text-align: center; color: #ff1a1a; text-shadow: 0 0 10px #ff1a1a, 0 0 25px #ff4444; }
        .sidebar a, .sidebar .nav { color: #fff; text-decoration: none; padding: 10px; display: block; text-align: center; margin: 5px 0; border-radius: 8px; transition: .3s; box-shadow: 0 0 5px #ff1a1a; background: transparent; border: none; cursor: pointer; width: 100%; }
        .sidebar a:hover, .sidebar .nav:hover { background: #ff1a1a; color: #000; box-shadow: 0 0 15px #ff3333, 0 0 30px #ff6666; }
        .content { margin-left: 20px; padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .section-title { text-align: center; color: #ff1a1a; text-shadow: 0 0 10px #ff1a1a, 0 0 25px #ff4444; margin-top: 20px; }
        .squad-container { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 30px; }
        .squad-member { display: flex; flex-direction: column; align-items: center; background: #111; padding: 10px; border-radius: 12px; box-shadow: 0 0 15px #ff1a1a; transition: 0.3s; width: 120px; }
        .squad-member img { width: 80px; border-radius: 50%; margin-bottom: 10px; box-shadow: 0 0 10px #ff1a1a; }
        .squad-member:hover { transform: scale(1.05); box-shadow: 0 0 25px #ff5555, 0 0 40px #ff7777; }
        .chat-container { flex: 1; overflow-y: auto; padding: 10px; background: #111; border-radius: 12px; display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; box-shadow: 0 0 20px #ff1a1a inset; max-height: 50vh; }
        .chat-bubble { max-width: 80%; padding: 12px; border-radius: 18px; word-wrap: break-word; line-height: 1.4; display: inline-block; background: #222; border-left: 4px solid #ff1a1a; box-shadow: 0 0 10px #ff1a1a; cursor: pointer; transition: 0.2s; }
        .chat-bubble:hover { transform: scale(1.03); box-shadow: 0 0 15px #ff4444; }
        .chat-time { font-size: 10px; color: #ccc; margin-top: 4px; text-align: right; }
        .chat-form { display: flex; flex-direction: column; gap: 8px; }
        .chat-form input, .chat-form textarea { padding: 10px; border-radius: 12px; border: none; font-size: 14px; resize: none; background: #222; color: #fff; box-shadow: 0 0 8px #ff1a1a inset; }
        .chat-form button { padding: 12px; border-radius: 12px; border: none; background: #ff1a1a; color: white; font-weight: bold; cursor: pointer; transition: .3s; box-shadow: 0 0 10px #ff1a1a, 0 0 20px #ff4444; }
        .chat-form button:hover { background: #ff3333; box-shadow: 0 0 15px #ff6666, 0 0 30px #ff9999; }
        .welcome { text-align: center; font-size: 18px; margin-top: 15px; }
        .members-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 10px; }
        .member-item { padding: 10px; background: #111; border-radius: 8px; box-shadow: 0 0 10px #ff1a1a; }
        .email { color: #ddd; }
      `}</style>
    </div>
  );
}
