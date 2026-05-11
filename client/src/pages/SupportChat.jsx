

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const socket = io(API_URL);

const SupportChat = () => {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState(() => {

  const saved =
    localStorage.getItem("chat_history");

  return saved
    ? JSON.parse(saved)
    : [
        {
          sender: "bot",
          text: "👋 Xin chào! Tôi là TL-Stay AI Assistant."
        }
      ];
});

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // AUTO SCROLL
useEffect(() => {

  chatEndRef.current?.scrollIntoView({
    behavior: "smooth"
  });

}, [messages]);


// SAVE CHAT HISTORY
useEffect(() => {

  localStorage.setItem(
    "chat_history",
    JSON.stringify(messages)
  );

}, [messages]);

  // SOCKET RECEIVE ADMIN
  useEffect(() => {

    socket.on("user_receive", (data) => {

      setMessages((prev) => [
        ...prev,
        {
          sender: "admin",
          text: data.message
        }
      ]);
    });

    return () => {
      socket.off("user_receive");
    };

  }, []);

  // SEND MESSAGE
  const handleSend = async () => {

    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message
    };

    setMessages((prev) => [...prev, userMsg]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {

      const res = await fetch(
        `${API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: "guest_001",
            message: currentMessage
          })
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply
        }
      ]);

      // HANDOFF ADMIN
      if (data.handoff) {

        socket.emit("user_message", {
          userId: "guest_001",
          message: currentMessage
        });
      }

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Server đang bận."
        }
      ]);
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-32 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-t-3xl shadow-xl p-6 border-b">

          <h1 className="text-4xl font-bold text-gray-800">
            Hỗ trợ khách hàng TL-Stay
          </h1>

          <p className="text-gray-500 mt-2">
            AI Assistant hỗ trợ đặt phòng và giải đáp thông tin khách sạn 24/7
          </p>

        </div>

        {/* CHAT BOX */}

        <div className="bg-white h-[650px] overflow-y-auto p-6 shadow-xl">

          <div className="flex flex-col gap-4">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] px-5 py-4 rounded-3xl whitespace-pre-line shadow-md ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : msg.sender === "admin"
                      ? "bg-yellow-400 text-black rounded-bl-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >

                  {msg.sender === "bot" && (
                    <p className="font-bold mb-1">
                      🤖 TL-Stay AI
                    </p>
                  )}

                  {msg.sender === "admin" && (
                    <p className="font-bold mb-1">
                      👨‍💻 Nhân viên hỗ trợ
                    </p>
                  )}

                  {msg.text}

                </div>

              </div>
            ))}

            {loading && (

              <div className="flex justify-start">

                <div className="bg-gray-100 px-5 py-4 rounded-3xl shadow">

                  🤖 Đang trả lời...

                </div>

              </div>
            )}

            <div ref={chatEndRef} />

          </div>

        </div>

        {/* INPUT */}

        <div className="bg-white rounded-b-3xl shadow-xl p-5 flex gap-4">

          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-8 rounded-2xl font-semibold"
          >
            Gửi
          </button>

        </div>

      </div>

    </div>
  );
};

export default SupportChat;