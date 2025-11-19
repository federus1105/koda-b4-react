import { GlassWater, TrendingUp } from "lucide-react";
import React from "react";

function StatusOn() {
  return (
    <>
      <section className="bg-green-500 w-full rounded-lg">
        <div className="px-10 py-5 flex flex-col gap-4">
          {/* --- HEADER --- */}
          <div className="flex items-center gap-2">
            <div className="bg-white w-11 h-11 rounded-full flex justify-center items-center flex-row">
              <GlassWater />
            </div>
            <div>
              <p className="text-white font-medium">Order On progress</p>
            </div>
          </div>
          {/* --- DATA --- */}
          <div className="flex text-white font-medium gap-5 items-center">
            <h1 className="text-2xl">200</h1>
            <p className="flex gap-2">
              +11.01 <TrendingUp />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default StatusOn;
