
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Cart() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    isCartOpen, 
    closeCart,
    subtotal
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={closeCart}
      />
      
      {/* Cart drawer */}
      <div className="cart-drawer animate-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 text-brand-700 mr-2" />
              <h2 className="font-serif text-xl font-medium">Carrinho</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={closeCart}
              className="text-gray-500"
            >
              <X size={18} />
            </Button>
          </div>
          
          {/* Cart items */}
          <div className="flex-1 overflow-auto p-5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    closeCart();
                  }}
                >
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex border-b pb-5">
                    {/* Product image */}
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product details */}
                    <div className="flex-1 ml-4">
                      <h4 className="text-sm font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{item.product.brand}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="ml-4 font-medium">
                      {(item.product.price * item.quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-5 space-y-4">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    {subtotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Frete</span>
                  <span className="font-medium">A calcular</span>
                </div>
                <Separator />
                <div className="flex justify-between pt-2">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold text-brand-800">
                    {subtotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-2">
                <Button className="w-full bg-brand-700 hover:bg-brand-800">
                  Finalizar Compra
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={closeCart}
                >
                  Continuar Comprando
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
