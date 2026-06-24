import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { formatDate, formatPrice } from '@/lib/utils';

interface ProductTableProps {
  products: Product[];
}

/**
 * ProductTable — desktop table view of the product list.
 */
export function ProductTable({ products }: ProductTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Added</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium max-w-xs truncate">
              {product.name}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{product.category}</Badge>
            </TableCell>
            <TableCell className="text-right font-mono">
              {formatPrice(product.price)}
            </TableCell>
            <TableCell className="text-muted-foreground text-sm">
              {formatDate(product.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
