import { useState, useRef, useCallback } from "react";

const DOG_ART = [
  "................",
  "....OOOO........",
  "..OOEEBBOO......",
  ".OEEOBBBBEEO....",
  ".OEEOBNBNBEEO...",
  ".OEEOBBBBBEEO...",
  ".OEEOBBNNBEEO...",
  ".OEEOBBTTBBEO...",
  "..OEEOBBBBOO....",
  "...OEOOOOO......",
  "....OBBO........",
  "...OBBBBO.......",
  "..OBBBBBBO......",
  "..OOOOOOOO......",
  "................",
  "................",
];

const COLORS: Record<string, string> = {
  O: "#1F1512",
  B: "#F4E6CE",
  E: "#8B3A1F",
  N: "#1F1512",
  T: "#D9541E",
  ".": "transparent",
};

function PixelDog({ scale = 5, tilt = 0 }: { scale?: number; tilt?: number }) {
  const rows = DOG_ART.length;
  const cols = DOG_ART[0].length;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${scale}px)`,
        gridTemplateRows: `repeat(${rows}, ${scale}px)`,
        imageRendering: "pixelated" as const,
        transform: `rotate(${tilt}deg) translateY(${Math.abs(tilt) * 0.3}px)`,
        transformOrigin: "50% 90%",
        transition: "transform 80ms linear",
      }}
    >
      {DOG_ART.flatMap((row, r) =>
        row.split("").map((ch, c) => (
          <div
            key={`${r}-${c}`}
            style={{
              background: COLORS[ch] || "transparent",
              width: scale,
              height: scale,
            }}
          />
        ))
      )}
    </div>
  );
}

export default function PullToPet() {
  const [pullY, setPullY] = useState(0);
  const [petting, setPetting] = useState(false);
  const [wagPhase, setWagPhase] = useState(0);
  const [message, setMessage] = useState("try me. pull down.");
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const wagInterval = useRef<number | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      startY.current = e.clientY;
      setPetting(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!petting) return;
      const dy = Math.max(0, Math.min(80, e.clientY - startY.current));
      setPullY(dy);
      if (dy > 30 && !wagInterval.current) {
        setMessage("mmmhm. good.");
        let phase = 0;
        wagInterval.current = window.setInterval(() => {
          phase += 0.15;
          setWagPhase(phase);
        }, 60);
      }
    },
    [petting]
  );

  const handlePointerUp = useCallback(() => {
    setPetting(false);
    setPullY(0);
    if (wagInterval.current) {
      clearInterval(wagInterval.current);
      wagInterval.current = null;
    }
    setWagPhase(0);
    setTimeout(() => setMessage("try me. pull down."), 600);
  }, []);

  const tilt = Math.sin(wagPhase * Math.PI * 2) * 3;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        background: "#F4E6CE",
        borderRadius: 16,
        padding: "24px 20px 16px",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        border: "2px solid #1F1512",
        boxShadow: "4px 4px 0 #1F1512",
        maxWidth: 320,
        margin: "24px auto",
      }}
    >
      <div
        style={{
          transform: `translateY(${pullY}px)`,
          transition: petting ? "none" : "transform 420ms cubic-bezier(.2,.9,.2,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 2,
              width: 90,
              height: 8,
              background: "rgba(31,21,18,0.08)",
              borderRadius: "50%",
              filter: "blur(2px)",
            }}
          />
          <PixelDog scale={6} tilt={tilt} />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 8,
              background: "#1F1512",
              color: "#F4E6CE",
              padding: "6px 10px",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 11,
              maxWidth: 120,
              borderRadius: 2,
              lineHeight: 1.4,
              transform: "rotate(-2deg)",
            }}
          >
            {message}
            <div
              style={{
                position: "absolute",
                bottom: -5,
                left: 16,
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid #1F1512",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          fontSize: 10,
          color: "rgba(31,21,18,0.45)",
          marginTop: 8,
        }}
      >
        {petting && pullY > 30 ? "good human" : "↓ pull down to pet ↓"}
      </div>
    </div>
  );
}
