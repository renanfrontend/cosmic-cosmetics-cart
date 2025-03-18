
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-medium text-gray-900">Bem Me Faz</h3>
            <p className="text-sm text-gray-600 max-w-sm">
              Cosméticos de alta qualidade com ingredientes naturais para o cuidado com você e o meio ambiente.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-600 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-600 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="mailto:contato@bemmefaz.com.br" className="text-gray-500 hover:text-brand-600 transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Produtos</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Contato</Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=skincare" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Cuidados Faciais</Link>
              </li>
              <li>
                <Link to="/products?category=cabelo" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Cabelo</Link>
              </li>
              <li>
                <Link to="/products?category=corpo" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Corpo</Link>
              </li>
              <li>
                <Link to="/products?category=proteção-solar" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Proteção Solar</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-brand-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Av. Exemplo, 123 - Centro, São Paulo - SP
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-brand-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">(11) 9999-9999</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-brand-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">contato@bemmefaz.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Bem Me Faz Cosméticos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
