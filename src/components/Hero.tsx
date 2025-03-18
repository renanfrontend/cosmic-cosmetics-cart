
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export function Hero({ 
  title, 
  subtitle, 
  ctaText, 
  ctaLink, 
  imageUrl 
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate image loading
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsLoaded(true);
      setTimeout(() => setIsVisible(true), 100);
    };
  }, [imageUrl]);

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Image with Loading Effect */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          isLoaded ? 'blur-0 scale-100' : 'blur-lg scale-105'
        }`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 1.5s ease-out'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white"></div>
      
      {/* Content */}
      <div className="container relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
        <div 
          className={`max-w-2xl transition-all duration-1000 delay-300 transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 text-white drop-shadow-md">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto drop-shadow">
            {subtitle}
          </p>
          <Link to={ctaLink}>
            <Button 
              size="lg" 
              className="bg-white text-brand-800 hover:bg-white/90 shadow-md group"
            >
              {ctaText}
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
