import React from 'react';

interface InputPatternProps {
  text: string;
  borderRadius: string;
  icon?: React.ReactElement | null;
  iconLeft?: boolean;
  iconRight?: boolean;
}

export default function ButtonPattern({ text, borderRadius, icon, iconLeft, iconRight }: InputPatternProps) {
  return (
    <div
      className={`flex gap-1 ${borderRadius} border-silver-600 bg-neutral-800 border p-2 items-center justify-center cursor-pointer`}>
      {iconLeft && icon }
      <button className="bg-transparent border-none outline-none">{text}</button>
      {iconRight && icon }
    </div>
  );
}
