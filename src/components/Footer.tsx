import { Phone, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className='bg-card border-t border-primary/20 py-12 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='text-3xl font-playfair font-bold text-gold-gradient'>
                MJ
              </div>
              <div>
                <h3 className='font-playfair font-semibold text-lg text-foreground'>
                  Mansa Jewellers
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Since Excellence
                </p>
              </div>
            </div>
            <p className='text-muted-foreground'>
              Crafting exquisite jewelry with traditional artistry and modern
              elegance. Your trusted partner for life's precious moments.
            </p>
            <p className='text-sm text-primary font-medium italic'>
              "Apratem Vishwas, Alishan Dalan"
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='font-playfair font-semibold text-lg text-foreground'>
              Quick Links
            </h4>
            <nav className='space-y-2'>
              <a
                href='#collection'
                className='block text-muted-foreground hover:text-primary transition-smooth'
              >
                Our Collection
              </a>
              <a
                href='#contact'
                className='block text-muted-foreground hover:text-primary transition-smooth'
              >
                Visit Store
              </a>
              <a
                href='#'
                className='block text-muted-foreground hover:text-primary transition-smooth'
              >
                Custom Designs
              </a>
              <a
                href='#'
                className='block text-muted-foreground hover:text-primary transition-smooth'
              >
                About Us
              </a>
              <a
                href='/auth'
                className='block text-muted-foreground hover:text-primary transition-smooth'
              >
                Sign In / Sign Up
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h4 className='font-playfair font-semibold text-lg text-foreground'>
              Get in Touch
            </h4>
            <div className='space-y-3'>
              <a
                href='tel:7720920930'
                className='flex items-center space-x-3 text-muted-foreground hover:text-primary transition-smooth'
              >
                <Phone size={18} />
                <span>+91 7720920930</span>
              </a>
              <div className='flex items-start space-x-3 text-muted-foreground'>
                <MapPin size={18} className='mt-1 flex-shrink-0' />
                <address className='not-italic'>
                  256, Mangalwar Peth
                  <br />
                  Karad, Maharashtra
                </address>
              </div>
              <a
                href='mailto:info@mansajewellers.com'
                className='flex items-center space-x-3 text-muted-foreground hover:text-primary transition-smooth'
              >
                <Mail size={18} />
                <span>info@mansajewellers.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-primary/20 mt-8 pt-8 text-center'>
          <p className='text-muted-foreground text-sm'>
            © 2025 Mansa Jewellers (MJ). All rights reserved. |
            <span className='text-primary'>
              {" "}
              Designed and Developed by Aasif D{" "}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
