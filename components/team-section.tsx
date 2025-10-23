"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function TeamSection() {
  const teamMembers = [
    {
      name: "Nikolas Doan",
      nameInChinese: "段皇方",
      position: "CEO",
      image: "/avatars/nikolas_avatar.jpeg",
      regions: ["Taiwan", "Vietnam", "USA"],
      email: "niko.tecx@gmail.com",
    },
    {
      name: "Brian Nguyen",
      nameInChinese: "阮文貴",
      position: "CTO",
      image: "/avatars/brian_avatar.png",
      regions: ["Taiwan", "Vietnam", "China"],
      email: "brian.tecx@gmail.com",
    },
    {
      name: "Jane Liu",
      nameInChinese: "劉美玲",
      position: "Chief Designer",
      image: "/avatars/jane_avatar.jpeg",
      regions: ["Taiwan"],
      email: "jane.tecx@gmail.com",
    },
    {
      name: "Ellis Wu",
      nameInChinese: "吳賢政",
      position: "Chief Business Developer",
      image: "/avatars/ellis_avatar.jpeg",
      regions: ["Taiwan"],
      email: "",
    },
    {
      name: "Edgar Effendi",
      nameInChinese: "洪豪進",
      position: "System Architect",
      image: "/avatars/edgar_avatar.jpeg",
      regions: ["Taiwan", "Indonesia"],
      email: "",
    },
    {
      name: "Linh Linh",
      nameInChinese: "",
      position: "UI/UX Designer",
      image: "/avatars/tecxmate-logo-light.png",
      regions: ["Vietnam"],
      email: "",
    },
    {
      name: "BAVO",
      nameInChinese: "",
      position: "Mobile Developer",
      image: "/avatars/tecxmate-logo-light.png",
      regions: ["Vietnam"],
      email: "",
    },
    {
      name: "QUYEN",
      nameInChinese: "",
      position: "Mobile Developer",
      image: "/avatars/tecxmate-logo-light.png",
      regions: ["Vietnam"],
      email: "",
    },
    {
      name: "DDH",
      nameInChinese: "",
      position: "Web Developer",
      image: "/avatars/tecxmate-logo-light.png",
      regions: ["Vietnam"],
      email: "",
    },
    {
      name: "PHUC",
      nameInChinese: "",
      position: "Web Developer",
      image: "/avatars/tecxmate-logo-light.png",
      regions: ["Vietnam"],
      email: "",
    },
  ]

  return (
    <section id="team" className="bg-[#F6F3F1] py-20 snap-start border-t border-b border-[rgba(55,50,47,0.12)]">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-mono font-normal md:text-4xl lg:text-5xl">Meet Our Experts</h2>
          
        </motion.div>

        <div className="mt-16 overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="flex gap-6 pb-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-72"
              >
                <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg h-full">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={member.image || "/placeholder-user.svg"}
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
                      <div className="flex flex-wrap justify-center gap-1">
                        {(member as any).regions?.map((region: string, i: number) => (
                          <span key={i} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                            {region}
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
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </section>
  )
}