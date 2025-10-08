import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating?: number;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        const formattedProduct = {
          id: data.id,
          title: data.title,
          price: data.price,
          image: data.thumbnail,
          category: data.category,
          description: data.description,
          rating: data.rating
        };
        setProduct(formattedProduct);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
      toast.success('Added to cart!');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Product not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container py-8">
        <Link to="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Card>
            <CardContent className="p-8">
              <div className="aspect-square flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              <Badge className="mb-3 capitalize">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {product.title}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating!)
                            ? 'fill-accent text-accent'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating.toFixed(1)} rating
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ₹{(product.price * 83).toFixed(0)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{(product.price * 83 * 1.3).toFixed(0)}
                </span>
              </div>
              <p className="text-sm text-green-600 font-semibold">Save ₹{(product.price * 83 * 0.3).toFixed(0)} (23% off)</p>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-foreground">{product.description}</p>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 bg-[#FFA41C] hover:bg-[#FF8F00] text-gray-900 font-medium"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
