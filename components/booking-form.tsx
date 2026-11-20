'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CalendarDays, Check, Clock3, MapPin, ShieldCheck } from 'lucide-react'

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

export function BookingForm() {
  const [dates, setDates] = useState(() => getNextWeekdays(new Date()))
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedTime, setSelectedTime] = useState('08:30')
  const [submitted, setSubmitted] = useState(false)

  // PENDIENTE: reemplazar por el numero real de WhatsApp (formato internacional sin +)
  const WA_NUMBER = '570000000000'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fecha = dates[selectedDate]
    const etiqueta = fecha
      ? new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }).format(fecha)
      : 'la fecha elegida'
    const mensaje =
      'Hola, quiero agendar una toma de muestras a domicilio.\n' +
      'Fecha: ' + etiqueta + '\n' +
      'Hora: ' + selectedTime + '\n' +
      'Mi nombre es: '
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(mensaje), '_blank', 'noopener')
    setSubmitted(true)
  }

  return (
    <section id="agendar" className="bg-[#f1f5f0] px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#6b9b7e]">Tu visita, a tu manera</p>
          <h2 className="mt-4 max-w-lg text-4xl font-medium leading-tight tracking-[-.045em] sm:text-5xl">Elige el momento que mejor te viene.</h2>
          <p className="mt-5 max-w-md leading-7 text-[#647a73]">Selecciona un día y horario para preparar tu solicitud de visita. Nuestro equipo confirmará la disponibilidad contigo.</p>
          <div className="mt-8 flex items-center gap-3 text-sm text-[#58716b]"><ShieldCheck className="size-5 text-[#6b9b7e]" /> Tus datos se usan solo para coordinar la visita.</div>
          <div className="mt-4 flex items-center gap-3 text-sm text-[#58716b]"><MapPin className="size-5 text-[#6b9b7e]" /> Servicio a domicilio, sujeto a cobertura.</div>
        </div>

        <form onSubmit={handleSubmit} className="min-w-0 rounded-[1.75rem] border border-[#e2e9e1] bg-white p-5 shadow-[0_24px_70px_-48px_rgba(24,61,56,.35)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div><div className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="size-4 text-[#6b9b7e]" /> Selecciona un día</div><p className="mt-1 text-xs text-[#82928c]">Desliza para explorar más fechas</p></div>
            <span className="rounded-full bg-[#edf4ee] px-3 py-1.5 text-xs font-medium text-[#54836c]">Paso 1 de 2</span>
          </div>
          <div
            aria-label="Fechas disponibles para elegir"
            className="mt-5 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2"
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
              <button key={date.toISOString()} type="button" aria-pressed={selectedDate === index} onClick={() => setSelectedDate(index)} className={`min-w-[4.65rem] snap-start rounded-xl border px-2 py-3 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b9b7e] ${selectedDate === index ? 'border-[#367b66] bg-[#eaf3ec] text-[#183d38]' : 'border-[#e8ece7] bg-white text-[#71837d] hover:border-[#a9c8b2]'}`}>
                <span className="block text-[11px] font-medium uppercase">{weekdays.format(date).replace('.', '')}</span><span className="mt-1 block text-sm font-semibold">{monthDay.format(date).replace('.', '')}</span>
              </button>
            ))}
          </div>
          <div className="mt-7 flex items-center gap-2 text-sm font-semibold"><Clock3 className="size-4 text-[#6b9b7e]" /> Horario de visita</div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {times.map((time) => <button key={time} type="button" aria-pressed={selectedTime === time} onClick={() => setSelectedTime(time)} className={`rounded-xl border px-3 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b9b7e] ${selectedTime === time ? 'border-[#367b66] bg-[#eaf3ec] text-[#183d38]' : 'border-[#e8ece7] text-[#71837d] hover:border-[#a9c8b2]'}`}>{time}</button>)}
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#34534d]">Nombre completo<input required autoComplete="name" name="name" placeholder="¿Cómo te llamas?" className="mt-2 w-full rounded-xl border border-[#e2e9e1] bg-[#fcfdfb] px-4 py-3 text-sm outline-none transition placeholder:text-[#a2ada8] focus:border-[#6b9b7e] focus:ring-2 focus:ring-[#6b9b7e]/20" /></label>
            <label className="text-sm font-medium text-[#34534d]">Teléfono de contacto<input required autoComplete="tel" inputMode="tel" name="phone" placeholder="Tu número de teléfono" className="mt-2 w-full rounded-xl border border-[#e2e9e1] bg-[#fcfdfb] px-4 py-3 text-sm outline-none transition placeholder:text-[#a2ada8] focus:border-[#6b9b7e] focus:ring-2 focus:ring-[#6b9b7e]/20" /></label>
          </div>
          <label className="mt-4 block text-sm font-medium text-[#34534d]">Dirección de visita<input required autoComplete="street-address" name="address" placeholder="Calle, número, colonia y ciudad" className="mt-2 w-full rounded-xl border border-[#e2e9e1] bg-[#fcfdfb] px-4 py-3 text-sm outline-none transition placeholder:text-[#a2ada8] focus:border-[#6b9b7e] focus:ring-2 focus:ring-[#6b9b7e]/20" /></label>
          <button type="submit" className="mt-6 flex w-full items-center justify-center rounded-full bg-[#e78364] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#d87255] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d87255] focus-visible:ring-offset-2">Solicitar visita <ArrowRight className="ml-2 size-4" /></button>
          {submitted && <div role="status" className="mt-4 rounded-xl border border-[#d5e8da] bg-[#f1f8f2] p-4 text-sm text-[#34534d]"><div className="flex items-center gap-2 font-semibold"><Check className="size-4 text-[#54836c]" /> Solicitud preparada</div><p className="mt-1 leading-6 text-[#647a73]">Elegiste {weekdays.format(dates[selectedDate])} {monthDay.format(dates[selectedDate])} a las {selectedTime}. Esta demostración no envía ni guarda tus datos; conecta un canal de contacto para recibir solicitudes reales.</p></div>}
          <p className="mt-4 text-center text-xs leading-5 text-[#82928c]">No es una confirmación médica ni una cita confirmada. El equipo debe validar la disponibilidad.</p>
        </form>
      </div>
    </section>
  )
}
