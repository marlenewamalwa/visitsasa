import React from "react";

function TravelTips() {
  const tips = [
    "Always carry water when exploring wildlife parks.",
    "Respect local customs and traditions.",
    "Book packages in advance during peak season.",
    "Keep your belongings safe and secure.",
    "Check weather forecasts before traveling.",
  ];

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1>Travel Tips for Kenya</h1>
      <ul>
        {tips.map((tip, index) => (
          <li key={index} style={{ marginBottom: 10 }}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default TravelTips;