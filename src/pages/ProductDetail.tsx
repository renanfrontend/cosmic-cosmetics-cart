
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { getProductById, Product, getProductsByCategory } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/ProductCard';

const ProductDetail = () => {
  const { id = '' } = useParams();
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Reset states
    setIsImageLoaded(false);
    setIsLoading(true);
    setIsAdded(false);
    setQuantity(1);
    
    // Simulate data fetching
    const timer = setTimeout(() => {
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products from the same category
        let related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
          
        setRelatedProducts(related);
        setIsLoading(false);
      } else {
        // Product not found, redirect to products page
        navigate('/products');
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-[3/4] bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded w-full animate-pulse mt-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full animate-pulse mt-8"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <Cart />
      
      <div className="pt-24 pb-16 container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/products" 
            className="inline-flex items-center text-gray-600 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar para produtos
          </Link>
        </div>
        
        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product image */}
          <div className="relative">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-auto rounded-lg shadow-sm transition-opacity duration-700 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {/* Tags */}
            <div className="absolute top-4 left-4 flex space-x-2">
              {product.featured && (
                <Badge className="bg-brand-500 hover:bg-brand-500/90 text-white">
                  Destaque
                </Badge>
              )}
              {product.bestSeller && (
                <Badge className="bg-amber-500 hover:bg-amber-500/90 text-white">
                  Mais Vendido
                </Badge>
              )}
            </div>
          </div>
          
          {/* Product info */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-500">{product.brand}</p>
              <h1 className="font-serif text-3xl font-medium text-gray-900 mt-1">
                {product.name}
              </h1>
              <div className="text-2xl font-medium text-brand-700 mt-2">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="font-medium text-gray-900 mb-2">Descrição</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="bg-transparent text-gray-600 border-gray-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <Separator />
            
            {/* Quantity and add to cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Quantidade:</span>
                <div className="flex items-center border rounded">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              <Button 
                className={`w-full py-6 text-lg transition-colors ${
                  isAdded 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-brand-700 hover:bg-brand-800'
                }`}
                onClick={handleAddToCart}
                disabled={isAdded}
              >
                {isAdded ? (
                  <>
                    <Check size={20} className="mr-2" />
                    Adicionado
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2" />
                    Adicionar ao carrinho
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-2xl font-medium text-gray-900 mb-8">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
