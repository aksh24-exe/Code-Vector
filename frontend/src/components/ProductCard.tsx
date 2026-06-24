import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { formatDate, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard — mobile-friendly card view of a single product.
 * Used in responsive grid layout on smaller screens.
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">{product.name}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(product.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
