"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Waves, Fish, Anchor, MapPin, Clock, Users, Star, Calendar, Phone, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Map, MapMarker, MarkerContent } from "@/components/ui/map"

const trips = [
  {
    id: 1,
    title: "Inauguración Temporada",
    type: "trip",
    difficulty: "all",
    duration: "5 semanas (Mayo)",
    price: 15000,
    location: "Veracruz",
    coordinates: [-96.1429, 19.1738] as [number, number],
    image: "/Wreck.webp",
    description: "Mayo 2026. Mes de 5 semanas. Inauguración de temporada. Únete a las primeras expediciones del año.",
    rating: 5.0,
    maxParticipants: "Variable",
    availableDates: ["2026-05-01"],
  },
  {
    id: 2,
    title: "Nocturno en Barcos Hundidos",
    type: "trip",
    difficulty: "advanced",
    duration: "5 semanas (Julio)",
    price: 18000,
    location: "Veracruz",
    coordinates: [-96.1429, 19.1738] as [number, number],
    image: "/Wreck.webp",
    description: "Julio 2026. Mes de 5 semanas. Buceo nocturno en barcos hundidos. Adrenalina y misterio.",
    rating: 4.9,
    maxParticipants: "8",
    availableDates: ["2026-07-01"],
  },
  {
    id: 3,
    title: "Buceo DSD y Formación",
    type: "course",
    difficulty: "beginner",
    duration: "Extra (Sept)",
    price: 12000,
    location: "Cancún",
    coordinates: [-86.8515, 21.1619] as [number, number],
    image: "/openWaterSSI.webp",
    description: "Septiembre 2026. Extra: Buceo DSD y formación de nuevos buzos en aguas turquesas.",
    rating: 4.8,
    maxParticipants: "6",
    availableDates: ["2026-09-01"],
  },
  {
    id: 4,
    title: "Cierre de Temporada Golfo",
    type: "trip",
    difficulty: "all",
    duration: "5 semanas (Oct)",
    price: 14000,
    location: "Veracruz",
    coordinates: [-96.1429, 19.1738] as [number, number],
    image: "/Buzos%20de%20abismo.webp",
    description: "Octubre 2026. Mes de 5 semanas. Despedimos la temporada en el Golfo de México.",
    rating: 4.9,
    maxParticipants: "10",
    availableDates: ["2026-10-01"],
  },
  {
    id: 5,
    title: "Mantas Gigantes",
    type: "trip",
    difficulty: "intermediate",
    duration: "Extra (Nov)",
    price: 20000,
    location: "Cancún",
    coordinates: [-86.8515, 21.1619] as [number, number],
    image: "/cabo%20pulmo%20ballena.webp",
    description: "Noviembre 2026. Extra: Encuentro con Mantarrayas Gigantes. Una experiencia inolvidable.",
    rating: 5.0,
    maxParticipants: "8",
    availableDates: ["2026-11-01"],
  },
  {
    id: 6,
    title: "Avistamiento de Ballenas",
    type: "trip",
    difficulty: "all",
    duration: "5 semanas (Ene)",
    price: 25000,
    location: "Acapulco",
    coordinates: [-99.8901, 16.8531] as [number, number],
    image: "/leon%20marino.webp",
    description: "Enero 2027. Mes de 5 semanas. Avistamiento de ballenas de paso en el Pacífico.",
    rating: 5.0,
    maxParticipants: "12",
    availableDates: ["2027-01-01"],
  },
  {
    id: 7,
    title: "Especial Apnea y Relajación",
    type: "course",
    difficulty: "intermediate",
    duration: "5 semanas (Abr)",
    price: 10000,
    location: "Acapulco",
    coordinates: [-99.8901, 16.8531] as [number, number],
    image: "/Amanecer%20isla.webp",
    description: "Abril 2027. Mes de 5 semanas. Especial de Apnea México y relajación.",
    rating: 4.9,
    maxParticipants: "6",
    availableDates: ["2027-04-01"],
  },
  {
    id: 8,
    title: "Expedición Profundo",
    type: "trip",
    difficulty: "advanced",
    duration: "5 semanas (Jul)",
    price: 19000,
    location: "Veracruz",
    coordinates: [-96.1429, 19.1738] as [number, number],
    image: "/Wreck.webp",
    description: "Julio 2027. Mes de 5 semanas. Expedición 'Profundo' (Filosofía Abismo).",
    rating: 5.0,
    maxParticipants: "6",
    availableDates: ["2027-07-01"],
  },
  {
    id: 9,
    title: "Tiburón Martillo",
    type: "trip",
    difficulty: "advanced",
    duration: "Extra (Sept)",
    price: 30000,
    location: "Gordon Rocks",
    coordinates: [-90.0076, -0.5847] as [number, number],
    image: "/siguiente%20viaje.webp",
    description: "Septiembre 2027. Extra: Expedición Tiburón Martillo (Nivel Avanzado).",
    rating: 5.0,
    maxParticipants: "8",
    availableDates: ["2027-09-01"],
  },
  {
    id: 10,
    title: "Técnico y Recreativo",
    type: "course",
    difficulty: "advanced",
    duration: "5 semanas (Oct)",
    price: 18000,
    location: "Acapulco",
    coordinates: [-99.8901, 16.8531] as [number, number],
    image: "/advancedSSI.webp",
    description: "Octubre 2027. Mes de 5 semanas. Buceo técnico y recreativo.",
    rating: 4.9,
    maxParticipants: "6",
    availableDates: ["2027-10-01"],
  },
  {
    id: 11,
    title: "Brindis Bajo el Agua",
    type: "trip",
    difficulty: "all",
    duration: "5 semanas (Dic)",
    price: 15000,
    location: "Acapulco",
    coordinates: [-99.8901, 16.8531] as [number, number],
    image: "/buzosenAcapulco.webp",
    description: "Diciembre 2027. Mes de 5 semanas. Brindis bajo el agua celebrando el cierre del año.",
    rating: 5.0,
    maxParticipants: "12",
    availableDates: ["2027-12-01"],
  },
  {
    id: 12,
    title: "Prep: Veracruz",
    type: "course",
    difficulty: "beginner",
    duration: "Progreso",
    price: 5000,
    location: "Online / Piscina",
    image: "/mapa_abismo.png",
    description: "Inicia curso la primera semana de Abril para el viaje de Mayo (Veracruz).",
    rating: 5.0,
    maxParticipants: "10",
    availableDates: ["2026-04-01"],
  },
  {
    id: 13,
    title: "Prep: Barcos Hundidos",
    type: "course",
    difficulty: "advanced",
    duration: "Progreso",
    price: 6000,
    location: "Online / Piscina",
    image: "/mapa_abismo.png",
    description: "Inicia curso la primera semana de Junio para el viaje de Julio (Veracruz).",
    rating: 5.0,
    maxParticipants: "8",
    availableDates: ["2026-06-01"],
  },
  {
    id: 14,
    title: "Prep: Mantas",
    type: "course",
    difficulty: "intermediate",
    duration: "Progreso",
    price: 5500,
    location: "Online / Piscina",
    image: "/mapa_abismo.png",
    description: "Inicia curso la primera semana de Octubre para el viaje de Noviembre (Mantas Cancún).",
    rating: 5.0,
    maxParticipants: "8",
    availableDates: ["2026-10-01"],
  }
]

