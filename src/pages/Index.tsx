import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => {
        const formattedProducts = data.products.map((p: any) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.thumbnail,
          category: p.category
        }));
        setFeaturedProducts(formattedProducts);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-20 md:py-32">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl animate-slide-in-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20 shadow-lg">
                <Sparkles className="h-4 w-4 text-white animate-pulse" />
                <span className="text-sm font-medium text-white">New Arrivals</span>
              </div>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Discover Your Perfect Style
              </h1>
              <p className="mb-8 text-xl text-white/90 md:text-2xl">
                Shop the latest trends in fashion, electronics, and more. Free shipping on all orders.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" variant="secondary" className="text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl transition-all hover:scale-105">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </section>

        {/* Featured Products */}
        <section className="container py-16 md:py-24">
          <div className="mb-12 text-center animate-fade-in">
            <h2 className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Handpicked items just for you
            </p>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          )}
          <div className="text-center">
            <Link to="/products">
              <Button size="lg">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/50 py-16">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Free Shipping</h3>
                <p className="text-muted-foreground">
                  On all orders over ₹4,150
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Quality Products</h3>
                <p className="text-muted-foreground">
                  Curated selection of premium items
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Quick and reliable shipping
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
