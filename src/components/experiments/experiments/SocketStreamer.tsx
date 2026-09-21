"use client";

import React, { useState, useEffect } from "react";
import { Radio, Send } from "lucide-react";

export default function SocketStreamer() {
  const [latencies, setLatencies] = useState<number[]>([18, 22, 16, 25, 19, 21, 15, 23, 17, 20]);
  const [activePacket, setActivePacket] = useState(false);
  const [packetsCount, setPacketsCount] = useState(142);

  const emitPacket = () => {
    setActivePacket(true);
    const newLatency = Math.floor(Math.random() * 15) + 12; // 12-27ms

    setTimeout(() => {
      setLatencies((prev) => [...prev.slice(1), newLatency]);
      setPacketsCount((c) => c + 1);
      setActivePacket(false);
    }, newLatency * 8);
  };

  const currentLatency = latencies[latencies.length - 1];

  return (
    <div className="w-full space-y-4 select-none">
      {/* Metrics Row */}
      <div className="flex items-center justify-between p-3 rounded bg-black/60 border border-surface-border text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-white font-bold">SOCKET.IO DISPATCH</span>
          <span className="text-text-subtle">{"//"} ROOM: indiranagar-kds</span>
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <span className="text-text-subtle">RTT: </span>
            <span className="text-emerald-400 font-bold">{currentLatency}ms</span>
          </div>
          <div>
            <span className="text-text-subtle">DISPATCHED: </span>
            <span className="text-white font-bold">{packetsCount}</span>
          </div>
        </div>
      </div>

      {/* Latency Jitter Histogram */}
      <div className="h-28 p-3 rounded bg-black/40 border border-surface-border flex items-end justify-between gap-1.5">
        {latencies.map((lat, i) => {
          const heightPercent = Math.min(100, Math.max(15, (lat / 30) * 100));
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-sm transition-all duration-300 ${
                  i === latencies.length - 1
                    ? "bg-emerald-400"
                    : "bg-neutral-700 hover:bg-neutral-600"
                }`}
              />
              <span className="text-[9px] font-mono text-neutral-500">{lat}</span>
            </div>
          );
        })}
      </div>

      {/* Trigger Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={emitPacket}
          disabled={activePacket}
          className="flex items-center space-x-2 px-3.5 py-1.5 bg-white text-black font-semibold rounded text-xs font-mono hover:bg-neutral-200 transition-colors disabled:opacity-50"
        >
          <Send className="w-3 h-3" />
          <span>{activePacket ? "TRANSMITTING..." : "EMIT WEBSOCKET PACKET"}</span>
        </button>

        <span className="text-[10px] font-mono text-text-subtle">
          ROOM-SCOPED WEBSOCKET PIPELINE
        </span>
      </div>
    </div>
  );
}
