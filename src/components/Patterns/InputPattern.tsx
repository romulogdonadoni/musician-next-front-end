import React from 'react';

interface InputPatternProps {
  type: string;
  placeHolder: string;
  borderRadius: string;
  iconLeft?: React.ReactElement | null;
  iconRight?: React.ReactElement | null;
}

export default function InputPattern({ type, placeHolder, borderRadius, iconLeft, iconRight }: InputPatternProps) {
  return (
    <div className={`flex gap-1 ${borderRadius} border-silver-600 bg-neutral-800 border p-2`}>
      {iconLeft}
      <input type={type} placeholder={`${placeHolder}`} className="bg-transparent border-none outline-none" />
      {iconRight}
    </div>
  );
}
