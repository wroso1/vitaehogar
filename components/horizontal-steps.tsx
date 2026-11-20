'use client'

import { useEffect, useRef } from 'react'

type Step = { number: string; title: string; text: string }

export function HorizontalSteps({ steps }: { steps: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const update = () => {
      frame = 0
      const rect = wrap.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      const progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0
      const travel = Math.max(0, track.scrollWidth - window.innerWidth)
      track.style.transform = `translate3d(${(-progress * travel).toFixed(1)}px, 0, 0)`
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(3)})`
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    if (reduce) {
      track.style.transform = 'none'
      return
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={wrapRef} className="pin-wrap">
      <div className="pin-stage">
        <div className="pin-head">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a8c3ad]">Así de sencillo</p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-.04em] text-white sm:text-4xl md:text-5xl">
            Tu bienestar, sin complicaciones.
          </h2>
        </div>

        <div ref={trackRef} className="pin-track">
          {steps.map((step) => (
            <article key={step.number} className="pin-card">
              <p className="font-serif text-6xl italic text-[#9dc0a6]">{step.number}</p>
              <h3 className="mt-5 text-2xl font-semibold text-[#f3f7f1]">{step.title}</h3>
              <p className="mt-3 max-w-sm leading-7 text-[#c2d6c6]">{step.text}</p>
            </article>
          ))}
          <article className="pin-card pin-card-cta">
            <p className="font-serif text-3xl italic text-[#f0c3ad]">¿Listo?</p>
            <h3 className="mt-4 text-2xl font-semibold text-[#f3f7f1]">Agenda tu visita hoy.</h3>
            <a href="#agendar" className="mt-6 inline-flex rounded-full bg-[#e78364] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d87255]">
              Elegir horario
            </a>
          </article>
        </div>

        <span className="pin-progress" aria-hidden="true">
          <span ref={barRef} />
        </span>
      </div>
    </div>
  )
}
