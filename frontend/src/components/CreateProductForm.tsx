import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/lib/api';
import { CATEGORIES } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CreateProductForm() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (response) => {
      setMessage(`Created: ${response.data.name}`);
      setName('');
      setPrice('');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      setMessage('Failed to create product');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const priceNumber = Number(price);

    if (!name.trim()) {
      setMessage('Name is required');
      return;
    }

    if (!price || Number.isNaN(priceNumber) || priceNumber <= 0) {
      setMessage('Enter a valid price');
      return;
    }

    mutation.mutate({
      name: name.trim(),
      category,
      price: priceNumber,
    });
  };

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="text-lg font-semibold">Add Product</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Price</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="99.99"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>

        <div className="flex items-end">
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>

      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
