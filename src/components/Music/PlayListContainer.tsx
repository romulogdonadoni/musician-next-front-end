import { MdPlaylistPlay } from "react-icons/md";

type PlayList = {
  name: string;
};

export default function PlayListContainer({ name }: PlayList) {
  return (
    <div className="flex justify-between p-2 border border-silver-600 rounded-lg items-center gap-2 cursor-pointer hover:bg-black-600 ease-in-out duration-300">
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 bg-black-700 rounded-lg"></div>
        <p>{name}</p>
      </div>
      <MdPlaylistPlay size={26} />
    </div>
  );
}
