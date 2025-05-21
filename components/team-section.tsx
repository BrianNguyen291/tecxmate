"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function TeamSection() {
  const teamMembers = [
    {
      name: "Nikolas Doan",
      nameInChinese: "段皇方",
      position: "Co-founder & CEO",
      image: "/avatars/nikolas_avatar.jpeg",
      languages: ["English", "Chinese", "Vietnamese"],
      expertise: ["Digital Strategy", "Market Research", "International Cooperation"],
      email: "niko.tecx@gmail.com",
    },
    {
      name: "Brian Nguyen",
      nameInChinese: "阮文貴",
      position: "Founder & CTO",
      image: "/avatars/brian_avatar.png",
      languages: ["English", "Chinese", "Vietnamese"],
      expertise: ["Website Development", "Application Development", "Digital Solutions"],
      email: "brian.tecx@gmail.com",
    },
    {
      name: "Jane Liu",
      nameInChinese: "劉美玲",
      position: "Head of Design",
      image: "/avatars/jane_avatar.jpeg",
      languages: ["English", "Chinese", "Cantonese"],
      expertise: ["UI/UX Design", "Brand Identity", "Visual Communication"],
      email: "jane.tecx@gmail.com",
    },
    {
      name: "Edgar Edffedi",
      nameInChinese: "艾德加",
      position: "Head of Media",
      image: "/avatars/edgar_avatar.jpeg",
      languages: ["English", "French", "Spanish"],
      expertise: ["Content Strategy", "Digital Marketing", "Media Production"],
      email: "edgar.tecx@gmail.com",
    },
  ]

  return (
    <section id="team" className="bg-[#F6F3F1] py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Experts</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            The talented professionals behind our exceptional work
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="aspect-square w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity hover:opacity-100">
                      <div className="absolute bottom-0 w-full p-4 text-white">
                        <p className="text-sm font-medium">{member.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.nameInChinese}</p>
                    <p className="mt-1 text-sm font-medium text-primary">{member.position}</p>

                    <div className="mt-3">
                      <p className="text-xs font-medium uppercase text-gray-500">Languages</p>
                      <div className="mt-1 flex flex-wrap justify-center gap-1">
                        {member.languages.map((language, i) => (
                          <span key={i} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs font-medium uppercase text-gray-500">Expertise</p>
                      <div className="mt-1 flex flex-wrap justify-center gap-1">
                        {member.expertise.map((skill, i) => (
                          <span key={i} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
