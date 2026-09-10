"use client"

import { notFound } from "next/navigation"
import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { trips } from "@/lib/trips-data"
import { Map, MapMarker, MarkerContent } from "@/components/ui/map"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  MapPin,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Phone,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react"

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00")
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })
}

function getDifficultyLabel(difficulty: string) {
  switch (difficulty) {
    case "beginner": return "Principiante"
    case "intermediate": return "Intermedio"
    case "advanced": return "Avanzado"
    default: return "Todos los niveles"
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "beginner": return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
    case "intermediate": return "bg-amber-500/15 text-amber-700 dark:text-amber-400"
    case "advanced": return "bg-red-500/15 text-red-600 dark:text-red-400"
    default: return "bg-muted text-muted-foreground"
  }
}

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const trip = trips.find((t) => t.id === Number(id))
  if (!trip) notFound()

  const [activeDay, setActiveDay] = useState(0)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const whatsappMsg = encodeURIComponent(
    `Hola Abismo! Me interesa el viaje "${trip.title}" (${formatDate(trip.availableDates[0])}). ¿Hay lugares disponibles?`
  )
  const whatsappUrl = `https://wa.me/${trip.whatsappNumber ?? "5215548481746"}?text=${whatsappMsg}`

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/Abismo.png" alt="Abismo" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif text-xl tracking-tight">Abismo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-light text-muted-foreground">
            <Link href="/#expediciones" className="hover:text-foreground transition-colors">Expediciones</Link>
            <Link href="/#nosotros" className="hover:text-foreground transition-colors">Nosotros</Link>
            <Link href="/#contacto" className="hover:text-foreground transition-colors">Contacto</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src={trip.heroImage || trip.image}
            alt={trip.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          {/* breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-foreground/70 text-xs uppercase tracking-widest mb-6 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Todas las expediciones
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 ${getDifficultyColor(trip.difficulty)}`}>
                  {getDifficultyLabel(trip.difficulty)}
                </span>
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-primary-foreground/15 text-primary-foreground backdrop-blur-sm">
                  {trip.duration}
                </span>
              </div>
              <h1 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] leading-tight text-primary-foreground mb-3">
                {trip.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/75 text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {trip.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(trip.availableDates[0])}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  Máx. {trip.maxParticipants} personas
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
              </div>
            </div>

            {/* precio + CTA hero */}
            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-primary-foreground/60 mb-0.5">Desde</p>
                <p className="font-serif text-4xl text-primary-foreground">${trip.price.toLocaleString("es-MX")}</p>
                <p className="text-xs text-primary-foreground/60 mt-0.5">MXN por persona</p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-foreground text-foreground px-7 py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                Reservar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      {trip.galleryImages && trip.galleryImages.length > 1 && (
        <section className="py-10 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-3 gap-3 h-56">
              {trip.galleryImages.map((img, i) => (
                <div key={i} className="relative overflow-hidden">
                  <Image
                    src={img}
                    alt={`${trip.title} ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* COLUMNA IZQUIERDA */}
          <div className="space-y-14">

            {/* HIGHLIGHTS */}
            {trip.highlights && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Lo que te espera</p>
                <h2 className="font-serif text-3xl mb-6">Experiencias únicas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trip.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 border border-border">
                      <div className="h-1.5 w-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                      <p className="text-sm font-light leading-relaxed">{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ITINERARIO */}
            {trip.itinerary && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Día a día</p>
                <h2 className="font-serif text-3xl mb-6">Itinerario</h2>
                <div className="space-y-2">
                  {trip.itinerary.map((day, i) => (
                    <div key={i} className="border border-border overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                        onClick={() => setActiveDay(activeDay === i ? -1 : i)}
                      >
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{day.day}</p>
                          <p className="font-serif text-lg">{day.title}</p>
                        </div>
                        {activeDay === i ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {activeDay === i && (
                        <div className="px-5 pb-5 border-t border-border bg-muted/20">
                          <ul className="space-y-2 mt-4">
                            {day.activities.map((act, j) => (
                              <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground font-light">
                                <span className="text-foreground/40 mt-0.5">—</span>
                                {act}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INCLUYE / NO INCLUYE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {trip.includes && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Qué incluye</p>
                  <ul className="space-y-2.5">
                    {trip.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm font-light">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {trip.excludes && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Qué NO incluye</p>
                  <ul className="space-y-2.5">
                    {trip.excludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm font-light text-muted-foreground">
                        <XCircle className="h-4 w-4 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* MAPA */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Ubicación</p>
              <h2 className="font-serif text-3xl mb-6">{trip.location}</h2>
              {trip.meetingPoint && (
                <p className="text-sm text-muted-foreground font-light mb-4 flex items-start gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  Punto de encuentro: {trip.meetingPoint}
                </p>
              )}
              <div className="h-72 border border-border overflow-hidden">
                <Map
                  viewport={{ center: trip.coordinates, zoom: 9, pitch: 30 }}
                  interactive={true}
                  className="w-full h-full"
                >
                  <MapMarker longitude={trip.coordinates[0]} latitude={trip.coordinates[1]}>
                    <MarkerContent />
                  </MapMarker>
                </Map>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA — sticky sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24">

            {/* CARD DE RESERVA */}
            <div className="border border-border p-7 space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Precio por persona</p>
                <p className="font-serif text-4xl">${trip.price.toLocaleString("es-MX")}</p>
                <p className="text-xs text-muted-foreground mt-0.5">MXN</p>
              </div>

              {/* fechas */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Fechas disponibles</p>
                {trip.availableDates.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-sm font-light">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {formatDate(d)}
                  </div>
                ))}
              </div>

              {/* deadline */}
              <div className="bg-muted/60 px-4 py-3 text-xs font-light leading-relaxed">
                <span className="font-medium">Reserva antes del</span>{" "}
                {formatDate(trip.bookingDeadline)}
                <br />
                <span className="text-muted-foreground">Plazas limitadas · cierra 30 días antes</span>
              </div>

              {/* CTA principal */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-foreground text-background py-4 text-xs uppercase tracking-widest font-medium hover:bg-foreground/85 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                Reservar por WhatsApp
              </a>

              {/* CTA secundario */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-border py-3.5 text-xs uppercase tracking-widest font-light text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                Consultar disponibilidad
              </a>

              {/* detalles rápidos */}
              <div className="space-y-2.5 pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Nivel</span>
                  <span className="font-medium">{getDifficultyLabel(trip.difficulty)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Duración</span>
                  <span className="font-medium">{trip.availableDates.length} días</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Participantes</span>
                  <span className="font-medium">Máx. {trip.maxParticipants}</span>
                </div>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="border border-border p-6 bg-muted/30">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">No te pierdas nada</p>
              <h3 className="font-serif text-xl mb-2 leading-tight">Recibe los viajes antes que nadie</h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4">
                Suscríbete y entérate cuando abramos reservas para nuevas expediciones.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  ¡Gracias! Te avisamos pronto.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-border bg-background px-3 py-2.5 text-sm font-light placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                  <button
                    type="submit"
                    className="w-full border border-foreground px-4 py-2.5 text-[10px] uppercase tracking-widest font-medium hover:bg-foreground hover:text-background transition-colors"
                  >
                    Suscribirme
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* CTA BANNER FINAL */}
      <section className="py-16 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-background/50 mb-2">¿Listo para sumergirte?</p>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                Quedan pocas plazas.<br />
                <em className="not-italic text-background/70">No esperes más.</em>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-background/90 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                Reservar ahora
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-background/30 text-background px-8 py-4 text-xs uppercase tracking-widest font-light hover:bg-background/10 transition-colors"
              >
                Ver más expediciones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-foreground py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src="/Abismo.png" alt="Abismo" width={28} height={28} className="h-7 w-7 opacity-60 invert" />
              <span className="font-serif text-lg text-background/70">Abismo</span>
            </div>
            <p className="text-xs text-background/40 font-light">© 2026 Abismo · Pablo Ezeta</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
