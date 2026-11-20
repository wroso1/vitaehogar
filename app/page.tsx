import { ArrowRight, Clock3, Droplet, HeartPulse, MapPin, ShieldCheck, Sparkles, Star, Syringe, UserRound } from 'lucide-react'
import { BookingForm } from '@/components/booking-form'
import { ScrollExperience } from '@/components/scroll-experience'
import { HorizontalSteps } from '@/components/horizontal-steps'

const steps = [
  { number: '01', title: 'Elige tu horario', text: 'Cuéntanos dónde estás y cuándo te viene mejor.' },
  { number: '02', title: 'Te visitamos', text: 'Un profesional llega a tu casa, puntual y preparado.' },
  { number: '03', title: 'Recibe tus resultados', text: 'Te los enviamos de forma segura, apenas estén listos.' },
]

const benefits = [
  { icon: UserRound, title: 'Profesionales que cuidan', text: 'Personal de salud capacitado, con un trato cercano y respetuoso.' },
  { icon: ShieldCheck, title: 'Tu seguridad, primero', text: 'Material estéril y protocolos de calidad en cada visita.' },
  { icon: Clock3, title: 'A tu ritmo', text: 'Agenda en el horario que mejor se adapta a tu día.' },
]

export default function Page() {
  return (
    <main className="health-page relative isolate min-h-screen bg-[#faf9f6] text-[#183d38]">
      <div className="scroll-progress-track" aria-hidden="true"><span id="scroll-progress" /></div>
      <ScrollExperience />
      <div className="health-background pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="health-orb health-orb-one" />
        <div className="health-orb health-orb-two" />
        <svg className="health-trace absolute left-0 top-28 h-[600px] w-full" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
          <path className="health-pulse-line" d="M-80 250H280l50 0 30-72 42 145 54-210 55 137h145l42-58 35 112 40-186 56 132h160l39-60 42 123 45-208 50 145h310" />
          <path className="health-pulse-line health-pulse-line-secondary" d="M-60 420H420l48-44 38 88 42-132 45 88h220l38-40 35 80 42-142 44 102h310l42-50 34 94 38-132 46 94h220" />
          <circle className="health-node health-node-one" cx="410" cy="323" r="6" />
          <circle className="health-node health-node-two" cx="1017" cy="454" r="6" />
        </svg>
        <span className="health-cross health-cross-one" />
        <span className="health-cross health-cross-two" />
      </div>
      <div className="bg-[#183d38] px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        Atención a domicilio, con el cuidado que mereces <span className="mx-2 text-[#b8d9c8]">·</span> Lun–Sáb, 7:00–17:00
      </div>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label="Vitae Hogar, inicio">
          <span className="grid size-10 place-items-center rounded-full bg-[#dcebe2]"><Droplet className="size-5 fill-[#367b66] text-[#367b66]" /></span>
          <span className="text-xl font-semibold tracking-tight">Vitae <span className="text-[#71a98d]">Hogar</span></span>
        </a>
        <nav className="hidden items-center gap-9 text-sm font-medium text-[#58716b] md:flex" aria-label="Navegación principal">
          <a className="transition hover:text-[#183d38]" href="#servicio">El servicio</a>
          <a className="transition hover:text-[#183d38]" href="#proceso">Cómo funciona</a>
          <a className="transition hover:text-[#183d38]" href="#nosotros">Por qué Vitae Hogar</a>
        </nav>
        <a href="#agendar" className="rounded-full bg-[#e78364] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d87255]">Agenda tu visita <ArrowRight className="ml-2 inline size-4" /></a>
      </header>

      <section id="inicio" className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-8 sm:px-8 md:grid-cols-[1.04fr_.96fr] md:gap-14 md:pb-28 md:pt-12">
        <div className="max-w-xl" data-hero-copy>
          <div className="hero-rise mb-6 inline-flex items-center gap-2 rounded-full border border-[#d7e5dc] bg-white/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[.14em] text-[#54836c]"><Sparkles className="size-3.5" /> Salud, en la comodidad de tu hogar</div>
          <h1 className="hero-title text-[clamp(3.2rem,7vw,5.7rem)] font-medium leading-[.99] tracking-[-.065em]"><span className="word"><span>Un</span></span> <span className="word"><span>cuidado</span></span><br /><span className="word"><span>que</span></span> <span className="word"><span>llega</span></span>{` `}<span className="word"><span className="font-serif italic text-[#6b9b7e]">a ti.</span></span></h1>
          <p className="hero-rise hero-d2 mt-7 max-w-md text-lg leading-8 text-[#647a73]">Toma de muestras de sangre a domicilio, con profesionales que te hacen sentir en buenas manos.</p>
          <div className="hero-rise hero-d3 mt-8 flex flex-wrap items-center gap-4">
            <a href="#agendar" className="rounded-full bg-[#e78364] px-7 py-4 text-sm font-semibold text-white shadow-[0_9px_24px_-12px_#d87255] transition hover:-translate-y-0.5 hover:bg-[#d87255]">Quiero agendar <ArrowRight className="ml-2 inline size-4" /></a>
            <span className="flex items-center gap-2 text-sm text-[#71837d]"><MapPin className="size-4 text-[#6b9b7e]" /> Vamos hasta tu puerta</span>
          </div>
          <div className="hero-rise hero-d4 mt-10 flex items-center gap-3 border-t border-[#e8e8e1] pt-6">
            <div className="flex -space-x-2" aria-hidden="true"><span className="grid size-9 place-items-center rounded-full border-2 border-[#faf9f6] bg-[#efcfbb] text-xs font-semibold text-[#785e4d]">M</span><span className="grid size-9 place-items-center rounded-full border-2 border-[#faf9f6] bg-[#c6d9cc] text-xs font-semibold text-[#426653]">A</span><span className="grid size-9 place-items-center rounded-full border-2 border-[#faf9f6] bg-[#e6c9a5] text-xs font-semibold text-[#755536]">L</span></div>
            <div><div className="flex items-center gap-1 text-[#d69b48]" aria-label="5 de 5 estrellas"><Star className="size-3.5 fill-current" /><Star className="size-3.5 fill-current" /><Star className="size-3.5 fill-current" /><Star className="size-3.5 fill-current" /><Star className="size-3.5 fill-current" /></div><p className="mt-0.5 text-xs text-[#71837d]">Cuidado cercano, de principio a fin</p></div>
          </div>
          <svg className="ecg-hero" viewBox="0 0 320 46" fill="none" aria-hidden="true">
            <path d="M0 30h38l6-12 7 22 8-34 9 44 8-22 6 4h42l7-10 7 18 8-26 8 30 8-12h44l7-8 8 16 8-22 8 26 7-12h44" />
          </svg>
        </div>
        <div className="hero-rise hero-d2 relative mx-auto w-full max-w-[560px]"><div className="relative w-full" data-hero-media data-parallax="-0.07" data-parallax-limit="60">
          <div className="absolute -left-5 top-12 size-24 rounded-full bg-[#e9d9c4]/70 blur-2xl" data-parallax="0.16" data-parallax-limit="120" />
          <div className="absolute -right-3 bottom-10 size-28 rounded-full bg-[#d8e8dc] blur-2xl" data-parallax="0.26" data-parallax-limit="160" />
          <div className="hero-media-reveal relative overflow-hidden rounded-[2rem] bg-[#e9eee7]">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/vitalia-home-visit.png`} alt="Profesional de salud atendiendo a una paciente" className="h-[430px] w-full object-cover object-center sm:h-[550px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#183d38]/45 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-lg backdrop-blur sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
              <div className="flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e1eee5] text-[#478064]"><HeartPulse className="size-5" /></span><div className="min-w-0 flex-1"><p className="font-semibold">Una visita pensada para ti</p><p className="mt-1 text-xs text-[#71837d] sm:text-sm">Sin traslados, sin salas de espera.</p></div><span className="hidden rounded-full bg-[#edf4ee] px-3 py-1.5 text-xs font-semibold text-[#54836c] sm:inline">En casa</span></div>
            </div>
          </div>
          <div className="absolute -right-3 top-8 hidden items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium shadow-lg sm:flex"><span className="size-2 rounded-full bg-[#77a982]" /> Agenda flexible</div>
          </div>
        </div>
      </section>

        <div className="scroll-cue-wrap" data-scroll-cue>
          <span className="scroll-cue">Desliza<span className="scroll-cue-line" /></span>
        </div>

      <section id="servicio" className="border-y border-[#e7e9e2] bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:px-8 md:grid-cols-3 md:gap-12 md:py-11">
          <div className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf4ee] text-[#54836c]"><Syringe className="size-5" /></span><div><h2 className="font-semibold">Toma de muestras</h2><p className="mt-1 text-sm text-[#71837d]">En casa y con cuidado</p></div></div>
          <div className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f7eee5] text-[#bd795a]"><Clock3 className="size-5" /></span><div><h2 className="font-semibold">A tu horario</h2><p className="mt-1 text-sm text-[#71837d]">Tú eliges cuándo</p></div></div>
          <div className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf4ee] text-[#54836c]"><ShieldCheck className="size-5" /></span><div><h2 className="font-semibold">Atención segura</h2><p className="mt-1 text-sm text-[#71837d]">Personal calificado</p></div></div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div className="marquee-group" key={dup}>
              {['Toma de muestras de sangre', 'Enfermera profesional', 'Resultados en 24-48 h', 'Insumos estériles', 'Medellín y área metropolitana', 'Agenda el mismo día'].map((item) => (
                <span className="marquee-item" key={dup + item}>
                  {item}
                  <span className="marquee-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="proceso">
        <HorizontalSteps steps={steps} />
      </section>

      <section id="nosotros" className="bg-[#eaf1e9]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[.9fr_1.1fr] md:items-center md:py-24">
          <div data-reveal><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#6b9b7e]">Cuidado con intención</p><h2 className="mt-4 max-w-md text-4xl font-medium leading-tight tracking-[-.045em] sm:text-5xl">La tranquilidad también es parte del cuidado.</h2><p className="mt-5 max-w-md leading-7 text-[#647a73]">Sabemos que cada persona y cada día son distintos. Por eso llevamos un servicio atento, discreto y profesional hasta donde estés.</p><a href="#agendar" className="mt-7 inline-flex items-center font-semibold text-[#367b66] hover:text-[#183d38]">Conoce el servicio <ArrowRight className="ml-2 size-4" /></a></div>
          <div className="grid gap-4" data-reveal>{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 rounded-2xl bg-white/80 p-5 sm:p-6"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#eaf1e9] text-[#54836c]"><Icon className="size-5" /></span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#71837d]">{text}</p></div></div>)}</div>
        </div>
      </section>

      <BookingForm />
      <footer className="border-t border-[#e7e9e2]"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm text-[#71837d] sm:flex-row sm:items-center sm:justify-between sm:px-8"><a href="#inicio" className="font-semibold tracking-tight text-[#183d38]">Vitae <span className="text-[#71a98d]">Hogar</span></a><p>Tu salud, con la calidez de estar en casa.</p><p>© {new Date().getFullYear()} Vitae Hogar. Enfermería profesional a domicilio.</p></div></footer>
    </main>
  )
}
