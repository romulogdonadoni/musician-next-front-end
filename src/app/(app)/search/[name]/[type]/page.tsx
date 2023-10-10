"use client"

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SearchProps {
  params: {
    name: string;
    type: string;
  };
}

export default function Search({ params }: SearchProps) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/search/${params.name}/${params.type}`)
      .then((res) => {
        const bufferArray = res.data[0].imageBlob;
        const buffer = Buffer.from(bufferArray);
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        const blobUrl = URL.createObjectURL(blob);
        setImageSrc(blobUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar imagem:", error);
        setLoading(false);
      });
  }, [params.name, params.type]);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : imageSrc ? (
        <Image src={imageSrc} height={256} width={256} alt="" />
      ) : (
        <p>Imagem não encontrada</p>
      )}
    </div>
  );
}
