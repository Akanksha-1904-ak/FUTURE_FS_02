import { ShoppingCart, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const isNew = index < 3;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    toast.success('Added to cart!');
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group h-full overflow-hidden border transition-all duration-200 hover:shadow-lg animate-fade-in bg-card">
        <CardContent className="p-3">
          <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-4 transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div className="mt-3 space-y-1">
            <h3 className="text-sm text-foreground line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>
            {product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex items-center bg-green-700 text-white px-2 py-0.5 rounded text-xs font-semibold">
                  {product.rating.rate.toFixed(1)} <Star className="h-3 w-3 fill-white ml-1" />
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.rating.count.toLocaleString()})
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">
                ₹{(product.price * 83).toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                ₹{(product.price * 83 * 1.3).toFixed(0)}
              </p>
            </div>
            <p className="text-xs text-green-600 font-semibold">Save ₹{(product.price * 83 * 0.3).toFixed(0)}</p>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium transition-colors"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
