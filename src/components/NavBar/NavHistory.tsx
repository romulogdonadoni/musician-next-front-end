"use client";

import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

export default function NavHistory() {
  return (
    <div className="flex gap-2">
      <div onClick={() => window.history.back()} className="cursor-pointer">
        <FiArrowLeftCircle size={26} />
      </div>
      <div onClick={() => window.history.forward()} className="cursor-pointer">
        <FiArrowRightCircle size={26} />
      </div>
    </div>
  );
}
