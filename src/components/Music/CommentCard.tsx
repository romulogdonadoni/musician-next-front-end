import Image from "next/image";

export default function CommentCard() {
  return (
    <div className="flex gap-2 rounded-lg border bg-neutral-900 border-silver-600 p-2">
      <Image
        src={`https://ui-avatars.com/api/?name=Anonymous&background=random&color=fff&size=64&bold=true`}
        width={64}
        height={64}
        quality={100}
        alt=""
        className="h-16 w-16 rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-sm font-bold">Veigh</p>
        <p className="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          harum possimus maiores ipsam asperiores rerum cum obcaecati magni
          labore nemo magnam tempora id velit iste perferendis, rem, delectus
          nulla error.
        </p>
        <p className="text-xs">Reply</p>
      </div>
    </div>
  );
}
