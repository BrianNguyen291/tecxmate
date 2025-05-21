import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F6F3F1]">
      <Navbar />
      <main>
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
              <p className="mt-4 text-gray-500 md:text-xl/relaxed">
                Have a question or want to work together? Get in touch with our team.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-white p-8 shadow-md">
                  <h2 className="mb-6 text-2xl font-bold">Email Us</h2>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start gap-3 text-left" asChild>
                      <a href="mailto:tecxmate@gmail.com">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">General Inquiries</div>
                          <div className="text-sm text-gray-500">tecxmate@gmail.com</div>
                        </div>
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-8 shadow-md">
                  <h2 className="mb-6 text-2xl font-bold">Chat With Us</h2>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start gap-3 text-left" asChild>
                      <a href="https://wa.me/nikolasdoan" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="font-medium">WhatsApp</div>
                          <div className="text-sm text-gray-500">nikolasdoan</div>
                        </div>
                      </a>
                    </Button>

                    <Button variant="outline" className="w-full justify-start gap-3 text-left" asChild>
                      <a href="https://line.me/ti/p/nikolasdoan" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Line</div>
                          <div className="text-sm text-gray-500">nikolasdoan</div>
                        </div>
                      </a>
                    </Button>

                    <Button variant="outline" className="w-full justify-start gap-3 text-left" asChild>
                      <a href="weixin://dl/chat?nikolasdoan" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5 text-green-700" />
                        <div>
                          <div className="font-medium">WeChat</div>
                          <div className="text-sm text-gray-500">nikolasdoan</div>
                        </div>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold">Schedule a Call</h2>
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <a href="https://cal.com/nikolasdoan/30min" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book a Discovery Call
                  </a>
                </Button>
                <p className="mt-4 text-gray-500">
                  Schedule a 30-minute call with our team to discuss your project needs and how we can help you achieve
                  your goals.
                </p>
              </div>

              <div className="mt-8 rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold">Connect on Social Media</h2>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" size="lg" className="gap-2" asChild>
                    <a href="https://facebook.com/tecxmate" target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-5 w-5 text-blue-600" />
                      Facebook
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2" asChild>
                    <a href="https://twitter.com/tecxmate" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5 text-blue-400" />
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2" asChild>
                    <a href="https://instagram.com/tecxmate" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5 text-pink-600" />
                      Instagram
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2" asChild>
                    <a href="https://linkedin.com/company/tecxmate" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
