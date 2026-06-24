import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductTable } from '@/components/ProductTable';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchInput } from '@/components/SearchInput';
import { CreateProductForm } from '@/components/CreateProductForm';
import { LoadMoreButton } from '@/components/LoadMoreButton';
import { Loader } from '@/components/Loader';
import { EmptyState } from '@/components/EmptyState';
import type { Product } from '@/types';

/**
 * ProductsPage — browse, search, filter, create, and load more products.
 */
export function ProductsPage() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({
    category,
    search: search.trim() || undefined,
    limit: 20,
  });

  // Flatten all pages into a single product list
  const allProducts: Product[] = data?.pages.flatMap((page) => page.data) ?? [];
  const totalLoaded = allProducts.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container py-6">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">
            Browse our catalogue of 200,000 products
          </p>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <CreateProductForm />

        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <CategoryFilter value={category} onChange={setCategory} />
            <SearchInput value={search} onChange={setSearch} />
          </div>
          {!isLoading && (
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{totalLoaded.toLocaleString()}</span> products
              {category && <> in <span className="font-medium">{category}</span></>}
              {search.trim() && <> matching <span className="font-medium">&quot;{search.trim()}&quot;</span></>}
            </p>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-destructive font-medium">Failed to load products</p>
            <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
          </div>
        ) : allProducts.length === 0 ? (
          <EmptyState category={category} search={search.trim() || undefined} />
        ) : (
          <>
            {/* Desktop: table */}
            <div className="hidden md:block rounded-lg border">
              <ProductTable products={allProducts} />
            </div>

            {/* Mobile: cards */}
            <div className="grid gap-3 md:hidden">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <LoadMoreButton
              onClick={() => fetchNextPage()}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={!!hasNextPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
