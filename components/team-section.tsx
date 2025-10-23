"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Linkedin, Twitter, GraduationCap, PenTool, Building2 } from "lucide-react"
import Image from "next/image"

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<{
    id: string;
    name: string;
    role: string;
    photo: string;
    description: string;
    twitter: string;
    linkedin: string;
  } | null>(null)

  const teamMembers = [
    {
      id: 'nikolas',
      name: 'Nikolas Doan',
      role: 'CEO',
      photo: '/avatars/nikolas_avatar.jpeg',
      description: 'MSc AI/Robotics (NTU, exp. \'26). Former Google Cloud Startups. CEO TECXMATE.COM',
      twitter: 'https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AH8HC4wBT4T5k1ixLLhNjPNv_RVi-PwijNu8oMXqf4mh7nL21PUT5zluCMjJkZyOBmcdy1_51pRTnYe7erhljl_XOl2nQ3XXV8TW7isW6-0&user=ffn9iV8AAAAJ',
      linkedin: 'https://www.linkedin.com/in/nikolasdoan/'
    },
    {
      id: 'brian',
      name: 'Brian Nguyen',
      role: 'CTO',
      photo: '/avatars/brian_avatar.png',
      description: 'MS Gamification Engineering (NTUST, exp. \'27). Built 3+ apps on App Store. Specialist in game mechanics for learning.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/brian-nguyen-587825235/'
    },
    {
      id: 'jane',
      name: 'Jane Liu',
      role: 'Chief Designer',
      photo: '/avatars/jane_avatar.jpeg',
      description: 'Creative director with expertise in UI/UX design and brand identity development.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/jane-liu/'
    },
    {
      id: 'ellis',
      name: 'Ellis Wu',
      role: 'Chief Business Developer',
      photo: '/avatars/ellis_avatar.jpeg',
      description: 'Business development specialist focused on strategic partnerships and market expansion.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/ellis-wu/'
    },
    {
      id: 'edgar',
      name: 'Edgar Effendi',
      role: 'System Architect',
      photo: '/avatars/edgar_avatar.jpeg',
      description: 'System architecture expert with deep knowledge in scalable infrastructure and cloud solutions.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/edgar-effendi/'
    },
    {
      id: 'linh',
      name: 'Linh Linh',
      role: 'UI/UX Designer',
      photo: '/avatars/tecxmate-logo-light.png',
      description: 'UI/UX designer specializing in user-centered design and digital experiences.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/linh-linh/'
    },
    {
      id: 'bavo',
      name: 'BAVO',
      role: 'Mobile Developer',
      photo: '/avatars/tecxmate-logo-light.png',
      description: 'Mobile development specialist with expertise in iOS and Android app development.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/bavo/'
    },
    {
      id: 'quyen',
      name: 'QUYEN',
      role: 'Mobile Developer',
      photo: '/avatars/tecxmate-logo-light.png',
      description: 'Mobile developer focused on cross-platform solutions and performance optimization.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/quyen/'
    },
    {
      id: 'ddh',
      name: 'DDH',
      role: 'Web Developer',
      photo: '/avatars/tecxmate-logo-light.png',
      description: 'Web development specialist with expertise in modern frameworks and responsive design.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/ddh/'
    },
    {
      id: 'phuc',
      name: 'PHUC',
      role: 'Web Developer',
      photo: '/avatars/tecxmate-logo-light.png',
      description: 'Full-stack web developer with experience in both frontend and backend technologies.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/phuc/'
    }
  ]

  return (
    <>
      <section id="team" className="bg-alt-gray-100 py-20 snap-start border-t border-b border-[rgba(55,50,47,0.12)]">
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
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: teamMembers.indexOf(member) * 0.05 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-72"
                >
                  <div
                    className="rounded-lg border border-alt-gray-200 bg-white shadow-sm overflow-hidden h-full cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300"
                    onClick={() => setSelectedMember(member)}
                  >
                <div className="w-full aspect-[4/5] bg-[#e3e3e3]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-alt-black mb-1">{member.name}</h3>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[3000] flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="bg-white rounded-lg w-full max-w-3xl p-0 relative max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(91,16,253,0.35)]"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 24 } }}
              exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.2 } }}
              drag={false}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                aria-label="Close"
                className="absolute top-2 right-2 z-20 h-9 w-9 inline-flex items-center justify-center rounded-full bg-alt-gray-100 text-alt-gray-600 hover:text-alt-black hover:bg-alt-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Photo left */}
                <div className="w-full md:h-full">
                  <div className="w-full aspect-square md:aspect-auto md:h-full overflow-hidden max-h-[80vh] md:max-h-none">
                    <Image
                      src={selectedMember.photo}
                      alt={selectedMember.name}
                      width={600}
                      height={750}
                      className="w-full h-full object-cover object-[center_20%] md:object-contain"
                    />
                  </div>
                </div>

                {/* Text right */}
                <div className="text-left p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-alt-black mb-2">{selectedMember.name}</h2>
                  <p className="text-primary mb-4">{selectedMember.role}</p>
                  <p className="text-alt-gray-500 leading-relaxed mb-6">{selectedMember.description}</p>

                  <div className="flex items-center gap-4">
                    <a 
                      href={selectedMember.linkedin} 
                      aria-label="LinkedIn" 
                      className="p-3 rounded-full bg-alt-gray-100 hover:bg-alt-gray-200 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-6 w-6 text-alt-gray-600" strokeWidth={1.25} />
                    </a>
                    <a 
                      href={selectedMember.twitter} 
                      aria-label={selectedMember.id === 'brian' ? 'Company' : selectedMember.id === 'nikolas' ? 'Academic' : 'Author'} 
                      className="p-3 rounded-full bg-alt-gray-100 hover:bg-alt-gray-200 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedMember.id === 'brian' ? (
                        <Building2 className="h-6 w-6 text-alt-gray-600" strokeWidth={1.25} />
                      ) : selectedMember.id === 'nikolas' ? (
                        <GraduationCap className="h-6 w-6 text-alt-gray-600" strokeWidth={1.25} />
                      ) : (
                        <PenTool className="h-6 w-6 text-alt-gray-600" strokeWidth={1.25} />
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  )
}