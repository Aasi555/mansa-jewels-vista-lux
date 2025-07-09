import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Expand, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  images: string[];
  productName: string;
  className?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  images,
  productName,
  className
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1
  });
  
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  const handleImageClick = (imageUrl: string) => {
    if (!imageErrors.has(imageUrl)) {
      setFullscreenImage(imageUrl);
    }
  };

  // Fallback placeholder component
  const ImagePlaceholder = () => (
    <div className="w-full h-full bg-muted/20 flex items-center justify-center min-h-[300px]">
      <div className="text-center">
        <ImageOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Image not available</p>
      </div>
    </div>
  );

  if (!images || images.length === 0) {
    return (
      <div className={cn("relative", className)}>
        <ImagePlaceholder />
      </div>
    );
  }

  return (
    <>
      <div className={cn("relative group", className)}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-[0_0_100%]"
              >
                <div className="relative aspect-square">
                  {imageErrors.has(image) ? (
                    <ImagePlaceholder />
                  ) : (
                    <>
                      <img
                        src={image}
                        alt={`${productName} - Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                        onError={() => handleImageError(image)}
                        onClick={() => handleImageClick(image)}
                        loading="lazy"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                        onClick={() => handleImageClick(image)}
                      >
                        <Expand className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Fullscreen modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={fullscreenImage}
              alt={productName}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setFullscreenImage(null)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCarousel;