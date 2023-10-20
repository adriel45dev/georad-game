import Image from "next/image";

type CardProps = {
  title: string;
  type: string;
  name: string;
};

export default function Card({ title, type, name }: CardProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-violet-600 h-max w-full justify-center items-center">
      <div className="flex justify-center items-center w-40 h-40 flex-wrap p-2 z-10">
        <div className="rounded-full min-w-full min-h-full mt-8 border-4 bg-violet-600 bg-cover hover:scale-110 relative">
          <Image
            src={`/imgs/${name}.jpg`}
            fill
            alt={title}
            className="object-cover rounded-full p-1"
          />
        </div>
      </div>
      <div className="bg-white w-full h-40 rounded-b-2xl flex justify-center flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-600">{title}</h2>
        <span className="text-sx">{type}</span>
        <button className="bg-violet-600 text-xs py-1.5 px-4 rounded-full mt-6 text-white hover:bg-violet-400">
          Detalhes
        </button>
      </div>
    </div>
  );
}
