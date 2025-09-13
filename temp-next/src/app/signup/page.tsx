"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const allowedEmail = "krfuchs11@icloud.com";
  const paypalSubscriptionLink =
    "https://www.paypal.com/webapps/billing/subscriptions?plan_id=P-809957333S6794836NC2FUWY";

  const proceed = () => {
    const value = email.trim().toLowerCase();
    if (!value) {
      setStatus("Enter a valid email!");
      return;
    }

    if (value === allowedEmail) {
      // Free access
      try {
        localStorage.setItem("broAccess", "granted");
        localStorage.setItem("broEmail", value);
      } catch {}
      router.push("/brosquad");
    } else {
      window.location.href = paypalSubscriptionLink;
    }
  };

  const goHome = () => router.push("/");

  return (
    <div className="signup-root">
      <div className="container">
        <h1>
          🔥 Join the Bro Squad 🔥 for only $4.99 and get exclusive premium videos,
          get featured in my videos, and chat with me exclusively
        </h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="buttons">
          <button onClick={proceed}>➡️ Proceed</button>
          <button onClick={goHome}>🏠 Home</button>
        </div>
        <p id="status">{status}</p>
      </div>

      <style jsx>{`
        .signup-root {
          font-family: Arial, sans-serif;
          background: #0d0d0d;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 16px;
        }
        .container {
          background: #111;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 0 30px #ff1a1a;
          text-align: center;
          width: 100%;
          max-width: 420px;
        }
        h1 {
          color: #ff1a1a;
          text-shadow: 0 0 10px #ff1a1a;
          font-size: 24px;
          margin-bottom: 20px;
        }
        input {
          padding: 12px;
          border-radius: 12px;
          border: none;
          margin-bottom: 15px;
          width: 100%;
          background: #222;
          color: #fff;
        }
        .buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        button {
          padding: 12px 20px;
          margin-top: 10px;
          border-radius: 12px;
          border: none;
          background: #ff1a1a;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 0 10px #ff1a1a;
        }
        button:hover {
          background: #ff3333;
          box-shadow: 0 0 15px #ff6666;
        }
        #status {
          margin-top: 15px;
          color: #ff1a1a;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
