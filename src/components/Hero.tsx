import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/jewelry-hero-bg.jpg';

const Hero = () => {
  const scrollToCollection = () => {
    const section = document.getElementById('collection');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 video-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Tagline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-foreground mb-6">
          <span className="text-gold-gradient">Apratem Vishwas</span>
          <br />
          <span className="text-gold-gradient">Alishan Dalan</span>
        </h1>

        {/* Attribution */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 font-inter italic">
          By Samin Shaikh (Raj)
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-12">
          <div className="card-luxury px-6 py-4">
            <h3 className="text-primary font-semibold text-lg">Hallmark 916 Gold</h3>
          </div>
          <div className="card-luxury px-6 py-4">
            <h3 className="text-primary font-semibold text-lg">Pure Silver</h3>
          </div>
          <div className="card-luxury px-6 py-4">
            <h3 className="text-primary font-semibold text-lg">Customized Designs</h3>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={scrollToCollection}
          variant="luxury"
          size="lg"
          className="text-lg px-12 py-6 rounded-full group"
        >
          Explore Collection
          <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-primary h-8 w-8" />
      </div>
    </section>
  );
};

export default Hero;