"use client";

import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

export default function NavHistory() {
  return (
    <div className="flex gap-2 p-2">
      <div onClick={() => window.history.back()} className="cursor-pointer">
        <BiChevronLeftCircle size={26} />
      </div>
      <div onClick={() => window.history.forward()} className="cursor-pointer">
        <BiChevronRightCircle size={26} />
      </div>
    </div>
  );
}
