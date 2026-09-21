"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck, Zap, RefreshCw } from "lucide-react";

type PaymentState = "CREATED" | "AUTHORIZED" | "CAPTURED" | "REFUNDED" | "VOIDED";

export default function IdempotencyEngine() {
  const [currentState, setCurrentState] = useState<PaymentState>("CREATED");
  const [isLocked, setIsLocked] = useState(false);
  const [log, setLog] = useState<string[]>([
    "ENGINE INITIALIZED: Payment id_pay_904a created.",
  ]);
  const [raceTriggered, setRaceTriggered] = useState(false);

  const addLog = (msg: string) => {
    setLog((prev) => [msg, ...prev.slice(0, 4)]);
  };

  const transitionTo = (next: PaymentState) => {
    if (isLocked) return;
    setIsLocked(true);
    addLog(`TRANSACTION: SELECT FOR UPDATE ON id_pay_904a...`);

    setTimeout(() => {
      setCurrentState(next);
      setIsLocked(false);
      addLog(`STATE COMMITTED: Payment is now ${next}. Lock released.`);
    }, 400);
  };

  const simulateRaceCondition = () => {
    if (raceTriggered || isLocked) return;
    setRaceTriggered(true);
    setIsLocked(true);

    addLog("RACE EVENT: Request A & Request B arrive concurrently!");
    addLog("REQ A acquires SELECT FOR UPDATE lock on payment record.");

    setTimeout(() => {
      addLog("REQ B attempts capture: SHA-256 idempotency hash matched.");
      addLog("PostgreSQL error 23505 absorbed safely: Request B deduplicated.");
      setCurrentState("CAPTURED");
      setIsLocked(false);
      setRaceTriggered(false);
      addLog("SUCCESS: Double-capture prevented. Client B returned existing state.");
    }, 1200);
  };

  const states: PaymentState[] = ["CREATED", "AUTHORIZED", "CAPTURED", "REFUNDED"];

  return (
    <div className="w-full space-y-4 select-none">
      {/* State Pipeline Pills */}
      <div className="flex items-center justify-between gap-1 p-3 rounded bg-black/60 border border-surface-border overflow-x-auto">
        {states.map((st, i) => {
          const isCurrent = currentState === st;
          const isPast = states.indexOf(currentState) > i;

          return (
            <div key={st} className="flex items-center space-x-1.5 flex-1 min-w-[80px]">
              <div
                className={`w-full py-2 px-1 rounded text-center text-[10px] font-mono tracking-wider transition-all ${
                  isCurrent
                    ? "bg-white text-black font-bold shadow"
                    : isPast
                    ? "bg-neutral-800 text-neutral-400 border border-neutral-700"
                    : "bg-neutral-900 text-neutral-600"
                }`}
              >
                {st}
              </div>
              {i < states.length - 1 && (
                <span className="text-neutral-600 text-xs font-mono">→</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center space-x-2">
          {currentState === "CREATED" && (
            <button
              onClick={() => transitionTo("AUTHORIZED")}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
            >
              AUTHORIZE
            </button>
          )}
          {currentState === "AUTHORIZED" && (
            <button
              onClick={() => transitionTo("CAPTURED")}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
            >
              CAPTURE
            </button>
          )}
          {currentState === "CAPTURED" && (
            <button
              onClick={() => transitionTo("REFUNDED")}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
            >
              REFUND
            </button>
          )}
          {currentState === "REFUNDED" && (
            <button
              onClick={() => {
                setCurrentState("CREATED");
                addLog("RESET: New payment lifecycle initialized.");
              }}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RESTART</span>
            </button>
          )}
        </div>

        {/* Simulate Double-Tap Concurrency */}
        <button
          onClick={simulateRaceCondition}
          disabled={raceTriggered || isLocked}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 rounded transition-colors disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>SIMULATE CONCURRENT RACE (SELECT FOR UPDATE)</span>
        </button>
      </div>

      {/* Execution Transaction Log */}
      <div className="p-3 rounded bg-black/80 border border-surface-border font-mono text-[10px] space-y-1 text-neutral-300 min-h-[90px]">
        <div className="text-text-subtle border-b border-surface-border pb-1 flex justify-between">
          <span>POSTGRESQL TRANSACTION CONSOLE</span>
          <span className="flex items-center space-x-1 text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            <span>IDEMPOTENT HASH: SHA-256</span>
          </span>
        </div>
        {log.map((entry, idx) => (
          <div key={idx} className={idx === 0 ? "text-white font-semibold" : "text-neutral-500"}>
            &gt; {entry}
          </div>
        ))}
      </div>
    </div>
  );
}
