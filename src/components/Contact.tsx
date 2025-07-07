import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <section className='py-20 px-4 bg-muted/20'>
      <div className='container mx-auto max-w-6xl'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-6xl font-playfair font-bold text-gold-gradient mb-6'>
            Visit Our Store
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Experience our jewelry collection in person. Visit our showroom for
            personalized consultation and custom design services.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Information */}
          <div className='space-y-8'>
            <Card className='card-luxury'>
              <CardContent className='p-8'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-primary/10 p-3 rounded-full'>
                    <Phone className='h-6 w-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-playfair font-semibold text-xl text-foreground mb-2'>
                      Call Us
                    </h3>
                    <a
                      href='tel:7720920930'
                      className='text-primary hover:text-accent transition-smooth text-lg font-medium'
                    >
                      +91 7720920930
                    </a>
                    <p className='text-muted-foreground mt-1'>
                      Available for consultations and appointments
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='card-luxury'>
              <CardContent className='p-8'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-primary/10 p-3 rounded-full'>
                    <MapPin className='h-6 w-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-playfair font-semibold text-xl text-foreground mb-2'>
                      Visit Our Showroom
                    </h3>
                    <address className='text-muted-foreground not-italic text-lg'>
                      256, Mangalwar Peth
                      <br />
                      Karad, Maharashtra
                    </address>
                    {/* <Button variant='royal' className='mt-4'>
                      Get Directions
                    </Button> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='card-luxury'>
              <CardContent className='p-8'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-primary/10 p-3 rounded-full'>
                    <Clock className='h-6 w-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-playfair font-semibold text-xl text-foreground mb-2'>
                      Store Hours
                    </h3>
                    <div className='text-muted-foreground space-y-1'>
                      <p>Wednesday - Monday: 10:00 AM - 8:00 PM</p>
                      <p>Tuesday Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder and Quick Contact */}
          <div className='space-y-8'>
            <Card className='card-luxury'>
              <CardContent className='p-0'>
                <div className='aspect-video bg-muted/20 rounded-xl overflow-hidden'>
                  <iframe
                    title='MJ Jewellers Location'
                    src='https://www.google.com/maps?q=256+Mangalwar+Peth,+Karad,+Maharashtra&output=embed'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen='true'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            <Card className='card-luxury'>
              <CardContent className='p-8'>
                <h3 className='font-playfair font-semibold text-xl text-foreground mb-4'>
                  Quick Contact
                </h3>
                <p className='text-muted-foreground mb-6'>
                  Have a question about our jewelry or want to schedule a
                  consultation? Get in touch with us directly.
                </p>
                <div className='space-y-4'>
                  <Button variant='luxury' className='w-full'>
                    <Phone className='mr-2 h-5 w-5' />
                    Call Now
                  </Button>
                  <Button variant='royal' className='w-full'>
                    <Mail className='mr-2 h-5 w-5' />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
