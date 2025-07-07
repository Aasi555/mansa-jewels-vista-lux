import { Phone, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Royal MJ Logo */}
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-playfair font-bold text-gold-gradient">
            MJ
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-playfair font-semibold text-foreground">
              Mansa Jewellers
            </h1>
            <p className="text-sm text-muted-foreground">Since Excellence</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex items-center space-x-6">
          <a 
            href="tel:7720920930" 
            className="flex items-center space-x-2 text-primary hover:text-accent transition-smooth"
          >
            <Phone size={18} />
            <span className="hidden md:inline font-medium">7720920930</span>
          </a>
          <div className="hidden lg:flex items-center space-x-2 text-muted-foreground">
            <MapPin size={18} />
            <span className="text-sm">256, Mangalwar Peth, Karad</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;