import ButtonPattern from '@/components/Patterns/ButtonPattern';
import InputPattern from '@/components/Patterns/InputPattern';
import { PiTextAaBold } from 'react-icons/pi';

export default function CreateAlbum() {
  return (
    <div>
      <form action="" className="flex gap-2">
        <div className="flex">
          <label htmlFor="image" className="w-64 h-64 bg-neutral-800 border border-silver-600 rounded-lg" />
          <input type="file" name="" id="image" className="hidden" />
        </div>
        <div className="flex flex-col gap-2">
          <InputPattern iconLeft={<PiTextAaBold size={26} />} borderRadius="rounded-lg" type="text" placeHolder="Nome" />
          <InputPattern iconLeft={<PiTextAaBold size={26} />} borderRadius="rounded-lg" type="text" placeHolder="Nome" />
          <InputPattern iconLeft={<PiTextAaBold size={26} />} borderRadius="rounded-lg" type="date" placeHolder="Nome" />
          <InputPattern iconLeft={<PiTextAaBold size={26} />} borderRadius="rounded-lg" type="text" placeHolder="Nome" />
          <ButtonPattern borderRadius="rounded-lg" text="Criar" />
        </div>
      </form>
    </div>
  );
}
