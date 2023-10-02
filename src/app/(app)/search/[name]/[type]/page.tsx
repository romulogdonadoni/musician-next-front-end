"use client"

import { Artist } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

interface SearchProps {
  params: {
    name: string;
    type: string;
  };
}

export default function Search({ params }: SearchProps) {

  return (
    <div>
      <video src="blob:https://www.youtube.com/5a61eeec-2fbb-4dc3-96fa-4950e3638429"></video>
      <Image src={""} height={256} width={256} alt="" />
    </div>
  );
}
