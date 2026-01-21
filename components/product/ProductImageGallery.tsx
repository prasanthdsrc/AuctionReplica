'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4 border">
        <img
          src={images[selectedImageIndex]}
          alt={title}
          className="w-full h-full object-contain p-4"
          data-testid="product-main-image"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              data-testid="prev-image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              data-testid="next-image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all bg-white ${
              index === selectedImageIndex
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            }`}
            data-testid={`thumbnail-${index}`}
          >
            <img src={img} alt="" className="w-full h-full object-contain p-1" />
          </button>
        ))}
      </div>
    </div>
  );
}
