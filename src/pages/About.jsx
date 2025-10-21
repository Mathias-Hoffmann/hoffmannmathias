import React, { useState, useEffect } from "react";

// Composant effet machine à écrire
function Typewriter({ text, color = "#000000", speed = 50 }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <p
      style={{
        fontFamily: "Press Start 2P, monospace",
        fontSize: "28px", // 🚀 beaucoup plus grand
        lineHeight: "2em",
        color: color,
        textAlign: "left",
        whiteSpace: "pre-wrap",
        maxWidth: "900px", // large bloc pour bien occuper la place
      }}
    >
      {displayed}
    </p>
  );
}

export default function About() {
  const introText =
    "Hi, I’m a French computer engineering student, with a strong interest in cognitive science.";

  return (
    <div
      style={{
        fontFamily: "Press Start 2P, monospace",
        display: "flex",
        alignItems: "center", // 🔑 centrage vertical
        justifyContent: "flex-start",
        padding: "80px",
        gap: "60px",
      }}
    >
      {/* Image papillon à gauche */}
      <img
        src="/hoffmannmathias/images/portrait_butterfly.png"
        alt="Portrait Butterfly"
        style={{
          width: "180px",
          height: "auto",
        }}
      />

      {/* Texte machine à écrire énorme */}
      <Typewriter text={introText} color="#000000" speed={35} />
    </div>
  );
}
