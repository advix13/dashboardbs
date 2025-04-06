import Image from 'next/image';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="py-16 px-5 bg-gray-50">
      <div className="container mx-auto">
        <div className="bg-blue-50 rounded-lg p-8 flex flex-col md:flex-row items-center">
          {/* Left side - Bottle image with discount badge */}
          <div className="md:w-1/3 relative mb-8 md:mb-0">
            <div className="relative h-[300px] w-[250px] mx-auto">
              <Image 
                src="/images/borjomi-bottle.png" 
                alt="Borjomi bottle"
                width={250}
                height={300}
                className="object-contain"
              />
              
              {/* Discount badge */}
              <div className="absolute -top-6 -right-6 bg-pink-500 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center">
                <span className="text-xs font-bold">SALE</span>
                <span className="text-lg font-bold">-20%</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Text content and form */}
          <div className="md:w-2/3 md:pl-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Follow the promotions of our company</h2>
            <p className="text-gray-600 mb-6">
              Stay up to date with all the events of our company. Be the first to know about 
              promotions, contests and news!
            </p>
            
            {/* Email subscription form */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="YOUR E-MAIL" 
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-black text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <span>SUBSCRIBE</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            {/* Shop now link */}
            <div className="mt-8">
              <Link href="/shop" className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-800 transition-colors">
                <span>SHOP NOW</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
