import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Collection from '@/components/Collection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Collection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
