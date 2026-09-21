"use client";

import React, { useState } from "react";
import { Play, RotateCcw } from "lucide-react";

const ROWS = 6;
const COLS = 8;
const START = { r: 1, c: 1 };
const END = { r: 4, c: 6 };

export default function DijkstraVisualizer() {
  const [walls, setWalls] = useState<Set<string>>(
    new Set(["2-2", "2-3", "2-4", "3-4", "4-4"])
  );
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [path, setPath] = useState<Set<string>>(new Set());
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState({ visitedCount: 0, pathLength: 0 });

  const toggleWall = (r: number, c: number) => {
    if (running) return;
    if ((r === START.r && c === START.c) || (r === END.r && c === END.c)) return;

    const key = `${r}-${c}`;
    setWalls((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const runDijkstra = () => {
    if (running) return;
    setRunning(true);
    setVisited(new Set());
    setPath(new Set());

    // Simple BFS / Dijkstra with uniform edge cost = 1
    const queue: [number, number][] = [[START.r, START.c]];
    const cameFrom: Record<string, string | null> = {
      [`${START.r}-${START.c}`]: null,
    };
    const visitedOrder: string[] = [];
    let found = false;

    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      const currKey = `${currR}-${currC}`;

      if (currR === END.r && currC === END.c) {
        found = true;
        break;
      }

      const neighbors = [
        [currR - 1, currC],
        [currR + 1, currC],
        [currR, currC - 1],
        [currR, currC + 1],
      ];

      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
          const nKey = `${nr}-${nc}`;
          if (!walls.has(nKey) && !(nKey in cameFrom)) {
            cameFrom[nKey] = currKey;
            queue.push([nr, nc]);
            visitedOrder.push(nKey);
          }
        }
      }
    }

    // Animate frontier visits
    let step = 0;
    const currentVisited = new Set<string>();
    const timer = setInterval(() => {
      if (step < visitedOrder.length) {
        currentVisited.add(visitedOrder[step]);
        setVisited(new Set(currentVisited));
        step++;
      } else {
        clearInterval(timer);

        // Reconstruct path
        if (found) {
          const shortestPath: string[] = [];
          let curr: string | null = `${END.r}-${END.c}`;
          while (curr) {
            shortestPath.push(curr);
            curr = cameFrom[curr];
          }
          setPath(new Set(shortestPath));
          setStats({
            visitedCount: visitedOrder.length,
            pathLength: shortestPath.length,
          });
        }
        setRunning(false);
      }
    }, 40);
  };

  const resetGrid = () => {
    setVisited(new Set());
    setPath(new Set());
    setStats({ visitedCount: 0, pathLength: 0 });
  };

  return (
    <div className="w-full space-y-4 select-none">
      {/* Visualizer Controls */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2">
          <button
            onClick={runDijkstra}
            disabled={running}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            <Play className="w-3 h-3" />
            <span>FIND SHORTEST PATH</span>
          </button>

          <button
            onClick={resetGrid}
            disabled={running}
            className="p-1.5 text-text-muted hover:text-white border border-surface-border rounded transition-colors"
            title="Reset exploration"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-[11px] text-text-muted">
          Visited: <span className="text-white font-bold">{stats.visitedCount}</span> | Path:{" "}
          <span className="text-emerald-400 font-bold">{stats.pathLength}</span>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="grid grid-cols-8 gap-1.5 p-3 rounded bg-black/50 border border-surface-border">
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => {
            const key = `${r}-${c}`;
            const isStart = r === START.r && c === START.c;
            const isEnd = r === END.r && c === END.c;
            const isWall = walls.has(key);
            const isPath = path.has(key);
            const isVisited = visited.has(key);

            let bg = "bg-neutral-900";
            if (isWall) bg = "bg-neutral-600";
            if (isVisited) bg = "bg-neutral-800 border border-white/20";
            if (isPath) bg = "bg-white text-black font-bold shadow-md";
            if (isStart) bg = "bg-emerald-500 text-black font-bold";
            if (isEnd) bg = "bg-rose-500 text-white font-bold";

            return (
              <button
                key={key}
                onClick={() => toggleWall(r, c)}
                className={`h-9 rounded-sm flex items-center justify-center text-[10px] font-mono transition-colors ${bg}`}
                title={`Node (${r}, ${c})`}
              >
                {isStart ? "S" : isEnd ? "E" : ""}
              </button>
            );
          })
        )}
      </div>

      <div className="text-[10px] font-mono text-text-subtle text-center">
        CLICK CELLS TO TOGGLE OBSTACLE WALLS // MINHEAP O(log V) HOMAGE
      </div>
    </div>
  );
}
