/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Phone
} from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, Category, Brand, CartItem } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [activeBrand, setActiveBrand] = useState<Brand | 'All'>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesBrand = activeBrand === 'All' || product.brand === activeBrand;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [activeCategory, activeBrand, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold tracking-tighter serif uppercase">
              Jozyjay <span className="font-light italic text-white/60">Collection</span>
            </h1>
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
              {['All', 'Bags'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category | 'All')}
                  className={`hover:text-white transition-colors relative py-2 ${activeCategory === cat ? 'text-white' : ''}`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <Search size={16} className="text-white/40" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32 lg:w-48 placeholder:text-white/20"
              />
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.5em] mb-12 text-white/60 font-bold"
          >
            Jozy's Luxury Essentials
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-2 group">
              Shop Collection <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              View Lookbook
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-white/40" />
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-black border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <span className="text-[10px] uppercase tracking-widest text-white/40 whitespace-nowrap">Filter by Brand:</span>
            {['All', 'Chris Bella', 'Chanel'].map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand as Brand | 'All')}
                className={`px-4 py-1 rounded-full text-xs border transition-all whitespace-nowrap ${
                  activeBrand === brand 
                    ? 'bg-white text-black border-white' 
                    : 'border-white/20 text-white/60 hover:border-white/40'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            Showing {filteredProducts.length} Products
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white/5 mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-6 left-6 right-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/90"
                  >
                    Add to Cart
                  </button>
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-black/60 backdrop-blur-md text-[10px] px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                      {product.brand}
                    </span>
                    {product.isNew && (
                      <span className="bg-white text-black text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                        New Arrival
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">{product.category}</p>
                  <h3 className="text-sm font-medium tracking-tight group-hover:text-white/80 transition-colors">{product.name}</h3>
                  <p className="text-sm font-light serif text-white/60">GH₵{product.price.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-white/40 uppercase tracking-widest text-sm">No products found matching your criteria.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setActiveBrand('All'); setSearchQuery(''); }}
              className="mt-6 text-xs underline underline-offset-8 hover:text-white transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/5 border-t border-white/10 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tighter serif uppercase">Jozyjay Collection</h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Defining modern luxury through curated essentials. Experience the finest selection of bags, watches, and slippers.
            </p>
            <div className="flex items-center gap-4">
              <Instagram size={20} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
              <Facebook size={20} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
              <Twitter size={20} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-white">Collections</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="hover:text-white cursor-pointer transition-colors">Ladies Bags</li>
              <li className="hover:text-white cursor-pointer transition-colors">Luxury Watches</li>
              <li className="hover:text-white cursor-pointer transition-colors">Designer Slippers</li>
              <li className="hover:text-white cursor-pointer transition-colors">New Arrivals</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-white">Customer Care</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</li>
              <li className="hover:text-white cursor-pointer transition-colors">Size Guide</li>
              <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <Phone size={14} /> 0249915606
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-white">Newsletter</h4>
            <p className="text-sm text-white/40 mb-6">Join our list for exclusive previews and offers.</p>
            <div className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-white/20"
              />
              <button className="text-white/60 hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/20">
          <p>© 2026 Jozyjay Collection. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-black border-l border-white/10 z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-bold uppercase tracking-widest">Your Bag ({cartCount})</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag size={48} className="text-white/10" />
                    <p className="text-sm text-white/40 uppercase tracking-widest">Your bag is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs underline underline-offset-8 hover:text-white transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-32 bg-white/5 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium leading-tight pr-4">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/20 hover:text-white transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{item.brand}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-white/10 rounded-full">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm serif font-light">GH₵{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4 bg-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest text-white/40">Subtotal</span>
                    <span className="text-lg serif">GH₵{cartTotal.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest text-center">
                    Shipping and taxes calculated at checkout
                  </p>
                  <button className="w-full py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all">
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[100] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-2xl font-bold tracking-tighter serif uppercase">Jozyjay</h1>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-8 text-4xl font-light serif italic">
              {['All', 'Bags'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat as Category | 'All'); setIsMenuOpen(false); }}
                  className="text-left hover:translate-x-4 transition-transform"
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="pt-12 border-t border-white/10 space-y-6">
              <div className="flex items-center gap-6">
                <Instagram size={24} />
                <Facebook size={24} />
                <Twitter size={24} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                © 2026 Jozyjay Collection
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
