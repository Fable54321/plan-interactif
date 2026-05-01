import { useState } from "react";
import { Rnd } from "react-rnd";

const FEET_TO_PX = 20;
const MM_PER_FOOT = 304.8;

const mmToPx = (mm: number) => {
  return (mm / MM_PER_FOOT) * FEET_TO_PX;
};

const INCHES_PER_FOOT = 12;

const inchesToPx = (inches: number) => {
  return (inches / INCHES_PER_FOOT) * FEET_TO_PX;
};

const Plan = () => {
  const verticalWidth = 12 * FEET_TO_PX;
  const verticalHeight = 30 * FEET_TO_PX;

  const bottomWidth = 22 * FEET_TO_PX;
  const bottomHeight = 15 * FEET_TO_PX;

  const totalWidth = verticalWidth + bottomWidth;
  const totalHeight = verticalHeight;

  const circleSize = 5 * FEET_TO_PX;

  

  const machineWidth = mmToPx(3543);
  const machineHeight = mmToPx(1500);

    const secondMachineWidth = inchesToPx(199);
const secondMachineHeight = inchesToPx(109);


const [secondMachine, setSecondMachine] = useState({
  x: 260,
  y: 360,
  rotated: false,
});

const currentSecondMachineWidth = secondMachine.rotated
  ? secondMachineHeight
  : secondMachineWidth;

const currentSecondMachineHeight = secondMachine.rotated
  ? secondMachineWidth
  : secondMachineHeight;

const rotateMachine = () => {
  setMachine((prev) => ({
    ...prev,
    rotated: !prev.rotated,
  }));
};

  const forbiddenZone = {
    x: 240,
    y: 0,
    width: 440,
    height: 300,
  };

  const isOverlappingForbiddenZone = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    return (
      x < forbiddenZone.x + forbiddenZone.width &&
      x + width > forbiddenZone.x &&
      y < forbiddenZone.y + forbiddenZone.height &&
      y + height > forbiddenZone.y
    );
  };

  const [circles, setCircles] = useState([
    { id: 1, x: 20, y: 20 },
    { id: 2, x: 140, y: 20 },
    { id: 3, x: 20, y: 140 },
  ]);

   const [machine, setMachine] = useState({
  x: 20,
  y: 360,
  rotated: false,
});

