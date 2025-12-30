"use client"

import { Linkedin, GraduationCap, PenTool, Building2 } from "lucide-react"
import Image from "next/image"

export function TeamSection() {
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
      id: 'ellis',
      name: 'Ellis Wu',
      role: 'Business Developer',
      photo: '/avatars/ellis_avatar.jpeg',
      description: 'Business development specialist focused on strategic partnerships and market expansion.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/hsien-cheng-ellis-wu-6a1044297/'
    },
    {
      id: 'jane',
      name: 'Jane Liu',
      role: 'Lead Designer',
      photo: '/avatars/jane_avatar.jpeg',
      description: 'Creative director with expertise in UI/UX design and brand identity development.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.linkedin.com/in/jane-liu/'
    },
    {
      id: 'edgar',
      name: 'Edgar Edffedi',
      role: 'Head of Media',
      photo: '/avatars/edgar_avatar.jpeg',
      description: 'Media specialist focused on content strategy, digital marketing, and media production.',
      twitter: 'https://www.tecxmate.com',
      linkedin: 'https://www.tecxmate.com'
    },
    {
      id: 'dipuislam',
      name: 'N N Dipu Islam',
      role: 'Senior Engineer',
      photo: '/avatars/dipuislam_avatar.png',
      description: 'Dedicated Mobile App Developer with expertise in Flutter, Java, and moderate problem-solving skills.',
      twitter: 'https://github.com/NNDipuIslam',
      linkedin: 'https://www.linkedin.com/in/nndipuislam19021'
    }
  ]

  return (
    <>
      <section id="team" className="bg-alt-gray-100 py-20 snap-start border-t border-b border-[rgba(55,50,47,0.12)]">
        <div className="container px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">Meet Our Experts</h2>
          </div>

          <div className="mt-16 overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-64"
                >
                  <div
                    className="rounded-lg border border-alt-gray-200 bg-white shadow-sm overflow-hidden h-full hover:border-primary hover:shadow-md transition-all duration-300"
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
                    <div className="p-3 text-center">
                      <h3 className="text-base font-semibold text-alt-black mb-1">{member.name}</h3>
                      <p className="text-xs text-primary font-medium mb-2">{member.role}</p>
                      {member.id !== 'jane' && (
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
                            aria-label={member.id === 'brian' ? 'Company' : member.id === 'nikolas' ? 'Academic' : 'Author'} 
                            className="p-2 rounded-full bg-alt-gray-100 hover:bg-alt-gray-200 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {member.id === 'brian' ? (
                              <Building2 className="h-5 w-5 text-alt-gray-600" strokeWidth={1.25} />
                            ) : member.id === 'nikolas' ? (
                              <GraduationCap className="h-5 w-5 text-alt-gray-600" strokeWidth={1.25} />
                            ) : (
                              <PenTool className="h-5 w-5 text-alt-gray-600" strokeWidth={1.25} />
                            )}
                          </a>
                        </div>
                      )}
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