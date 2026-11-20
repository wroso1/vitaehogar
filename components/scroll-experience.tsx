'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Experiencia de scroll:
 *  - revela bloques con [data-reveal] al entrar en pantalla
 *  - mueve en paralaje los elementos con [data-parallax="0.1"]
 *  - llena la barra de progreso #scroll-progress
 */
export function ScrollExperience() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    let lenis: Lenis | null = null
    let lenisFrame = 0

    if (!reduce) {
      lenis = new Lenis({ duration: 1.2, smoothWheel: true, touchMultiplier: 1.7, wheelMultiplier: 1.05 })
      const raf = (time: number) => {
        lenis?.raf(time)
        lenisFrame = window.requestAnimationFrame(raf)
      }
      lenisFrame = window.requestAnimationFrame(raf)
    }

    if (reduce) {
      reveals.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )
    reveals.forEach((el) => io.observe(el))

    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY

      layers.forEach((el) => {
        const speed = Number(el.dataset.parallax ?? '0.12')
        const limit = Number(el.dataset.parallaxLimit ?? '140')
        const offset = Math.max(-limit, Math.min(limit, y * speed))
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      })

      const heroCopy = document.querySelector<HTMLElement>('[data-hero-copy]')
      if (heroCopy) {
        const shift = Math.min(120, y * 0.11)
        heroCopy.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`
        heroCopy.style.opacity = String(Math.max(0, 1 - y / 860))
      }

      const heroMedia = document.querySelector<HTMLElement>('[data-hero-media]')
      if (heroMedia) {
        const mediaShift = Math.min(90, y * 0.075)
        heroMedia.style.transform = `translate3d(0, ${mediaShift.toFixed(1)}px, 0) scale(${Math.min(1.05, 1 + y * 0.00012).toFixed(4)})`
      }

      const cue = document.querySelector<HTMLElement>('[data-scroll-cue]')
      if (cue) cue.style.opacity = String(Math.max(0, 1 - y / 140))

      const bar = document.getElementById('scroll-progress')
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max).toFixed(4) : 0})`
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
      if (lenisFrame) window.cancelAnimationFrame(lenisFrame)
      lenis?.destroy()
    }
  }, [])

  return null
}
