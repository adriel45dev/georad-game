import Card from "./components/Card";
import Search from "./components/Search";
import FORMAS from "./shared/data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:px-24 py-4 bg-slate-900">
      <div className="text-xs text-white py-4 min-w-full">
        <Search />
      </div>
      <section className="grid md:grid-cols-4 flex-wrap w-full gap-4 min-w-max grid-cols-1">
        {Object.keys(FORMAS).map((key, i) => {
          const { title, name, type } = FORMAS[key];
          return <Card key={i} title={title} name={name} type={type} />;
        })}
      </section>
    </main>
  );
}