const currentMachineWidth = machine.rotated ? machineHeight : machineWidth;
const currentMachineHeight = machine.rotated ? machineWidth : machineHeight;

  const updateCirclePosition = (id: number, x: number, y: number) => {
    setCircles((prev) =>
      prev.map((circle) =>
        circle.id === id ? { ...circle, x, y } : circle
      )
    );
  };

  return (
    <section className="p-6">
      <div
        className="relative border border-black border-b-0 bg-neutral-100"
        style={{
          width: totalWidth,
          height: totalHeight,
        }}
      >
        {/* Divider */}
        <div
          className="absolute left-60 z-10 border-l-3 border-black bg-black"
          style={{
            width: "440px",
            height: "300px",
          }}
        ></div>

        {/* Left vertical rectangle */}
        <div
          className="absolute left-0 -top-px border-3 border-r-0 border-black bg-white"
          style={{
            width: verticalWidth,
            height: verticalHeight,
          }}
        />

        {/* Bottom rectangle */}
        <div
          className="absolute left-60 bottom-0 border-3 border-l-0 border-black bg-white"
          style={{
            width: bottomWidth,
            height: bottomHeight,
          }}
        />

        {circles.map((circle) => (
          <Rnd
            key={circle.id}
            size={{
              width: circleSize,
              height: circleSize,
            }}
            position={{
              x: circle.x,
              y: circle.y,
            }}
            bounds="parent"
            enableResizing={false}
            onDrag={(_, data) => {
              if (
                !isOverlappingForbiddenZone(
                  data.x,
                  data.y,
                  circleSize,
                  circleSize
                )
              ) {
                updateCirclePosition(circle.id, data.x, data.y);
              }
            }}
            onDragStop={(_, data) => {
              if (
                !isOverlappingForbiddenZone(
                  data.x,
                  data.y,
                  circleSize,
                  circleSize
                )
              ) {
                updateCirclePosition(circle.id, data.x, data.y);
              }
            }}
            className="z-20 flex items-center justify-center rounded-full border-2 border-black bg-lime-200 text-xs font-semibold cursor-grab active:cursor-grabbing"
          >
            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">5 pieds</span>
          </Rnd>
        ))}

       <Rnd
  size={{
    width: currentMachineWidth,
    height: currentMachineHeight,
  }}
  position={{
    x: machine.x,
    y: machine.y,
  }}
  bounds="parent"
  enableResizing={false}
  onDrag={(_, data) => {
    if (
      !isOverlappingForbiddenZone(
        data.x,
        data.y,
        currentMachineWidth,
        currentMachineHeight
      )
    ) {
      setMachine((prev) => ({ ...prev, x: data.x, y: data.y }));
    }
  }}
  onDragStop={(_, data) => {
    if (
      !isOverlappingForbiddenZone(
        data.x,
        data.y,
        currentMachineWidth,
        currentMachineHeight
      )
    ) {
      setMachine((prev) => ({ ...prev, x: data.x, y: data.y }));
    }
  }}
  className="z-20 flex items-center justify-center border-2 border-black bg-blue-200 text-xs font-semibold cursor-grab active:cursor-grabbing"
>
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      rotateMachine();
    }}
    className="absolute right-1 top-1 rounded bg-white px-1 text-[10px] border border-black"
  >
    ↻
  </button>
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">P</span>
  {machine.rotated ? "1500mm × 3543mm" : "3543mm × 1500mm"}
</Rnd>

<Rnd
  size={{
    width: currentSecondMachineWidth,
    height: currentSecondMachineHeight,
  }}
  position={{
    x: secondMachine.x,
    y: secondMachine.y,
  }}
  bounds="parent"
  enableResizing={false}
  onDrag={(_, data) => {
    if (
      !isOverlappingForbiddenZone(
        data.x,
        data.y,
        currentSecondMachineWidth,
        currentSecondMachineHeight
      )
    ) {
      setSecondMachine((prev) => ({
        ...prev,
        x: data.x,
        y: data.y,
      }));
    }
  }}
  onDragStop={(_, data) => {
    if (
      !isOverlappingForbiddenZone(
        data.x,
        data.y,
        currentSecondMachineWidth,
        currentSecondMachineHeight
      )
    ) {
      setSecondMachine((prev) => ({
        ...prev,
        x: data.x,
        y: data.y,
      }));
    }
  }}
  className="z-20 flex items-center justify-center border-2 border-black bg-orange-200 text-xs font-semibold cursor-grab active:cursor-grabbing"
>
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      setSecondMachine((prev) => ({
        ...prev,
        rotated: !prev.rotated,
      }));
    }}
    className="absolute right-1 top-1 rounded border border-black bg-white px-1 text-[10px]"
  >
    ↻
  </button>
<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">E</span>
  {secondMachine.rotated
    ? "109po × 199po"
    : "199po × 109po"}
</Rnd>

        {/* 🧭 MEASURE LABELS */}

        <span className="absolute -left-25 top-1/2 -translate-y-1/2 text-xs">
          30 pieds ({verticalHeight}px)
        </span>

        <span
          className="absolute -top-5 left-50 -translate-x-1/2 text-xs"
          style={{ width: verticalWidth }}
        >
          12 pieds ({verticalWidth}px)
        </span>

        <span className="absolute left-65 bottom-110 translate-y-1/2 text-xs">
          15 pieds ({bottomHeight}px)
        </span>

        <span className="absolute -right-25 bottom-50 translate-y-1/2 text-xs">
          15 pieds ({bottomHeight}px)
        </span>

        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold">
          34 pieds ({totalWidth}px)
        </span>
      </div>
    </section>
  );
};

export default Plan;