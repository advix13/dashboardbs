import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
}

const ProductCard = ({ image, title, price }: ProductCardProps) => {
  return (
    <div className="bg-gray-50 p-5 rounded-lg flex flex-col items-center">

      
      <div className="relative w-full flex items-center justify-center">
        <Image 
          src={image} 
          alt={title}
          width={240}
          height={240}
          className="object-contain"
        />
      </div>
      

      
      <h3 className="text-lg font-bold text-gray-800 mt-1 text-left leading-tight">{title} - combo for the price of one</h3>
      
      <div className="mt-auto w-full">

        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-blue-400">1,500 CFA</p>
          <button className="text-xs text-white bg-blue-400 rounded px-3 py-2 hover:bg-blue-500 transition-colors">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

const PromoCard = () => {
  return (
    <div className="bg-blue-100 p-6 rounded-lg h-full flex flex-col justify-between">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Your Borjomi on every day</h2>
        <p className="text-sm text-white">Legendary mineral water in a compact bottle</p>
      </div>
      
      <div className="relative h-64 w-full mt-4">
        <Image 
          src="/images/woman-with-bottle.jpg" 
          alt="Woman with Borjomi bottle"
          fill
          className="object-cover rounded"
        />
      </div>
      
      <div className="absolute top-4 right-4">
        <span className="text-xs font-medium text-white bg-blue-400 px-2 py-1 rounded">POPULAR</span>
      </div>
    </div>
  );
};

export default function ProductsSection() {
  return (
    <section className="py-16 px-5 w-full">
      <div className="w-full max-w-none px-5">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Our Products</h2>
          <Link href="/shop" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <span>Shop Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <ProductCard 
            image="/images/1.png"
            title="Buy water 0.33l in an iron can at a discount"
            price="1,500"
          />
          
          <ProductCard 
            image="/images/2.png"
            title="Very clean water"
            price="1,500"
          />
          
          <ProductCard 
            image="/images/3.png"
            title="Water 1.5 liters non-carbonated"
            price="1,500"
          />
          
          <div className="relative h-full overflow-hidden rounded-lg">
            <div className="absolute top-2 right-2 z-10">
              <span className="text-xs font-medium text-white bg-blue-400 px-2 py-1 rounded">POPULAR</span>
            </div>
            
            {/* Background image with gradient overlay */}
            <div className="absolute inset-0">
              <Image 
                src="/images/blue-springgirl drinking.jpg" 
                alt="Girl drinking water"
                fill
                className="object-cover"
              />
              {/* Gradient overlay from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/80 to-transparent"></div>
            </div>
            
            {/* Text content at the bottom */}
            <div className="relative h-full p-6 flex flex-col justify-end">
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Refresh Your Life Daily</h2>
              <p className="text-sm text-white mb-2 drop-shadow-md">Finest mineral water. Sourced from pristine springs for unmatched hydration and wellness.</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-50 rounded-lg p-8 flex flex-col md:flex-row items-center">
          {/* Left side - Bottle image with discount badge */}
          <div className="md:w-1/2 relative mb-8 md:mb-0">
            <div className="relative h-[300px] w-full mx-auto">
              <Image 
                src="/images/Blue-Spring-cta.png" 
                alt="Blue Spring water"
                fill
                className="object-cover"
                sizes="50vw"
              />
              
              {/* Discount badge */}
              <div className="absolute -top-6 -right-6 bg-blue-400 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center">
                <span className="text-xs font-bold">SALE</span>
                <span className="text-lg font-bold">-20%</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Text content */}
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Follow the promotions of our company</h2>
            <p className="text-gray-600 mb-6">
              Stay up to date with all the events of our company. Be the first to know about 
              promotions, contests and news!
            </p>
            
            {/* Shop now button */}
            <div className="mt-4">
              <Link href="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 hover:bg-blue-700 transition-colors">
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
