'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'

function getNextWeekdays(after: Date, count = 7) {
  const dates: Date[] = []
  const cursor = new Date(after)
  while (dates.length < count) {
    cursor.setDate(cursor.getDate() + 1)
    if (cursor.getDay() !== 0) dates.push(new Date(cursor))
  }
  return dates
}

const times = ['07:00', '08:30', '10:00', '11:30']
const weekdays = new Intl.DateTimeFormat('es', { weekday: 'short' })
const monthDay = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' })

// URL del Apps Script que escribe en la hoja de calculo (se define en el build)
const REGISTRO_URL = process.env.NEXT_PUBLIC_REGISTRO_URL || ''
// PENDIENTE: numero real de WhatsApp (formato internacional sin +)
const WA_NUMBER = '570000000000'

export function BookingForm() {
  const [dates, setDates] = useState(() => getNextWeekdays(new Date()))
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedTime, setSelectedTime] = useState('08:30')
  const [submitted, setSubmitted] = useState(false)
  const [guardado, setGuardado] = useState<'idle' | 'ok' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const fecha = dates[selectedDate]
    const etiqueta = fecha
      ? new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }).format(fecha)
      : ''

    const payload = {
      nombre: String(data.get('nombre') || ''),
      telefono: String(data.get('telefono') || ''),
      direccion: String(data.get('direccion') || ''),
      examenes: String(data.get('examenes') || ''),
      fecha: etiqueta,
      hora: selectedTime,
      acepta: data.get('acepta') === 'on',
      origen: 'web',
    }

    if (REGISTRO_URL) {
      try {
        // text/plain evita el preflight CORS que Apps Script no responde
        await fetch(REGISTRO_URL, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        })
        setGuardado('ok')
      } catch {
        setGuardado('error')
      }
    }

    const mensaje =
      'Hola, quiero agendar una toma de muestras a domicilio.\n' +
      'Nombre: ' + payload.nombre + '\n' +
      'Teléfono: ' + payload.telefono + '\n' +
      'Dirección: ' + payload.direccion + '\n' +
      'Fecha: ' + etiqueta + '\n' +
      'Hora: ' + selectedTime + '\n' +
      (payload.examenes ? 'Exámenes: ' + payload.examenes + '\n' : '')

    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(mensaje), '_blank', 'noopener')
    setSubmitted(true)
  }

  return (
    <section id="agendar" className="mono-section border-t border-[#e5e5e5]">
      <div className="mono-wrap mono-two">
        <div>
          <p className="mono-kicker">Tu visita</p>
          <h2 className="mono-h2">Elige el momento que mejor te viene.</h2>
          <p className="mono-body">
            Selecciona día y hora, deja tus datos y te confirmamos por WhatsApp. El registro queda guardado
            para coordinar la visita.
          </p>
          <ul className="mono-benefits mono-benefits-light">
            <li>
              <h3>Tus datos se usan solo para coordinar la visita.</h3>
              <p>No se comparten con terceros ni se usan para publicidad.</p>
            </li>
            <li>
              <h3>Servicio a domicilio sujeto a cobertura.</h3>
              <p>Medellín y área metropolitana.</p>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="border border-[#e5e5e5] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="mono-kicker">Paso 1 · Día</p>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#737373]">Desliza</span>
          </div>

          <div
            aria-label="Fechas disponibles para elegir"
            className="mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2"
            onScroll={(event) => {
              const strip = event.currentTarget
              if (strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 48) {
                setDates((currentDates) => [
                  ...currentDates,
                  ...getNextWeekdays(currentDates[currentDates.length - 1]),
                ])
              }
            }}
            role="region"
            tabIndex={0}
          >
            {dates.map((date, index) => (
              <button
                key={date.toISOString()}
                type="button"
                aria-pressed={selectedDate === index}
                onClick={() => setSelectedDate(index)}
                className={`min-w-[4.65rem] snap-start border px-2 py-3 text-center transition ${
                  selectedDate === index
                    ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white'
                    : 'border-[#e5e5e5] text-[#737373] hover:border-[#0a0a0a]'
                }`}
              >
                <span className="block text-[11px] font-medium uppercase">{weekdays.format(date).replace('.', '')}</span>
                <span className="mt-1 block text-sm font-semibold">{monthDay.format(date).replace('.', '')}</span>
              </button>
            ))}
          </div>

          <p className="mono-kicker mt-7">Paso 2 · Hora</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {times.map((time) => (
              <button
                key={time}
                type="button"
                aria-pressed={selectedTime === time}
                onClick={() => setSelectedTime(time)}
                className={`border px-3 py-3 text-sm font-medium transition ${
                  selectedTime === time
                    ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white'
                    : 'border-[#e5e5e5] text-[#737373] hover:border-[#0a0a0a]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          <p className="mono-kicker mt-7">Paso 3 · Tus datos</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#737373]">Nombre completo</span>
              <input
                required
                autoComplete="name"
                name="nombre"
                placeholder="¿Cómo te llamas?"
                className="mt-2 w-full border border-[#e5e5e5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#a3a3a3] focus:border-[#0a0a0a]"
              />
            </label>
            <label className="block">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#737373]">Teléfono</span>
              <input
                required
                autoComplete="tel"
                inputMode="tel"
                name="telefono"
                placeholder="Tu número de contacto"
                className="mt-2 w-full border border-[#e5e5e5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#a3a3a3] focus:border-[#0a0a0a]"
              />
            </label>
          </div>
          <label className="mt-3 block">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#737373]">Dirección de la visita</span>
            <input
              required
              autoComplete="street-address"
              name="direccion"
              placeholder="Barrio, calle, número"
              className="mt-2 w-full border border-[#e5e5e5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#a3a3a3] focus:border-[#0a0a0a]"
            />
          </label>
          <label className="mt-3 block">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#737373]">Exámenes (opcional)</span>
            <input
              name="examenes"
              placeholder="Hemograma, glucosa, perfil lipídico…"
              className="mt-2 w-full border border-[#e5e5e5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#a3a3a3] focus:border-[#0a0a0a]"
            />
          </label>

          <label className="mt-4 flex items-start gap-3 text-[0.78rem] leading-5 text-[#737373]">
            <input
              required
              type="checkbox"
              name="acepta"
              className="mt-0.5 size-4 shrink-0 border border-[#0a0a0a] accent-[#0a0a0a]"
            />
            <span>
              Autorizo el tratamiento de mis datos personales para coordinar la visita, conforme a la Ley 1581
              de 2011.
            </span>
          </label>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 bg-[#0a0a0a] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#1f1f1f]"
          >
            Enviar solicitud <ArrowRight className="size-4" />
          </button>

          {submitted && (
            <div role="status" className="mt-4 border border-[#e5e5e5] p-4 text-sm">
              <div className="flex items-center gap-2 font-semibold text-[#0a0a0a]">
                <Check className="size-4" /> Solicitud enviada
              </div>
              <p className="mt-1 leading-6 text-[#737373]">
                {weekdays.format(dates[selectedDate])} {monthDay.format(dates[selectedDate])} a las{' '}
                {selectedTime}.
                {guardado === 'ok' && ' Quedó registrada y abrimos WhatsApp para confirmar.'}
                {guardado === 'error' && ' No pudimos registrarla en el sistema, pero se abrió WhatsApp con tus datos.'}
                {guardado === 'idle' && ' Abrimos WhatsApp con tus datos para confirmar la visita.'}
              </p>
            </div>
          )}

          <p className="mt-4 text-[0.7rem] leading-5 text-[#a3a3a3]">
            No es una cita confirmada: el equipo valida la disponibilidad y te responde por WhatsApp.
          </p>
        </form>
      </div>
    </section>
  )
}
