import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Video } from "lucide-react";
import product1 from "@/assets/2.60gm.jpeg";
import product2 from "@/assets/6.170gm.jpeg";
import product3 from "@/assets/6.200gm.jpeg";
import product4 from "@/assets/8.490.jpeg";
import product5 from "@/assets/8420.jpeg";
import product6 from "@/assets/643gm.jpeg";
const Collection = () => {
  const productImageArray = [
    {
      name: "Mansa 6.170gm Gold Drops Earrings",
      carat: "18K Gold",
      image: product2,
    },
    {
      name: "Mansa 6.20gm Gold Drops Earrings",
      carat: "916 Hallmark",
      image: product3,
    },
    {
      name: "Mansa Pearl Earrings 8.490gm",
      carat: "22K Gold",
      image: product4,
    },
    {
      name: "Mansa 8.60gm Gold Drops Earrings",
      carat: "916 Hallmark",
      image: product5,
    },
    {
      name: "Mansa 6.43gm Gold Drops Earrings",
      carat: "22K Gold",
      image: product6,
    },
    {
      name: "Mansa 2.60gm Gold Drops Earrings",
      carat: "22K Gold",
      image: product1,
    },
  ];

  return (
    <section id='collection' className='py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-6xl font-playfair font-bold text-gold-gradient mb-6'>
            Our Exquisite Collection
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Discover our carefully curated collection of traditional and
            contemporary jewelry pieces, crafted with precision and adorned with
            the finest materials.
          </p>
        </div>

        {/* Collection Grid - Placeholder for now */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {/* Placeholder Cards */}
          {productImageArray.map((product, index) => (
            <Card
              key={index}
              className='card-luxury group cursor-pointer hover:scale-105 transition-luxury'
            >
              <CardContent className='p-0'>
                <div className='aspect-square bg-gradient-to-br from-muted/20 to-muted/40 rounded-t-xl flex items-center justify-center relative overflow-hidden'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                </div>
                <div className='p-6'>
                  <h3 className='font-playfair font-semibold text-xl text-foreground mb-2'>
                    {product.name}
                  </h3>
                  <p className='text-muted-foreground mb-4'>
                    {product.carat} handcrafted jewelry piece
                  </p>
                  <div className='flex justify-between items-center'>
                    <span className='text-primary font-semibold'>
                      Contact for Price
                    </span>
                    <Button variant='royal' size='sm'>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Section for Admin */}
        {localStorage.getItem("sb-yexrnqyqooymelekgegc-auth-token") &&
          JSON.parse(localStorage.getItem("sb-yexrnqyqooymelekgegc-auth-token"))
            .user.id === "37d4154b-7e5e-4c99-9869-ac25d6845b76" && (
            <div className='card-luxury p-8 text-center'>
              <h3 className='text-2xl font-playfair font-semibold text-foreground mb-4'>
                Content Management
              </h3>
              <p className='text-muted-foreground mb-6'>
                Upload product photos and videos to showcase your beautiful
                jewelry collection
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Button variant='luxury'>
                  <Upload className='mr-2 h-5 w-5' />
                  Upload Photos
                </Button>
                <Button variant='royal'>
                  <Video className='mr-2 h-5 w-5' />
                  Upload Videos
                </Button>
              </div>
              <p className='text-sm text-muted-foreground/70 mt-4'>
                * This section will be connected to a content management system
              </p>
            </div>
          )}
      </div>
    </section>
  );
};

export default Collection;
