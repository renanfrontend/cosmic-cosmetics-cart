
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { products, categories, getProductsByCategory } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let filtered = getProductsByCategory(selectedCategory);
      
      // Apply search filter if search query exists
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }
      
      setDisplayedProducts(filtered);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL without reload
    const newUrl = new URL(window.location.href);
    if (category === 'all') {
      newUrl.searchParams.delete('category');
    } else {
      newUrl.searchParams.set('category', category);
    }
    window.history.pushState({}, '', newUrl);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already being handled by the useEffect
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Cart />
      
      {/* Page header */}
      <div className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-gray-900 mb-4">
              Nossos Produtos
            </h1>
            <p className="text-gray-600">
              Explore nossa linha completa de cosméticos naturais, desenvolvidos com ingredientes selecionados para cuidar de você e do planeta.
            </p>
          </div>
        </div>
      </div>
      
      {/* Filters and Products */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Search bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </form>
          </div>
          
          {/* Category tabs */}
          <div className="mb-10">
            <Tabs 
              defaultValue={selectedCategory} 
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="w-full"
            >
              <div className="flex justify-center">
                <TabsList className="bg-gray-100">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="px-5 py-2 data-[state=active]:bg-brand-600 data-[state=active]:text-white"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {/* Tab contents - we're using only one content area and filtering dynamically */}
              <TabsContent value={selectedCategory} className="mt-8">
                {isLoading ? (
                  // Loading skeletons
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="rounded-lg overflow-hidden">
                        <div className="h-[320px] bg-gray-200 animate-pulse"></div>
                        <div className="p-4 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : displayedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayedProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="animate-fade-up"
                        style={{ 
                          animationDelay: `${displayedProducts.indexOf(product) * 50}ms` 
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">Nenhum produto encontrado</h3>
                    <p className="text-gray-600 mb-6">
                      Não encontramos produtos correspondentes à sua busca.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                    >
                      Limpar filtros
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
