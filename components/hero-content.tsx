"use client"

export default function HeroContent() {
  return (
    <main 
      className="absolute top-20 bottom-32 md:bottom-36 left-4 right-4 md:left-8 md:right-auto z-20 max-w-lg flex items-end"
      style={{
        transform: 'translateZ(0)', // Hardware acceleration
        willChange: 'transform'
      }}
    >
      <div className="text-left">
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight text-black mb-4 flex items-center md:whitespace-nowrap">
          <span className="font-mono font-normal">build the future</span>
        </h1>
      </div>
    </main>
  )
}
