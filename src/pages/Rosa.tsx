import React, { useState } from 'react';

// Interfaces TypeScript para la tipificación de datos
interface MenuItem {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  ingredients?: string[];
  price: number;
  category: 'bebidas' | 'postres' | 'brunch';
  image: string;
  tag?: string;
  isRecommended?: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: string;
}

// Datos de ejemplo del menú
const CATEGORIES: Category[] = [
  { id: 'all', label: 'Todos', icon: '✨' },
  { id: 'bebidas', label: 'Bebidas Rosas', icon: '☕' },
  { id: 'postres', label: 'Repostería', icon: '🍰' },
  { id: 'brunch', label: 'Brunch & Salados', icon: '🥐' },
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Pink Rose Latte',
    description: 'Espresso con extracción de remolacha, leche cremada y polvo de rosas comestibles.',
    longDescription: 'Nuestra bebida insignia preparada con un shot de espresso de especialidad, infusión de remolacha natural para lograr su tono característico y leche al vapor con textura aterciopelada. Coronado con pétalos de rosa orgánicos comestibles.',
    ingredients: ['Espresso de especialidad', 'Leche cremada', 'Infusión de remolacha', 'Pétalos de rosa orgánicos'],
    price: 75,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    tag: 'Especialidad',
    isRecommended: true,
  },
  {
    id: '2',
    name: 'Macarons de Frambuesa',
    description: 'Tres piezas con relleno cremoso de frambuesa orgánica y toque de vainilla.',
    longDescription: 'Clásicos macarons franceses elaborados artesanalmente con harina de almendra fina, crujientes por fuera y suaves por dentro, rellenos de ganache de frambuesa madura y vainilla de Papantla.',
    ingredients: ['Harina de almendras', 'Frambuesa orgánica', 'Ganache de chocolate blanco', 'Vainilla natural'],
    price: 90,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600',
    tag: 'Popular',
    isRecommended: true,
  },
  {
    id: '3',
    name: 'Toast Encantadora',
    description: 'Pan brioche tostado con mermelada de frutos rojos, fresas frescas y queso mascarpone.',
    longDescription: 'Una rebanada gruesa de pan brioche artesanal dorado a la mantequilla, cubierta con una capa generosa de queso mascarpone batido, frutos rojos de temporada y un hilo de miel rosada.',
    ingredients: ['Pan brioche artesanal', 'Queso mascarpone', 'Fresas y zarzamoras', 'Miel pura de abeja'],
    price: 115,
    category: 'brunch',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    tag: 'Chef',
    isRecommended: true,
  },
  {
    id: '4',
    name: 'Bubble Tea de Fresa',
    description: 'Té negro con leche de almendras, perlas de tapioca y sirope artesanal de fresa.',
    longDescription: 'Refrescante infusión de té negro mezclado con leche de almendras cremosa, perlas de tapioca suavemente endulzadas y sirope preparado en casa con fresas naturales.',
    ingredients: ['Té negro', 'Leche de almendras', 'Tapioca artesanal', 'Sirope de fresa'],
    price: 85,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '5',
    name: 'Cheesecake de Rosa',
    description: 'Base de galleta de mantequilla con infusión sutil de agua de rosas y frambuesas.',
    longDescription: 'Pastel de queso estilo Nueva York con una delicada infusión de agua de rosas orgánicas sobre una base crocante de galleta de mantequilla, decorado con mermelada brillante de frambuesa.',
    ingredients: ['Queso crema', 'Galleta de mantequilla', 'Esencia de rosa', 'Mermelada de frambuesa'],
    price: 95,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600',
  },
];

