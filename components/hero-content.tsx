"use client"

export default function HeroContent() {
  return (
    <main 
      className="absolute top-16 bottom-48 md:bottom-44 left-4 right-4 md:left-8 md:right-auto z-20 max-w-lg flex items-end"
      style={{
        transform: 'translateZ(0)', // Hardware acceleration
        willChange: 'transform'
      }}
    >
      <div className="text-left">
        <h1 className="text-4xl md:text-6xl md:leading-16 tracking-tight text-black mb-4 flex items-center md:whitespace-nowrap leading-tight">
          <span className="font-accent font-normal">build the future</span>
        </h1>
      </div>
    </main>
  )
}
