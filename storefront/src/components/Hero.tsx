import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden p-5 rounded-[15px] mx-5 bg-cover bg-center" style={{ backgroundImage: "url('/images/home-page-heder .png')" }}>
      <div className="container mx-auto px-6 py-8 md:py-10 flex flex-col md:flex-row items-center" style={{ minHeight: '470px', maxHeight: '470px' }}>
        {/* Left side - Empty space */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          {/* Water bottle image removed */}
        </div>
        
        {/* Right side - Text content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-6">
            Discover the<br />
            purest water<br />
            on Earth
          </h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2">Aquans "Natural mineral"</h3>
            <p className="text-sm md:text-base opacity-80 max-w-md">
              Our award-winning water is lightly carbonated with a naturally low mineral 
              content and a clean, crisp finish.
            </p>
          </div>
          

        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 right-8">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-light">01</span>
          <div className="w-20 h-px bg-white/50">
            <div className="w-1/3 h-full bg-white"></div>
          </div>
          <span className="text-xl font-light">03</span>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
