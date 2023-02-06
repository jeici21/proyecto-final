import React, { useState } from "react";

const WhatsAppForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Phone number (including country code)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button type="button" onClick={sendMessage}>
        Send
      </button>
    </form>
  );
};

export default WhatsAppForm;
