import Link from "next/link";

const values = [
  {
    title: "Feito para o litoral",
    description:
      "Cada peça nasce inspirada no mar, na areia e na luz do nosso verão baiano.",
  },
  {
    title: "Conforto em primeiro lugar",
    description:
      "Tecidos leves, modelagens que abraçam e caem bem em todos os corpos.",
  },
  {
    title: "Estilo que vai além da praia",
    description:
      "Peças versáteis que transitam do mar à cidade sem perder a elegância.",
  },
];

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="flex flex-col items-center text-center">
        <img src="/logo.png" alt="d'Praieira" className="h-28 w-auto" />
        <h1 className="mt-6 text-3xl font-bold text-ink md:text-4xl">
          Sobre a d'Praieira
        </h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
          Praieira · Moda Praia Casual
        </p>
      </div>

      <div className="mt-10 space-y-5 text-lg leading-8 text-ink/70">
        <p>
          A d'Praieira nasceu do amor pela praia e pela simplicidade dos dias
          de sol. Nossa missão é vestir quem vive o litoral com peças que
          unem conforto, leveza e estilo — sem complicação.
        </p>
        <p>
          De biquínis a maiôs, cangas, bolsas e acessórios, cada peça é
          pensada para acompanhar você do amanhecer na areia ao fim de tarde na
          orla. Mais que moda, um estilo de vida.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-sand-200 bg-white p-6"
          >
            <h3 className="font-bold text-ink">{v.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              {v.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6 rounded-3xl bg-ocean-100 px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-ink">
          Vem viver a d'Praieira
        </h2>
        <p className="max-w-md text-ink/60">
          Fale com a gente pelo WhatsApp ou siga nossas novidades no
          Instagram.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/5571992108098"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-500 px-8 py-3 font-semibold text-white shadow-md hover:bg-brand-600"
          >
            WhatsApp 71 99210-8098
          </a>
          <a
            href="https://instagram.com/dpraeiraoficial"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/15 bg-white px-8 py-3 font-semibold text-ink hover:bg-sand-100"
          >
            @dpraeiraoficial
          </a>
        </div>
        <Link
          href="/produtos"
          className="text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Explorar a coleção →
        </Link>
      </div>
    </div>
  );
}