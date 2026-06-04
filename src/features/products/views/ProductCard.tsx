import type { Product } from "../models/productType";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full rounded-lg object-cover"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-zinc-600">{product.description}</p>
      <p className="text-xl font-bold">${product.price}</p>
    </div>
  );
}
