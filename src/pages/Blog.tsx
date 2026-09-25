import React, { useState } from 'react';

// Interfaces TypeScript pour la typisation des données
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'espresso' | 'panaderia' | 'toast';
  image: string;
  tag?: string;
  isRecommended?: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: string;
}

// Données fictives du menu
const CATEGORIES: Category[] = [
  { id: 'all', label: 'Todos', icon: '' },
  { id: 'espresso', label: 'Espresso Bar', icon: '☕' },
  { id: 'panaderia', label: 'Panadería', icon: '🥐' },
  { id: 'toast', label: 'Toast & Sandwiches', icon: '🥪' },
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Flat White Cavré',
    description: 'Doble shot de espresso arábica con leche cremada textura sedosa.',
    price: 65,
    category: 'espresso',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400',
    tag: 'Origen Veracruz',
    isRecommended: true,
  },
  {
    id: '2',
    name: 'Avocado & Masa Madre',
    description: 'Pan de masa madre tostado, aguacate, aceite de oliva virgen y chili flakes.',
    price: 110,
    category: 'toast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    tag: 'Favorito',
    isRecommended: true,
  },
  {
    id: '3',
    name: 'Tiramisú Artesanal',
    description: 'Receta clásica infusionada con nuestro espresso de la casa.',
    price: 85,
    category: 'panaderia',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400',
    tag: 'Casa',
    isRecommended: true,
  },
  {
    id: '4',
    name: 'Filtrado V60 / Kalita',
    description: 'Notas florales y cítricas. Grano seleccionado de Oaxaca.',
    price: 70,
    category: 'espresso',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '5',
    name: 'Cold Brew Nitro',
    description: 'Extracción en frío durante 18 horas, servido con nitrógeno.',
    price: 75,
    category: 'espresso',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=200',
  },
];

export const MenuDigital: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtrage dynamique selon la recherche et la catégorie
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recommendedItems = MENU_ITEMS.filter((item) => item.isRecommended);

  return (
    <div className="min-h-screen bg-[#fbf8f3] font-sans text-[#2c2a29] pb-12 max-w-md mx-auto shadow-2xl relative border-x border-[#e8e2d9]">
      
      {/* Header style Listening Bar / Hi-Fi */}
      <header className="bg-[#181716] text-[#f4efe6] p-5 sticky top-0 z-30 shadow-lg border-b border-[#332e2b]">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-600 animate-pulse"></span>
              <h1 className="text-xl font-serif tracking-widest uppercase font-bold text-[#f4efe6]">
                CAVRÉ
              </h1>
            </div>
            <p className="text-[10px] tracking-widest text-amber-500/90 font-mono uppercase mt-0.5">
              Listening Café • Narvarte
            </p>
          </div>
          <span className="bg-[#2a2421] text-amber-400 border border-amber-500/30 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
            ON AIR / 09:00 - 21:00
          </span>
        </div>

        {/* Barre de recherche */}
        <div className="relative mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            placeholder="Buscar café, tostadas, postres..."
            className="w-full bg-[#272422] text-[#f4efe6] placeholder-[#8c827a] text-xs rounded-xl py-2.5 pl-9 pr-4 outline-none focus:ring-1 focus:ring-amber-500/80 transition border border-[#3a3532]"
          />
          <svg
            className="w-3.5 h-3.5 text-[#8c827a] absolute left-3 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      {/* Navigation par catégories (Tabs) */}
      <nav className="p-3.5 overflow-x-auto no-scrollbar flex gap-2 border-b border-[#e8e2d9] bg-[#f2ede4] sticky top-[115px] z-20 shadow-sm">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-xs font-medium px-4 py-1.5 rounded-lg whitespace-nowrap transition font-mono uppercase tracking-wider ${
              selectedCategory === cat.id
                ? 'bg-[#181716] text-[#f4efe6] shadow-sm'
                : 'bg-white/80 text-[#59524c] hover:bg-white border border-[#e2dcd3]'
            }`}
          >
            {cat.icon && <span className="mr-1.5">{cat.icon}</span>}
            {cat.label}
          </button>
        ))}
      </nav>

      <main className="p-4 space-y-6">
        
        {/* Banner Atmosphere / Playlist Track */}
        <div className="bg-[#241f1c] text-[#e8e2d9] p-3.5 rounded-2xl border border-[#3b3430] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-500 text-xs font-mono font-bold">
              ♫
            </div>
            <div>
              <p className="text-[10px] text-amber-500 font-mono uppercase tracking-widest">Suena en la sala</p>
              <p className="text-xs font-serif italic text-white/90">Miles Davis — Kind of Blue (1959)</p>
            </div>
          </div>
          <span className="text-[10px] text-[#a39990] font-mono">Hi-Res</span>
        </div>

        {/* Carrousel : Sélection Spéciale */}
        {searchQuery === '' && selectedCategory === 'all' && (
          <section>
            <div className="flex justify-between items-baseline mb-3">
              <h2 className="text-sm font-serif font-bold text-[#181716] tracking-wider uppercase">
                ✦ Selección Especial
              </h2>
              <span className="text-[10px] font-mono text-[#8c827a] uppercase tracking-wider">Desliza &rarr;</span>
            </div>

            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar">
              {recommendedItems.map((item) => (
                <div
                  key={`rec-${item.id}`}
                  className="snap-start min-w-[210px] max-w-[210px] bg-white rounded-2xl overflow-hidden border border-[#e8e2d9] shadow-sm flex flex-col justify-between shrink-0"
                >
                  <div className="relative h-32 w-full bg-[#181716]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
                    {item.tag && (
                      <span className="absolute top-2 left-2 bg-[#181716]/90 text-amber-400 text-[9px] font-mono px-2 py-0.5 rounded border border-amber-500/30 uppercase tracking-widest">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#181716]">{item.name}</h3>
                      <p className="text-xs text-[#6e6660] mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#f2ede4]">
                      <span className="font-mono font-bold text-[#181716] text-xs">${item.price} MXN</span>
                      <button className="bg-[#181716] text-amber-400 hover:bg-[#2c2825] w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Liste générale */}
        <section className="space-y-3">
          <h2 className="text-sm font-serif font-bold text-[#181716] tracking-wider uppercase mb-3">
            {selectedCategory === 'all' ? 'Menú Completo' : CATEGORIES.find(c => c.id === selectedCategory)?.label}
          </h2>

          {filteredItems.length === 0 ? (
            <p className="text-xs text-[#8c827a] font-mono text-center py-8">No se encontraron productos.</p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-2xl border border-[#e8e2d9] shadow-sm flex gap-3.5 items-center"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="font-serif font-bold text-sm text-[#181716] truncate">{item.name}</h3>
                    <span className="font-mono font-bold text-[#181716] text-xs shrink-0">${item.price}</span>
                  </div>
                  <p className="text-xs text-[#6e6660] mt-1 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))
          )}
        </section>

      </main>
    </div>
  );
};

export default MenuDigital;