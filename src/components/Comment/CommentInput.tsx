'use client';

import { instance } from '@/config/axiosConfig';
import { useState } from 'react';
import { getCookie } from 'cookies-next';

interface CommentInputProps {
  musicId: string;
}

export default function CommentInput({ musicId }: CommentInputProps) {
  const [comment, setComment] = useState<string>();
  const createComment = () => {
    if (!comment) {
      return;
    }

    instance.post(
      `/create/comment/${musicId}`,
      { comment: comment },
      { headers: { Authorization: `Bearer ${getCookie('auth-token')}` } }
    );
    setComment("")
  };
  return (
    <div className="flex gap-2 rounded-lg border bg-neutral-900 border-silver-600 p-2">
      <input
        type="text"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Digite seu comentário aqui..."
        className="flex flex-1 p-2 rounded-lg bg-neutral-800 outline-none border-silver-600 border"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          createComment();
        }}
        className="flex p-2 rounded-lg bg-orange hover:bg-orange-100 duration-300 ease-in-out outline-none border-silver-600 border">
        Comentar
      </button>
    </div>
  );
}
