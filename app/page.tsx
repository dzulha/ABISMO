"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Waves, Fish, Anchor, MapPin, Clock, Users, Star, Calendar, Phone, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample data for trips and courses
const trips = [
  {
    id: 1,
    title: "Coral Reef Explorer",
    type: "trip",
    difficulty: "beginner",
    duration: "4 hours",
    price: 89,
    location: "Blue Lagoon",
    image: "/coral-reef-diving.jpg",
    description: "Discover vibrant coral reefs teeming with marine life in crystal clear waters.",
    rating: 4.8,
    maxParticipants: 8,
    availableDates: ["2024-03-15", "2024-03-22", "2024-03-29"],
  },
  {
    id: 2,
    title: "Deep Sea Adventure",
    type: "trip",
    difficulty: "advanced",
    duration: "6 hours",
    price: 149,
    location: "Mariana Trench",
    image: "/deep-sea-diving.jpg",
    description: "Explore the mysterious depths of the ocean and encounter rare deep-sea creatures.",
    rating: 4.9,
    maxParticipants: 6,
    availableDates: ["2024-03-20", "2024-03-27", "2024-04-03"],
  },
  {
    id: 3,
    title: "Open Water Certification",
    type: "course",
    difficulty: "beginner",
    duration: "3 days",
    price: 299,
    location: "Training Center",
    image: "/diving-course.jpg",
    description: "Get your PADI Open Water certification with our experienced instructors.",
    rating: 4.7,
    maxParticipants: 12,
    availableDates: ["2024-03-18", "2024-03-25", "2024-04-01"],
  },
  {
    id: 4,
    title: "Wreck Diving Expedition",
    type: "trip",
    difficulty: "intermediate",
    duration: "5 hours",
    price: 119,
    location: "Sunken Ship Bay",
    image: "/wreck-diving.jpg",
    description: "Explore historic shipwrecks and discover maritime history beneath the waves.",
    rating: 4.6,
    maxParticipants: 10,
    availableDates: ["2024-03-16", "2024-03-23", "2024-03-30"],
  },
  {
    id: 5,
    title: "Advanced Open Water",
    type: "course",
    difficulty: "intermediate",
    duration: "2 days",
    price: 199,
    location: "Training Center",
    image: "/advanced-diving.jpg",
    description: "Advance your diving skills with specialized training in navigation and deep diving.",
    rating: 4.8,
    maxParticipants: 8,
    availableDates: ["2024-03-19", "2024-03-26", "2024-04-02"],
  },
  {
    id: 6,
    title: "Night Diving Experience",
    type: "trip",
    difficulty: "intermediate",
    duration: "3 hours",
    price: 99,
    location: "Moonlight Bay",
    image: "/night-diving.jpg",
    description: "Experience the ocean's nocturnal wonders with our guided night diving adventure.",
    rating: 4.5,
    maxParticipants: 6,
    availableDates: ["2024-03-17", "2024-03-24", "2024-03-31"],
  },
  {
    id: 7,
    title: "Underwater Photography",
    type: "course",
    difficulty: "intermediate",
    duration: "2 days",
    price: 249,
    location: "Photo Bay",
    image: "/underwater-photography.jpg",
    description: "Learn to capture stunning underwater moments with professional photography techniques.",
    rating: 4.7,
    maxParticipants: 6,
    availableDates: ["2024-03-21", "2024-03-28", "2024-04-04"],
  },
  {
    id: 8,
    title: "Cave Diving Adventure",
    type: "trip",
    difficulty: "advanced",
    duration: "7 hours",
    price: 179,
    location: "Crystal Caves",
    image: "/cave-diving.jpg",
    description: "Explore mysterious underwater caves with crystal-clear waters and unique formations.",
    rating: 4.9,
    maxParticipants: 4,
    availableDates: ["2024-03-19", "2024-03-26", "2024-04-02"],
  },
  {
    id: 9,
    title: "Marine Biology Tour",
    type: "trip",
    difficulty: "beginner",
    duration: "5 hours",
    price: 109,
    location: "Biodiversity Reef",
    image: "/marine-biology.jpg",
    description: "Educational diving experience focusing on marine ecosystems and conservation.",
    rating: 4.6,
    maxParticipants: 10,
    availableDates: ["2024-03-18", "2024-03-25", "2024-04-01"],
  },
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
              <div className="bg-primary-foreground/10 p-2 rounded-full">
                <Waves className="h-8 w-8" />
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
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <img src="/hero-diving-background.jpg" alt="Underwater diving scene" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold text-balance mb-6">Discover the Depths of Adventure</h2>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Explore the underwater world with Abismo's professional diving services. From beginner courses to advanced
            expeditions, we offer unforgettable marine experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Calendar className="mr-2 h-5 w-5" />
              Book Your Adventure
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Fish className="mr-2 h-5 w-5" />
              View Courses
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
                src="/gallery-tropical-fish.jpg"
                alt="Tropical fish"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/gallery-sea-turtle.jpg"
                alt="Sea turtle"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/gallery-coral-garden.jpg"
                alt="Coral garden"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/gallery-diving-group.jpg"
                alt="Diving group"
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
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:hover:shadow-2xl"
              >
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge variant={item.type === "trip" ? "default" : "secondary"}>
                      {item.type === "trip" ? "Trip" : "Course"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
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
              <h3 className="text-3xl font-bold mb-6">Why Choose Abismo?</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Expert Instructors</h4>
                    <p className="text-muted-foreground">
                      Our certified PADI instructors have years of experience and prioritize your safety and learning.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Anchor className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Premium Equipment</h4>
                    <p className="text-muted-foreground">
                      We provide top-quality, regularly maintained diving equipment for your safety and comfort.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Fish className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Unique Locations</h4>
                    <p className="text-muted-foreground">
                      Explore pristine dive sites with diverse marine life and stunning underwater landscapes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/professional-instructor.jpg"
                alt="Professional diving instruction"
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
                <p className="text-muted-foreground">+1 (555) 123-DIVE</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p className="text-muted-foreground">info@abismo-diving.com</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Visit Us</h4>
                <p className="text-muted-foreground">
                  123 Ocean Drive
                  <br />
                  Coastal City, CC 12345
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
                    PADI Courses
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
            <p>&copy; 2024 Abismo Diving Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
