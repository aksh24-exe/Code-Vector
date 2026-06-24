import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductsPage } from '@/pages/ProductsPage';

/**
 * QueryClient configuration:
 * - staleTime: 60s — data is considered fresh for 60 seconds; no refetch
 *   on window focus during this window. Good for a product catalogue that
 *   doesn't change every second.
 * - retry: 1 — retry failed requests once before surfacing the error.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsPage />
    </QueryClientProvider>
  );
}
