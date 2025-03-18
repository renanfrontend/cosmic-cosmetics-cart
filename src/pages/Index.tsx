
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { getFeaturedProducts, getBestSellerProducts } from '@/data/products';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setFeaturedProducts(getFeaturedProducts());
      setBestSellers(getBestSellerProducts());
      setIsLoaded(true);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero 
        title="Beleza Natural para Sua Pele"
        subtitle="Descubra nossa linha de cosméticos naturais que harmonizam a beleza com o bem-estar."
        ctaText="Explorar Produtos"
        ctaLink="/products"
        imageUrl="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
      />

      {/* About section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-brand-600 text-sm uppercase tracking-wider font-medium mb-2 block">Nossa Missão</span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-gray-900 mb-6">
              Cosméticos que fazem bem para você e para o planeta
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Na Bem Me Faz, acreditamos que beleza e bem-estar caminham juntos. 
              Todos os nossos produtos são desenvolvidos com ingredientes naturais, 
              selecionados cuidadosamente para nutrir sua pele e respeitar o meio ambiente.
            </p>
            <Link to="/about">
              <Button variant="outline" className="group">
                Conheça nossa história
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <span className="text-brand-600 text-sm uppercase tracking-wider font-medium mb-2 block">Destaque</span>
            <h2 className="font-serif text-3xl font-medium text-gray-900">
              Nossos Produtos em Destaque
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoaded ? (
              featuredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="animate-fade-up"
                  style={{ 
                    animationDelay: `${featuredProducts.indexOf(product) * 100}ms` 
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <div className="h-[320px] bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button className="bg-brand-700 hover:bg-brand-800 group">
                Ver todos os produtos
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="text-brand-600 text-sm uppercase tracking-wider font-medium mb-2 block">Qualidade</span>
            <h2 className="font-serif text-3xl font-medium text-gray-900">
              Por que escolher Bem Me Faz?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-2">Ingredientes Naturais</h3>
              <p className="text-gray-600">
                Utilizamos ingredientes naturais e orgânicos, livres de substâncias nocivas para sua saúde.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-2">Cruelty Free</h3>
              <p className="text-gray-600">
                Não testamos em animais. Nossos produtos são éticos e respeitam todas as formas de vida.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-2">Sustentabilidade</h3>
              <p className="text-gray-600">
                Comprometidos com o meio ambiente, utilizamos embalagens recicláveis e processos sustentáveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best sellers section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <span className="text-brand-600 text-sm uppercase tracking-wider font-medium mb-2 block">Popular</span>
            <h2 className="font-serif text-3xl font-medium text-gray-900">
              Mais Vendidos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoaded ? (
              bestSellers.map((product) => (
                <div 
                  key={product.id} 
                  className="animate-fade-up"
                  style={{ 
                    animationDelay: `${bestSellers.indexOf(product) * 100}ms` 
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <div className="h-[280px] bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-20 bg-brand-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-medium text-gray-900 mb-4">
              Inscreva-se em nossa newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Receba novidades, dicas de beleza e ofertas exclusivas diretamente em seu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Seu endereço de email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <Button className="bg-brand-700 hover:bg-brand-800">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
