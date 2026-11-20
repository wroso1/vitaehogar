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
    <main className="relative isolate min-h-screen bg-white text-[#0a0a0a]">
      <div className="scroll-progress-track" aria-hidden="true"><span id="scroll-progress" /></div>
      <ScrollExperience />
      <div className="mono-strip">Atención a domicilio en Medellín <span>·</span> Lun–Sáb · 07:00–17:00</div>
      <header className="mono-nav">
        <a href="#inicio" className="mono-brand" aria-label="Vitae Hogar, inicio">VITAE</a>
        <nav className="mono-links" aria-label="Navegación principal">
          <a href="#servicio">Servicio</a>
          <a href="#proceso">Proceso</a>
          <a href="#nosotros">Nosotros</a>
        </nav>
        <a href="#agendar" className="mono-cta-pill">Agendar</a>
      </header>

      <section id="inicio" className="mono-hero">
        <h1 className="mono-word" aria-label="Vitae Hogar">
          <span aria-hidden="true">VITAE</span>
        </h1>

        <figure className="mono-hero-figure">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/vitalia-home-visit.png`}
            alt="Enfermera profesional tomando una muestra de sangre en una casa de Medellín"
            className="mono-hero-img"
          />
          <figcaption className="mono-hero-caption">Tu salud,<br />en tu casa.</figcaption>
          <span className="mono-hero-meta">Lun–Sáb · 07:00–17:00</span>
        </figure>

        <div className="mono-hero-foot">
          <p className="mono-kicker">Toma de muestras a domicilio · Medellín</p>
          <p className="mono-lead">
            Una enfermera profesional llega, toma la muestra y se va. Sin filas, sin salas de espera,
            sin trasladar a nadie que no pueda moverse.
          </p>
          <div className="mono-actions">
            <a href="#agendar" className="mono-cta">Agenda tu visita</a>
            <a href="#servicio" className="mono-link-underline">Ver el servicio</a>
          </div>
        </div>
      </section>

        <div className="scroll-cue-wrap" data-scroll-cue>
          <span className="scroll-cue">Desliza<span className="scroll-cue-line" /></span>
        </div>

      <section id="servicio" className="mono-section">
        <div className="mono-wrap">
          <p className="mono-kicker">El servicio</p>
          <ul className="mono-list">
            <li>
              <span className="mono-num">01</span>
              <h2>Toma de muestras</h2>
              <p>Venopunción en casa, con insumos estériles de un solo uso y protocolo completo de bioseguridad.</p>
            </li>
            <li>
              <span className="mono-num">02</span>
              <h2>A tu horario</h2>
              <p>Eliges el día y la franja horaria. Confirmamos disponibilidad por WhatsApp el mismo día.</p>
            </li>
            <li>
              <span className="mono-num">03</span>
              <h2>Atención segura</h2>
              <p>Enfermera profesional con tarjeta y registro ReTHUS vigente. Resultados en 24 a 48 horas.</p>
            </li>
          </ul>
        </div>
      </section>

      <div className="marquee mono-marquee" aria-hidden="true">
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

      <section id="nosotros" className="mono-section mono-section-ink">
        <div className="mono-wrap mono-two">
          <div>
            <p className="mono-kicker mono-kicker-light">Cuidado con intención</p>
            <h2 className="mono-h2">La tranquilidad también es parte del cuidado.</h2>
            <p className="mono-body mono-body-light">
              Sabemos que cada persona y cada día son distintos. Por eso llevamos un servicio atento,
              discreto y profesional hasta donde estés.
            </p>
            <a href="#agendar" className="mono-link-underline">Conoce el servicio</a>
          </div>
          <ul className="mono-benefits">
            {benefits.map(({ title, text }) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookingForm />
      <footer className="mono-footer">
        <div className="mono-wrap mono-foot-row">
          <span className="mono-brand mono-brand-light">VITAE</span>
          <p>Tu salud, con la calidez de estar en casa.</p>
          <p>© {new Date().getFullYear()} Vitae Hogar</p>
        </div>
      </footer>
    </main>
  )
}
