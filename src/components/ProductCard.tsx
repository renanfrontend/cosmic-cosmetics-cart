
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    
    // Show feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group">
      <Link 
        to={`/product/${product.id}`}
        className="block h-full rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
      >
        {/* Image container with aspect ratio */}
        <div className="relative overflow-hidden rounded-lg bg-gray-100 h-[320px]">
          {/* Image loading skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Product image */}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isImageLoaded 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            } group-hover:scale-105`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Tags */}
          {product.featured && (
            <Badge 
              className="absolute top-3 left-3 bg-brand-500 hover:bg-brand-500/90 text-white"
            >
              Destaque
            </Badge>
          )}

          {product.bestSeller && (
            <Badge 
              className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-500/90 text-white"
            >
              Mais Vendido
            </Badge>
          )}
          
          {/* Add to cart button */}
          <div 
            className="absolute bottom-4 right-4 transform transition-all duration-300"
          >
            <Button
              size="icon"
              className={`rounded-full shadow-lg ${
                isAdded 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-white text-brand-800 hover:bg-brand-50'
              }`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? (
                <Check size={18} className="text-white" />
              ) : (
                <ShoppingCart size={18} />
              )}
            </Button>
          </div>
        </div>
        
        {/* Product info */}
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
          <h3 className="font-medium text-lg text-gray-900 mb-1 font-serif">
            {product.name}
          </h3>
          <div className="text-brand-700 font-medium">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}
