"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface CrowdCanvasProps {
  src?: string;
  rows?: number;
  cols?: number;
  className?: string;
}

interface Peep {
  image: HTMLImageElement;
  rect: number[];
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
  setRect: (rect: number[]) => void;
  render: (ctx: CanvasRenderingContext2D, displayScale: number) => void;
}

export default function CrowdCanvas({
  src = "/images/peeps/all-peeps.png",
  rows = 15,
  cols = 7,
  className = "",
}: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMounted = true;
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const stage = {
      width: 0,
      height: 0,
    };

    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (array: unknown[]) => (randomRange(0, array.length) | 0);
    const removeFromArray = <T,>(array: T[], i: number): T => array.splice(i, 1)[0];
    const removeItemFromArray = <T,>(array: T[], item: T): T => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = <T,>(array: T[]): T => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = <T,>(array: T[]): T => array[randomIndex(array) | 0];

    const getDisplayScale = () => {
      if (stage.width < 640) return 0.65;
      if (stage.width < 1024) return 0.76;
      return 0.88;
    };

    const resetPeep = ({ stage: s, peep }: { stage: { width: number; height: number }; peep: Peep }) => {
      const displayScale = getDisplayScale();
      const scaledWidth = peep.width * displayScale;
      const scaledHeight = peep.height * displayScale;

      const direction = Math.random() > 0.5 ? 1 : -1;
      // Stagger baseline heights to create 4-5 depth layers with natural overlap
      const offsetY = 30 - 130 * gsap.parseEase("power2.in")(Math.random());
      const startY = s.height - scaledHeight + offsetY;
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -scaledWidth - randomRange(10, 60);
        endX = s.width + randomRange(10, 60);
        peep.scaleX = 1;
      } else {
        startX = s.width + scaledWidth + randomRange(10, 60);
        endX = -randomRange(10, 60);
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    const normalWalk = ({ peep, props }: { peep: Peep; props: { startX: number; startY: number; endX: number } }) => {
      const { startY, endX } = props;
      const xDuration = randomRange(9, 18);
      const yDuration = 0.24;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.7, 1.4));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: Math.round(xDuration / yDuration),
          yoyo: true,
          y: startY - 7,
          ease: "sine.inOut",
        },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (r: number[]) => {
          peep.rect = r;
          peep.width = r[2];
          peep.height = r[3];
        },
        render: (c: CanvasRenderingContext2D, displayScale: number) => {
          c.save();
          c.translate(peep.x, peep.y);
          c.scale(peep.scaleX * displayScale, displayScale);
          c.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          );
          c.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    const createPeeps = (img: HTMLImageElement) => {
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }
    };

    const addPeepToCrowd = () => {
      if (!isMounted || availablePeeps.length === 0) return null;
      const peep = removeRandomFromArray(availablePeeps);
      const walkGen = getRandomFromArray(walks);
      const walk = walkGen({
        peep,
        props: resetPeep({ peep, stage }),
      }).eventCallback("onComplete", () => {
        if (!isMounted) return;
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const initCrowd = () => {
      // Skiper39 High Density: 35 on mobile, 60 on tablet, 90 on desktop for a rich continuous crowd
      const targetCount = stage.width < 640 ? 35 : stage.width < 1024 ? 60 : 90;
      const count = Math.min(availablePeeps.length, targetCount);
      for (let i = 0; i < count; i++) {
        const added = addPeepToCrowd();
        if (added && added.walk) {
          added.walk.progress(Math.random());
        }
      }
    };

    const render = () => {
      if (!canvas || !isMounted) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayScale = getDisplayScale();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      for (let i = 0; i < crowd.length; i++) {
        crowd[i].render(ctx, displayScale);
      }

      ctx.restore();
    };

    const resize = () => {
      if (!canvas || !isMounted) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * dpr;
      canvas.height = stage.height * dpr;

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const img = new Image();
    img.onload = () => {
      if (!isMounted) return;
      createPeeps(img);
      resize();
      gsap.ticker.add(render);
    };
    img.src = src;

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
      allPeeps.length = 0;
      availablePeeps.length = 0;
      crowd.length = 0;
    };
  }, [src, rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
