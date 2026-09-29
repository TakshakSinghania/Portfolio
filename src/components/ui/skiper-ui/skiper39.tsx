"use client";

import React from "react";
import CrowdCanvas from "@/components/hero/CrowdCanvas";

interface Skiper39Props {
  className?: string;
}

export function Skiper39({ className = "" }: Skiper39Props) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <CrowdCanvas
        src="/images/peeps/all-peeps.png"
        rows={15}
        cols={7}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

export { CrowdCanvas };
