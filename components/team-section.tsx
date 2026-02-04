"use client"

import { Linkedin, GraduationCap, PenTool, Building2 } from "lucide-react"
import Image from "next/image"

export function TeamSection() {
  const teamMembers = [
    {
      id: 'nikolas',
      name: 'Nikolas Doan 段皇方',
      role: 'CEO & CFO',
      photo: '/avatars/niko_ava_color.jpg',
      description: 'MSc AI/Robotics (NTU, exp. \'26). Former Google Cloud Startups. CEO TECXMATE.COM',
      twitter: 'https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AH8HC4wBT4T5k1ixLLhNjPNv_RVi-PwijNu8oMXqf4mh7nL21PUT5zluCMjJkZyOBmcdy1_51pRTnYe7erhljl_XOl2nQ3XXV8TW7isW6-0&user=ffn9iV8AAAAJ',
      linkedin: 'https://www.linkedin.com/in/nikolasdoan/'
    },
    {
      id: 'brian',
      name: 'Brian Nguyen 阮文貴',
      role: 'CTO & COO',
      photo: '/avatars/brian_avatar.png',
      description: 'MS Gamification Engineering (NTUST, exp. \'27). Built 3+ apps on App Store. Specialist in game mechanics for learning.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/brian-nguyen-587825235/'
    }
  ]

  return (
    <>
      <section id="team" className="bg-white py-24 md:py-28 lg:py-32">
        <div className="container px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl tracking-tight text-gray-900">Meet the Founders</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">The masterminds of TECXMATE - Dedicated to your success.</p>
          </div>

          <div className="mt-16 overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-80 md:w-96"
                >
                  <div
                    className="rounded-lg border border-alt-gray-200 bg-white shadow-sm overflow-hidden h-full hover:border-primary hover:shadow-md transition-all duration-300"
                  >
                <div className="w-full aspect-[3/4] bg-[#e3e3e3]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                    <div className="p-4 md:p-6 text-center">
                      <h3 className="text-lg md:text-xl font-semibold text-alt-black mb-2">{member.name}</h3>
                      <p className="text-sm md:text-base text-primary font-medium mb-3">{member.role}</p>
                      <div className="flex items-center justify-center gap-3">
                        <a 
                          href={member.linkedin} 
                          aria-label="LinkedIn" 
                          className="p-2 rounded-full bg-alt-gray-100 hover:bg-alt-gray-200 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-5 w-5 text-alt-gray-600" strokeWidth={1.25} />
                        </a>
                        <a 
                          href={member.twitter} 
                          aria-label={member.id === 'brian' ? 'Company' : 'Academic'} 
                          className="p-2 rounded-full bg-alt-gray-100 hover:bg-alt-gray-200 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {member.id === 'brian' ? (
                            <Building2 className="h-5 w-5 text-alt-gray-600" strokeWidth={1.25} />
                          ) : (
                            <GraduationCap className="h-5 w-5 text-alt-gray-600" strokeWidth={1.25} />
                          )}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  )
}