import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import type { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card
        className="overflow-hidden hover-elevate group cursor-pointer"
        data-testid={`category-card-${category.slug}`}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm md:text-base" data-testid={`category-name-${category.slug}`}>
              {category.name}
            </h3>
            <p className="text-white/70 text-xs mt-0.5">
              {category.productCount} items
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