export const MenuRoseEncantadora: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Estado para el platillo seleccionado (Modal)
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recommendedItems = MENU_ITEMS.filter((item) => item.isRecommended);

  return (
    <div className="min-h-screen bg-[#fff0f4] font-sans text-[#4a2e35] pb-12 max-w-md mx-auto shadow-2xl relative border-x border-[#f4c2c2]">
      
      {/* Header */}
      <header className="bg-[#9e3b56] text-[#fff0f4] p-5 sticky top-0 z-30 shadow-lg border-b border-[#822d43]">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f48fb1] animate-pulse"></span>
              <h1 className="text-xl font-serif tracking-wide font-bold text-white">
                ROSE ENCANTADORA
              </h1>
            </div>
            <p className="text-[10px] tracking-widest text-[#f8bbd0] font-mono uppercase mt-0.5">
              Café & Repostería
            </p>
          </div>
          <span className="bg-[#78243a] text-[#f48fb1] border border-[#f48fb1]/40 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
            ABIERTO
          </span>
        </div>

        {/* Buscador */}
        <div className="relative mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            placeholder="Buscar postres, bebidas, brunch..."
            className="w-full bg-[#78243a] text-white placeholder-[#f8bbd0]/70 text-xs rounded-xl py-2.5 pl-9 pr-4 outline-none focus:ring-1 focus:ring-[#f48fb1] transition border border-[#822d43]"
          />
          <svg
            className="w-3.5 h-3.5 text-[#f8bbd0] absolute left-3 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      {/* Categorías */}
      <nav className="p-3.5 overflow-x-auto no-scrollbar flex gap-2 border-b border-[#f4c2c2] bg-[#fce4ec] sticky top-[115px] z-20 shadow-sm">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-xs font-medium px-4 py-1.5 rounded-xl whitespace-nowrap transition tracking-wide ${
              selectedCategory === cat.id
                ? 'bg-[#9e3b56] text-white shadow-sm font-semibold'
                : 'bg-white/80 text-[#78243a] hover:bg-white border border-[#f4c2c2]'
            }`}
          >
            {cat.icon && <span className="mr-1.5">{cat.icon}</span>}
            {cat.label}
          </button>
        ))}
      </nav>

      <main className="p-4 space-y-6">
        
        {/* Banner */}
        <div className="bg-[#f8bbd0]/40 text-[#5c1d2e] p-3.5 rounded-2xl border border-[#f48fb1]/50 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#9e3b56] text-white flex items-center justify-center text-sm font-bold shadow-xs">
              🌹
            </div>
            <div>
              <p className="text-[10px] text-[#822d43] font-mono uppercase tracking-widest font-semibold">Momento dulce</p>
              <p className="text-xs font-serif italic text-[#4a2e35]">"Un toque de rosa para alegrar tu día"</p>
            </div>
          </div>
          <span className="text-[10px] text-[#9e3b56] font-mono font-bold">♥</span>
        </div>

        {/* Carrusel: Recomendados */}
        {searchQuery === '' && selectedCategory === 'all' && (
          <section>
            <div className="flex justify-between items-baseline mb-3">
              <h2 className="text-sm font-serif font-bold text-[#78243a] tracking-wider uppercase">
                🌸 Favoritos de la Casa
              </h2>
              <span className="text-[10px] font-mono text-[#a8526a] uppercase tracking-wider">Desliza &rarr;</span>
            </div>

            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar">
              {recommendedItems.map((item) => (
                <div
                  key={`rec-${item.id}`}
                  onClick={() => setActiveItem(item)}
                  className="snap-start min-w-[210px] max-w-[210px] bg-white rounded-2xl overflow-hidden border border-[#f4c2c2] shadow-sm flex flex-col justify-between shrink-0 cursor-pointer hover:border-[#9e3b56] transition-all hover:shadow-md active:scale-[0.98]"
                >
                  <div className="relative h-32 w-full bg-[#fce4ec]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    {item.tag && (
                      <span className="absolute top-2 left-2 bg-[#9e3b56] text-white text-[9px] font-medium px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#4a2e35]">{item.name}</h3>
                      <p className="text-xs text-[#78545e] mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#fce4ec]">
                      <span className="font-bold text-[#9e3b56] text-xs">${item.price} MXN</span>
                      <span className="text-[10px] bg-[#fce4ec] text-[#9e3b56] px-2 py-1 rounded-lg font-medium">Ver detalles</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lista General */}
        <section className="space-y-3">
          <h2 className="text-sm font-serif font-bold text-[#78243a] tracking-wider uppercase mb-3">
            {selectedCategory === 'all' ? 'Menú Completo' : CATEGORIES.find(c => c.id === selectedCategory)?.label}
          </h2>

          {filteredItems.length === 0 ? (
            <p className="text-xs text-[#a8526a] font-mono text-center py-8">No se encontraron productos.</p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="bg-white p-3 rounded-2xl border border-[#f4c2c2] shadow-sm flex gap-3.5 items-center cursor-pointer hover:border-[#9e3b56] transition-all hover:shadow-md active:scale-[0.99]"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="font-serif font-bold text-sm text-[#4a2e35] truncate">{item.name}</h3>
                    <span className="font-bold text-[#9e3b56] text-xs shrink-0">${item.price}</span>
                  </div>
                  <p className="text-xs text-[#78545e] mt-1 line-clamp-2">{item.description}</p>
                  <p className="text-[10px] text-[#9e3b56] font-medium mt-1.5">Toca para ver foto e ingredientes →</p>
                </div>
              </div>
            ))
          )}
        </section>

      </main>

      {/* Modal / Vista Detallada del Platillo */}
      {activeItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-slide-up">
            
            {/* Imagen Grande con Botón Cerrar */}
            <div className="relative h-64 w-full bg-[#fce4ec] shrink-0">
              <img src={activeItem.image} alt={activeItem.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm backdrop-blur-md hover:bg-black/70 transition"
              >
                ✕
              </button>
              {activeItem.tag && (
                <span className="absolute bottom-4 left-4 bg-[#9e3b56] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {activeItem.tag}
                </span>
              )}
            </div>

            {/* Contenido Detallado */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-serif font-bold text-[#4a2e35]">{activeItem.name}</h2>
                <span className="text-lg font-bold text-[#9e3b56]">${activeItem.price} MXN</span>
              </div>

              <p className="text-xs text-[#61424a] leading-relaxed">
                {activeItem.longDescription || activeItem.description}
              </p>

              {/* Lista de Ingredientes */}
              {activeItem.ingredients && activeItem.ingredients.length > 0 && (
                <div className="pt-2 border-t border-[#fce4ec]">
                  <h4 className="text-xs font-bold text-[#78243a] uppercase tracking-wider mb-2">Ingredientes:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeItem.ingredients.map((ing, i) => (
                      <span key={i} className="bg-[#fce4ec] text-[#9e3b56] text-[11px] px-2.5 py-1 rounded-lg font-medium">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón de Cierre */}
              <button
                onClick={() => setActiveItem(null)}
                className="w-full bg-[#9e3b56] text-white font-medium py-3 rounded-2xl hover:bg-[#822d43] transition mt-4 text-xs font-mono uppercase tracking-wider"
              >
                Cerrar vista
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MenuRoseEncantadora;