import React from "react";

const Loader = () => {
  return (
    <div className="animate-pulse h-32 w-full my-4 py-4 px-12 space-y-4">
      <section className="space-y-2">
        <div className="h-2 w-full backdrop-blur-sm bg-white/30 rounded-xl"></div>
        <div className="grid grid-cols-3 gap-4 ">
          <div className="h-2 backdrop-blur-sm bg-white/30 rounded-xl col-span-2"></div>
          <div className="h-2 backdrop-blur-sm bg-white/30 rounded-xl col-span-1"></div>
        </div>
        <div className="h-2 w-full backdrop-blur-sm bg-white/30 rounded-xl"></div>
      </section>
      <section className="space-y-2">
        <div className="h-2 w-full backdrop-blur-sm bg-white/30 rounded-xl"></div>
        <div className="grid grid-cols-3 gap-4 ">
          <div className="h-2 backdrop-blur-sm bg-white/30 rounded-xl col-span-2"></div>
          <div className="h-2 backdrop-blur-sm bg-white/30 rounded-xl col-span-1"></div>
        </div>
        <div className="h-2 w-full backdrop-blur-sm bg-white/30 rounded-xl"></div>
      </section>
    </div>
  );
};

export default Loader;