export default function AbismoHomePage() {
  const [filteredItems, setFilteredItems] = useState(trips)
  const [filters, setFilters] = useState({
    type: "all",
    difficulty: "all",
    priceRange: "all",
    search: "",
  })

  const applyFilters = () => {
    let filtered = trips

    if (filters.type !== "all") {
      filtered = filtered.filter((item) => item.type === filters.type)
    }

    if (filters.difficulty !== "all") {
      filtered = filtered.filter((item) => item.difficulty === filters.difficulty)
    }

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filtered = filtered.filter((item) => item.price >= min && item.price <= max)
    }

    if (filters.search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.location.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
  }

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Apply filters immediately
    let filtered = trips

    if (newFilters.type !== "all") {
      filtered = filtered.filter((item) => item.type === newFilters.type)
    }

    if (newFilters.difficulty !== "all") {
      filtered = filtered.filter((item) => item.difficulty === newFilters.difficulty)
    }

    if (newFilters.priceRange !== "all") {
      const [min, max] = newFilters.priceRange.split("-").map(Number)
      filtered = filtered.filter((item) => item.price >= min && item.price <= max)
    }

    if (newFilters.search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(newFilters.search.toLowerCase()) ||
          item.description.toLowerCase().includes(newFilters.search.toLowerCase()) ||
          item.location.toLowerCase().includes(newFilters.search.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <img
                src="/Abismo.png"
                alt="Professional diving instruction"
                className="rounded-lg shadow-lg w-full dark:shadow-2xl"
                 className="h-10 w-10"
              />
              <div className="bg-primary-foreground/10 p-2 rounded-full">
              </div>
              <div>
                <h1 className="text-3xl font-bold">Abismo</h1>
                <p className="text-primary-foreground/80">Professional Diving Center</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#trips" className="hover:text-primary-foreground/80 transition-colors">
                Trips
              </a>
              <a href="#courses" className="hover:text-primary-foreground/80 transition-colors">
                Courses
              </a>
              <a href="#about" className="hover:text-primary-foreground/80 transition-colors">
                About
              </a>
              <a href="#contact" className="hover:text-primary-foreground/80 transition-colors">
                Contact
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="absolute center inset-0 opacity-20 dark:opacity-50">
          <img src="/Buzos%20en%20belice.webp" alt="Buceo en Veracruz" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold text-balance mb-6">Bucear es superar tus propios límites.</h1>
          <h2 className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            En ABISMO no solo bajamos al fondo, subimos de nivel. Únete a nuestras expediciones y cursos personalizados.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Calendar className="mr-2 h-5 w-5" />
              Bucea con nosotros
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Fish className="mr-2 h-5 w-5" />
              Inicia tu descenso
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Experience the Ocean</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Immerse yourself in breathtaking underwater worlds and create memories that last a lifetime.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/Buzos%20de%20abismo.webp"
                alt="Buceo en Veracruz"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/cabo%20Pulmo.webp"
                alt="Buceo en Acapulco"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/cabo%20pulmo%20ballena.webp"
                alt="Expediciones de buceo México"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/leon%20marino.webp"
                alt="Curso de buceo PADI/SSI, Apnea México"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/50 dark:bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search trips and courses..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="trip">Trips</SelectItem>
                  <SelectItem value="course">Courses</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.difficulty} onValueChange={(value) => updateFilter("difficulty", value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.priceRange} onValueChange={(value) => updateFilter("priceRange", value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-100">$0 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200-500">$200+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16" id="trips">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Services</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our wide range of diving experiences, from beginner-friendly trips to advanced certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:hover:shadow-2xl flex flex-col"
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg bg-muted">
                  {item.coordinates ? (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      <Map
                        viewport={{ center: item.coordinates, zoom: 6, pitch: 45 }}
                        interactive={false}
                        className="w-full h-full"
                      >
                        <MapMarker longitude={item.coordinates[0]} latitude={item.coordinates[1]}>
                          <MarkerContent />
                        </MapMarker>
                      </Map>
                    </div>
                  ) : (
                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant={item.type === "trip" ? "default" : "secondary"}>
                      {item.type === "trip" ? "Trip" : "Course"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 z-10 text-white font-medium bg-background/50 py-0.5 px-2 rounded backdrop-blur">
                    <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {item.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Max {item.maxParticipants} participants
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {item.rating} rating
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">${item.price}</div>
                  <Button>
                    <Anchor className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Fish className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">No services found</h4>
              <p className="text-muted-foreground">Try adjusting your filters to see more options.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/50 dark:bg-muted/20" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Sobre nosotros</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Nacimos de la idea de que cada segundo bajo el agua cuenta. Tras una pausa para reconectar con el mar, ABISMO regresa para quienes buscan más que un certificado: buscan una comunidad.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Comunidad de Buzos</h4>
                    <p className="text-muted-foreground">
                      Conecta con entusiastas del mar y crece en un ambiente de apoyo y amistad, no solo en un curso más.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Anchor className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Seguridad y Calidad</h4>
                    <p className="text-muted-foreground">
                      Tu seguridad y formación son indispensables; nuestra filosofía te lleva a estar listo para el Abismo.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Fish className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Destinos Épicos</h4>
                    <p className="text-muted-foreground">
                      Sumérgete en expediciones a lo ancho del país: Buceo en Cancún, Veracruz, Acapulco y más maravillas acuáticas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/siguiente%20viaje.webp"
                alt="Buceo con mantas en Cancún"
                className="rounded-lg shadow-lg w-full dark:shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to start your underwater adventure? Contact us to book your trip or ask any questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p className="text-muted-foreground">+52 5548 1746</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p className="text-muted-foreground">info@abismoesbuceo</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Read our Blog</h4>
                <p className="text-muted-foreground">
                  pabloezeta.com             
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-foreground/10 p-2 rounded-full">
                  <Waves className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold">Abismo</h4>
              </div>
              <p className="text-primary-foreground/80">
                Your gateway to underwater adventures and professional diving education.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Diving Trips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    SSI Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Equipment Rental
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Private Groups
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <p className="text-primary-foreground/80 mb-4">Stay updated with our latest adventures and offers.</p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Instagram
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2025 Wild Sites | Pablo Ezeta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
