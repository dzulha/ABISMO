"use client"

import { useState, useMemo } from "react"
import { Waves, Fish, MapPin, Calendar, Phone, Mail, GraduationCap, Anchor } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Map as MapGL, MapMarker, MarkerContent } from "@/components/ui/map"
import Image from "next/image"
import Link from "next/link"
import { trips, type Trip } from "@/lib/trips-data"

type Destination = {
  location: string
  image: string
  coordinates: [number, number]
  entries: Trip[]
  hasCoursas: boolean
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00")
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })
}

function groupByDestination(items: Trip[]): Destination[] {
  const map = new Map<string, Destination>()
  for (const trip of items) {
    if (!map.has(trip.location)) {
      map.set(trip.location, {
        location: trip.location,
        image: trip.image,
        coordinates: trip.coordinates,
        entries: [],
        hasCoursas: false,
      })
    }
    const dest = map.get(trip.location)!
    dest.entries.push(trip)
    if (trip.modalities?.includes("certificacion")) dest.hasCoursas = true
  }
  // sort entries within each destination by first available date
  for (const dest of map.values()) {
    dest.entries.sort((a, b) => a.availableDates[0].localeCompare(b.availableDates[0]))
  }
  return Array.from(map.values())
}

export default function AbismoHomePage() {
  const [search, setSearch] = useState("")
  const [modalityFilter, setModalityFilter] = useState<"all" | "buceo" | "certificacion">("all")
  const [hoveredDest, setHoveredDest] = useState<string | null>(null)

  const destinations = useMemo(() => {
    let filtered = trips
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.location.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q),
      )
    }
    if (modalityFilter !== "all") {
      filtered = filtered.filter((t) => t.modalities?.includes(modalityFilter))
    }
    return groupByDestination(filtered)
  }, [search, modalityFilter])

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── NAV ───────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/Abismo.png" alt="Abismo" width={32} height={32} className="h-8 w-8" />
            <span className="font-serif text-xl tracking-tight">Abismo</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-light text-muted-foreground">
            <a href="#expediciones" className="hover:text-foreground transition-colors">Expediciones</a>
            <a href="#nosotros" className="hover:text-foreground transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-foreground transition-colors">Contacto</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        {/* imagen de fondo */}
        <div className="absolute inset-0">
          <Image
            src="/Buzos%20en%20belice.webp"
            alt="Expedición de buceo"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/55" />
        </div>

        {/* titular asimétrico */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mb-6 font-light">
              Centro de Buceo — México
            </p>
            <h1 className="font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] text-primary-foreground mb-8">
              Bajamos<br />
              <em className="not-italic text-primary-foreground/70">al</em> fondo.
            </h1>
            <p className="text-primary-foreground/75 text-lg font-light max-w-md mb-10 leading-relaxed">
              En Abismo no solo obtienes un certificado — entras a una comunidad que vive el mar.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#expediciones"
                className="inline-flex items-center gap-2 bg-primary-foreground text-foreground px-7 py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                <Calendar className="h-3.5 w-3.5" />
                Ver expediciones
              </a>
              <a
                href="#nosotros"
                className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground px-7 py-3.5 text-xs uppercase tracking-widest font-light hover:bg-primary-foreground/10 transition-colors"
              >
                Nuestra historia
              </a>
            </div>
          </div>
        </div>

        {/* línea decorativa lateral */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 text-primary-foreground/40">
          <div className="h-24 w-px bg-primary-foreground/30" />
          <span className="text-[10px] tracking-[0.4em] uppercase rotate-90 translate-y-4">Scroll</span>
        </div>
      </section>

      {/* ── GALERÍA EDITORIAL ─────────────────────────────────── */}
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-6">
          {/* cabecera asimétrica */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-end mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Nuestro mundo</p>
              <h2 className="font-serif text-5xl leading-tight">El mar<br />que habitamos</h2>
            </div>
            <p className="text-muted-foreground font-light leading-relaxed max-w-lg lg:pb-1">
              Desde los arrecifes de Veracruz hasta los pelágicos de Baja California. Cada expedición es una historia diferente bajo la misma superficie.
            </p>
          </div>

          {/* mosaico irregular */}
          <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[480px]">
            <div className="col-span-5 row-span-2 relative overflow-hidden">
              <Image src="/Buzos%20de%20abismo.webp" alt="Buzos Abismo" fill sizes="40vw" className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-4 row-span-1 relative overflow-hidden">
              <Image src="/cabo%20Pulmo.webp" alt="Cabo Pulmo" fill sizes="33vw" className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-3 row-span-2 relative overflow-hidden">
              <Image src="/leon%20marino.webp" alt="León marino" fill sizes="25vw" className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-4 row-span-1 relative overflow-hidden">
              <Image src="/cabo%20pulmo%20ballena.webp" alt="Ballena Cabo Pulmo" fill sizes="33vw" className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPEDICIONES ──────────────────────────────────────── */}
      <section className="py-20" id="expediciones">
        <div className="mx-auto max-w-7xl px-6">

          {/* título de sección */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border pb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Calendario 2026 – 2027</p>
              <h2 className="font-serif text-5xl">Expediciones</h2>
            </div>
            <p className="text-muted-foreground font-light max-w-sm text-sm leading-relaxed">
              Plazas limitadas. Cada viaje cierra reservas 30 días antes de la partida.
            </p>
          </div>

          {/* filtros */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <input
              type="text"
              placeholder="Buscar destino..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-border bg-transparent px-3 py-2 text-sm font-light placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground max-w-xs"
            />
            <button
              onClick={() => setModalityFilter("all")}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${modalityFilter === "all" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
            >
              Todos
            </button>
            <button
              onClick={() => setModalityFilter("buceo")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${modalityFilter === "buceo" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
            >
              <Anchor className="h-3 w-3" />
              Buceo
            </button>
            <button
              onClick={() => setModalityFilter("certificacion")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${modalityFilter === "certificacion" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
            >
              <GraduationCap className="h-3 w-3" />
              Certificación
            </button>
          </div>

          {/* grid de tarjetas por destino */}
          {destinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {destinations.map((dest) => (
                <article
                  key={dest.location}
                  className="group bg-background flex flex-col overflow-hidden"
                  onMouseEnter={() => setHoveredDest(dest.location)}
                  onMouseLeave={() => setHoveredDest(null)}
                >
                  {/* imagen / mapa */}
                  <Link href={`/viajes/${dest.entries[0].id}`} className="relative h-56 overflow-hidden bg-muted block">
                    {hoveredDest === dest.location ? (
                      <div className="absolute inset-0 pointer-events-none animate-in fade-in">
                        <MapGL
                          viewport={{ center: dest.coordinates, zoom: 6, pitch: 45 }}
                          interactive={false}
                          className="w-full h-full"
                        >
                          <MapMarker longitude={dest.coordinates[0]} latitude={dest.coordinates[1]}>
                            <MarkerContent />
                          </MapMarker>
                        </MapGL>
                      </div>
                    ) : (
                      <Image
                        src={dest.image}
                        alt={dest.location}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />

                    {/* badges de modalidad */}
                    <div className="absolute top-3 left-3 z-10 flex gap-1.5">
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest bg-background/90 text-foreground px-2 py-1 backdrop-blur-sm font-medium">
                        <Anchor className="h-2.5 w-2.5" />
                        Buceo
                      </span>
                      {dest.hasCoursas && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest bg-foreground/90 text-background px-2 py-1 backdrop-blur-sm font-medium">
                          <GraduationCap className="h-2.5 w-2.5" />
                          Certificación
                        </span>
                      )}
                    </div>

                    {/* contador de fechas */}
                    <span className="absolute bottom-3 right-3 z-10 text-[10px] uppercase tracking-widest bg-background/85 text-foreground px-2.5 py-1 backdrop-blur-sm">
                      {dest.entries.length} {dest.entries.length === 1 ? "fecha" : "fechas"}
                    </span>
                  </Link>

                  {/* contenido */}
                  <div className="flex flex-col flex-1 p-6">

                    {/* destino + ubicación */}
                    <div className="mb-4">
                      <h3 className="font-serif text-2xl leading-tight mb-1">{dest.location}</h3>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span>{dest.entries[0].location}</span>
                      </div>
                    </div>

                    {/* fechas disponibles */}
                    <div className="mb-5">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2.5">Fechas disponibles</p>
                      <div className="space-y-1.5">
                        {dest.entries.map((trip) => (
                          <Link
                            key={trip.id}
                            href={`/viajes/${trip.id}`}
                            className="flex items-center justify-between group/date py-1.5 px-2 -mx-2 hover:bg-muted/60 transition-colors rounded-sm"
                          >
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                              <span className="text-foreground">
                                {formatDateShort(trip.availableDates[0])}
                                {trip.availableDates.length > 1 && (
                                  <span className="text-muted-foreground"> — {formatDateShort(trip.availableDates[trip.availableDates.length - 1])}</span>
                                )}
                              </span>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover/date:text-foreground transition-colors">
                              Ver →
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* precio + CTA */}
                    <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Desde</p>
                        <p className="font-serif text-2xl">${dest.entries[0].price.toLocaleString("es-MX")}</p>
                        <p className="text-[10px] text-muted-foreground">MXN por persona</p>
                      </div>
                      <Link
                        href={`/viajes/${dest.entries[0].id}`}
                        className="text-[10px] uppercase tracking-widest border border-foreground px-4 py-2.5 hover:bg-foreground hover:text-background transition-colors font-medium"
                      >
                        Ver destino
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Fish className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">No hay expediciones que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ────────────────────────────────────── */}
      <section className="py-20 bg-muted/40" id="nosotros">
        <div className="mx-auto max-w-7xl px-6">

          {/* layout asimétrico: imagen a la izquierda sobresale */}
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-0 items-stretch">

            {/* imagen */}
            <div className="relative h-[500px] lg:h-auto overflow-hidden">
              <Image
                src="/siguiente%20viaje.webp"
                alt="Buceo con mantas en Cancún"
                fill
                className="object-cover"
              />
              {/* quote encima de la imagen */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-foreground/80 to-transparent">
                <blockquote className="font-serif text-2xl text-primary-foreground italic leading-snug">
                  "Cada segundo bajo el agua cuenta."
                </blockquote>
              </div>
            </div>

            {/* texto */}
            <div className="bg-background p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Sobre Abismo</p>
              <h2 className="font-serif text-4xl lg:text-5xl mb-6 leading-tight">
                Una escuela.<br />Una comunidad.
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Nacimos de la idea de que el mar es más que un destino. Tras una pausa para reconectar con el fondo, ABISMO regresa para quienes buscan más que un certificado: buscan un equipo, una filosofía, una forma de vivir.
              </p>

              <div className="space-y-6">
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-sm font-medium mb-1 tracking-wide">Comunidad de Buzos</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Conecta con entusiastas del mar que se apoyan mutuamente dentro y fuera del agua.
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-sm font-medium mb-1 tracking-wide">Seguridad Sin Compromisos</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Formación SSI rigurosa. Tu seguridad es la base sobre la que construimos cada expedición.
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-sm font-medium mb-1 tracking-wide">Destinos Épicos</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Veracruz, Cancún, Acapulco, Los Cabos, cenotes de Yucatán. México entero es nuestro arrecife.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ──────────────────────────────────────────── */}
      <section className="py-20" id="contacto">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-b border-border pb-8 mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">¿Listo para bucear?</p>
            <h2 className="font-serif text-5xl">Contáctanos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            <div className="bg-background p-10 flex flex-col gap-3">
              <div className="text-muted-foreground mb-1">
                <Phone className="h-5 w-5" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">WhatsApp</p>
              <p className="font-serif text-xl">+52 5548 1746</p>
            </div>
            <div className="bg-background p-10 flex flex-col gap-3">
              <div className="text-muted-foreground mb-1">
                <Mail className="h-5 w-5" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</p>
              <p className="font-serif text-xl">info@abismoesbuceo</p>
            </div>
            <div className="bg-background p-10 flex flex-col gap-3">
              <div className="text-muted-foreground mb-1">
                <Waves className="h-5 w-5" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Blog</p>
              <p className="font-serif text-xl">pabloezeta.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image src="/Abismo.png" alt="Abismo" width={28} height={28} className="h-7 w-7 opacity-70" />
              <span className="font-serif text-lg text-muted-foreground">Abismo</span>
            </div>
            <div className="flex gap-6 text-xs uppercase tracking-widest text-muted-foreground">
              <a href="#expediciones" className="hover:text-foreground transition-colors">Expediciones</a>
              <a href="#nosotros" className="hover:text-foreground transition-colors">Nosotros</a>
              <a href="#contacto" className="hover:text-foreground transition-colors">Contacto</a>
            </div>
            <p className="text-xs text-muted-foreground font-light">
              © 2026 Abismo · Pablo Ezeta
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
