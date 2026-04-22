"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Star, ArrowRight, Shield, Zap, BookOpen, UtensilsCrossed, Heart, ChevronDown, Menu, X as XIcon, Lock, Truck, CreditCard, Users, ShoppingBag, Sparkles, Plus, Minus, AlertCircle, CheckCircle2 } from "lucide-react";

// ============================================
// CONFIGURAÇÕES
// ============================================

const CHECKOUT_URL = "https://ggcheckout.app/checkout/v4/gyeWcozJqIUWAno9y1tj";

const PRODUCT = {
  price: 14.99,
  originalPrice: 39.99,
  discount: 63
};

// Imagensdos ebooks (use URLs do GitHub após upload)
const IMAGES = {
  main: "https://raw.githubusercontent.com/Goiaba23/sin-gluten-landingpage/main/images/ebook-main.jpg",
  panaderia: "https://raw.githubusercontent.com/Goiaba23/sin-gluten-landingpage/main/images/panaderia.jpg",
  ejercicios: "https://raw.githubusercontent.com/Goiaba23/sin-gluten-landingpage/main/images/ejercicios.jpg",
  infusiones: "https://raw.githubusercontent.com/Goiaba23/sin-gluten-landingpage/main/images/infusiones.jpg",
  snacks: "https://raw.githubusercontent.com/Goiaba23/sin-gluten-landingpage/main/images/snacks.jpg"
};

// Nomes de pessoas que compraram (notificações em tempo real)
const RECENT_BUYERS = [
  { name: "Marina S.", city: "São Paulo" },
  { name: "Carlos M.", city: "Buenos Aires" },
  { name: "Ana Paula R.", city: "Rio de Janeiro" },
  { name: "Miguel Á.", city: "Santiago" },
  { name: "Julia L.", city: "Brasília" },
  { name: "Pedro H.", city: "Córdoba" },
  { name: "Camila B.", city: "Lima" },
  { name: "Roberto D.", city: "Montevideo" }
];

// ============================================
// COMPONENTES
// ============================================

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-amber-600 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            Sin Gluten<span className="text-amber-600">SinDrama</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
            Beneficios
          </button>
          <button onClick={() => document.getElementById('contenido')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
            Contenido
          </button>
          <motion.a
            href={CHECKOUT_URL}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gray-900 text-white text-sm font-bold py-2.5 px-6 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Comprar Ahora
          </motion.a>
        </nav>

        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <XIcon className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
              <div className="flex flex-col p-4 gap-3">
                <button onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 font-medium py-2 text-left">Beneficios</button>
                <button onClick={() => document.getElementById('contenido')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 font-medium py-2 text-left">Contenido</button>
                <a href={CHECKOUT_URL} className="bg-gray-900 text-white font-bold py-3 px-6 rounded-lg text-center">Comprar Ahora</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

// Popup de Urgência - 10 minutos
function UrgencyPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutos em segundos

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) return prev - 1;
        setIsVisible(false);
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isVisible]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsVisible(false)} />
          
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 text-center"
          >
            <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Clock className="w-8 h-8 text-red-600" />
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡<span className="text-red-600">¡Últimos 10 minutos!</span>
            </h2>
            
            <p className="text-gray-600 mb-4">
              Tu descuento del {PRODUCT.discount}% está por vencer. ¿No quieres perder esta oportunidad?
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-4xl font-bold text-gray-400 line-through text-lg">${PRODUCT.originalPrice}</span>
              <span className="text-5xl font-bold text-red-600">${PRODUCT.price}</span>
            </div>

            <div className="bg-red-600 text-white font-bold text-2xl py-3 rounded-xl mb-6">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            <motion.a
              href={CHECKOUT_URL}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsVisible(false)}
              className="block w-full bg-amber-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:bg-amber-700 transition-all"
            >
              ¡APROVECHAR AHORA!
            </motion.a>

            <button onClick={() => setIsVisible(false)} className="w-full text-gray-500 text-sm mt-4 hover:text-gray-700">
              No gracias, entiendo el riesgo
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Notificação de compra recente
function RecentBuyers() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    };

    // Primeira notificação após 5 segundos
    const timer1 = setTimeout(showNotification, 5000);
    
    // Notificações a cada 30 segundos
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % RECENT_BUYERS.length);
      showNotification();
    }, 30000);

    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          className="fixed bottom-6 left-6 z-50 bg-white rounded-xl shadow-2xl p-4 max-w-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {RECENT_BUYERS[current].name} acabou de comprar!
              </p>
              <p className="text-xs text-gray-500">São {RECENT_BUYERS[current].city}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="min-h-screen bg-neutral-50 pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="max-w-5xl mx-auto px-5 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Urgency Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-red-700 font-semibold text-xs tracking-wide uppercase">
                Solo 10 minutos de oferta
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5 tracking-tight">
              Panadería Sin Gluten<span className="text-amber-600"> Perfecta</span> en 40 Recetas
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base text-gray-600 mb-6 leading-relaxed max-w-md">
              🎯 <strong>Última chance</strong> de garantir tu pack con 63% de descuento. 
              Después de estos 10 minutos, el precio vuelve a <span className="text-gray-400 line-through">$39.99</span>.
            </motion.p>

            {/* Price Display */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">${PRODUCT.price}</span>
              <span className="text-lg text-gray-400 line-through">${PRODUCT.originalPrice}</span>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{PRODUCT.discount}%</span>
            </motion.div>

            {/* Countdown - 10 minutos */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 mb-6 text-sm">
              <span className="text-red-600 font-bold">¡Se acabará en:</span>
              <div className="flex gap-1.5">
                <div className="bg-red-600 text-white font-bold text-lg px-3 py-2 rounded-lg min-w-[60px] text-center">
                  {String(minutes).padStart(2, '0')}<span className="text-xs ml-1 opacity-70">min</span>
                </div>
                <div className="bg-red-600 text-white font-bold text-lg px-3 py-2 rounded-lg min-w-[60px] text-center">
                  {String(seconds).padStart(2, '0')}<span className="text-xs ml-1 opacity-70">seg</span>
                </div>
              </div>
            </motion.div>

            {/* Primary CTA */}
            <motion.a
              href={CHECKOUT_URL}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-xl shadow-amber-600/30 hover:bg-amber-700 hover:shadow-2xl transition-all w-full sm:w-auto"
            >
              <Lock className="w-5 h-5" />
              ¡RESERVAR MI PACK AHORA!
            </motion.a>

            {/* Trust */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap items-center gap-4 mt-5 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Garantía 7 días</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Entrega inmediata</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-green-600" />
                <span>+100 clientes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Product Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="aspect-square max-w-sm mx-auto bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-3xl shadow-2xl flex items-center justify-center p-10">
              <div className="text-center text-white">
                <div className="text-7xl mb-3">🥐</div>
                <div className="text-2xl font-bold tracking-tight">Pack Completo</div>
                <div className="text-lg opacity-90">Sin Gluten</div>
                <div className="text-sm opacity-75 mt-2">40 Recetas + 3 Bónus</div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="absolute -top-3 -right-3 bg-white shadow-lg rounded-xl py-2 px-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-sm">40 Recetas</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="absolute -bottom-3 -left-3 bg-white shadow-lg rounded-xl py-2 px-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-sm">+3 Bónus</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-gray-300">
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Beneficios() {
  const beneficios = [
    { icon: UtensilsCrossed, title: "Recetas Fáciles", description: "Paso a paso. Ingredientes de supermercado." },
    { icon: Heart, title: "100% Natural", description: "Sin aditivos. Comida real." },
    { icon: Clock, title: "15-30 min", description: "Listo rápido para el día a día." },
    { icon: BookOpen, title: "+200 Páginas", description: "Contenido profundo y real." }
  ];

  return (
    <section id="beneficios" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            ¿Por qué este <span className="text-amber-600">pack</span> funciona?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            No es solo un ebook. Es una guía completa para tu nueva forma de comer sin gluten.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {beneficios.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-neutral-50 rounded-xl p-5 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <b.icon className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
              <p className="text-gray-500 text-sm">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contenido() {
  const contenidos = [
    { title: "40 Recetas de Panadería", desc: "Panes esponjosos, croissants, pizzas", emoji: "🥐", pages: "120+" },
    { title: "Guía de Ejercicios", desc: "Rutina completa para celíacos", emoji: "🧘", pages: "40+" },
    { title: "Infusiones que Sanan", desc: "Tés y tisanas medicinales", emoji: "🍵", pages: "30+" },
    { title: "Snacks Saludables", desc: "Lanches rápidos y délicieuse", emoji: "🥗", pages: "50+" }
  ];

  return (
    <section id="contenido" className="py-16 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Todo lo que <span className="text-amber-600">incluye</span> tu pack
          </h2>
          <p className="text-gray-600">4 ebooks completos con más de 200 páginas de contenido real.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {contenidos.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{item.emoji}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-0.5">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
                <span className="text-amber-600 text-sm font-medium">{item.pages} páginas</span>
              </div>
              <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white text-center"
        >
          <p className="text-base mb-1">Valor individual:</p>
          <p className="text-2xl font-bold line-through opacity-70">${PRODUCT.originalPrice * 4}</p>
          <p className="text-3xl font-bold mt-1">Hoy: solo ${PRODUCT.price}</p>
        </motion.div>
      </div>
    </section>
  );
}

function PruebaSocial() {
  const testimonios = [
    { name: "Marina S.", text: "Nunca imaginé que podía hacer un pan tan esponjoso. Mi familia lo ama!", rating: 5 },
    { name: "Carlos M.", text: "Después de años logré hacer croissants perfectos. Esto cambió todo.", rating: 5 },
    { name: "Ana Paula R.", text: "Las recetas son súper fáciles. Los Ingredients consigo en cualquier lado.", rating: 5 },
    { name: "Miguel Á.", text: "El mejor investimento que hice. Voy a hacer todas las recetas.", rating: 5 }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Lo que dicen <span className="text-amber-600">nuestros clientes</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-50 rounded-xl p-5"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, r) => <Star key={r} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
              </div>
              <p className="text-gray-700 text-sm mb-3">"{t.text}"</p>
              <p className="font-semibold text-gray-900 text-sm">- {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { 
      q: "¿Cómo recibo el producto?", 
      a: "Inmediatamente después del pagamento, recibes un email con el enlace de descarga. Es simples: haces clic, descargas y listo. Tambien puedes acceder desde tu cuenta en nuestra plataforma."
    },
    { 
      q: "¿Necesito ingredientes especiales o difíciles de encontrar?", 
      a: "No! Todos los ingredientes los conseguis en cualquier supermercado de tu ciudad. Harina de arroz, almidón de mandioca, leche sin lactose - todo lo básico que ya existe en Argentina."
    },
    { 
      q: "¿Funciona si nunca cociné antes?", 
      a: "ABSOLUTAMENTE. Las recetas están diseñadas para principiantes. Cada paso está detallado con tiempos, temperaturas y consejos. Solo seguí las instrucciones."
    },
    { 
      q: "¿Qué pasa si no me gusta el producto?", 
      a: "Tienes 7 días de garantía. Si por cualquier razón no quedás satisfecho, te devuelvo el 100% del dinheiro. Sin perguntas, sin complicaciones."
    },
    { 
      q: "¿Es compatible con mi país?", 
      a: "Sí! El ebook está en español y las recetas usan ingredientes que se encuentran en TODO Latinoamérica. Argentina, Uruguay, Chile, Perú, Colombia - todos los países."
    },
    { 
      q: "¿Cuánto tiempo toma hacer las recetas?", 
      a: "La mayoría de las recetas están diseñadas para 15-30 minutos. Hay algunas más rápidas (10 min) y otras más elaboradas (45 min) para quando tenés más tiempo."
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-2xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Preguntas <span className="text-amber-600">Frecuentes</span></h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                {openIndex === i ? (
                  <Minus className="w-5 h-5 text-amber-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-gray-600 text-sm">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Oferta() {
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <section id="comprar" className="py-16 bg-gray-900">
      <div className="max-w-2xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-10 text-center"
        >
          {/* Urgency */}
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6">
            <Clock className="w-4 h-4" />
            <span className="font-bold text-sm tracking-wide uppercase">¡Última Chance!</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Oferta de <span className="text-amber-600">Lanzamiento</span>
          </h2>

          <p className="text-gray-600 mb-6">
            {PRODUCT.discount}% de descuento. No vuelven a este precio.
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-400 line-through">${PRODUCT.originalPrice}</span>
            <span className="text-5xl font-bold text-amber-600">${PRODUCT.price}</span>
          </div>

          {/* Countdown 10 min */}
          <div className="flex items-center justify-center gap-2 mb-6 text-sm">
            <Clock className="w-4 h-4 text-red-600" />
            <span className="text-red-600 font-bold">Expires en:</span>
            <div className="bg-red-600 text-white font-bold text-lg px-3 py-2 rounded-lg">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href={CHECKOUT_URL}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-xl shadow-amber-600/30 hover:bg-amber-700 transition-all w-full"
          >
            <ShoppingBag className="w-5 h-5" />
            ¡MISMO PACK AHORA!
          </motion.a>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Garantía 7 días</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-green-600" />
              <span>Pago seguro</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white">Sin Gluten<span className="text-amber-600">SinDrama</span></span>
        </div>
        <p className="text-xs opacity-60">© 2024 Sin Gluten Sin Drama. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function LandingPage() {
  return (
    <main>
      <Header />
      <UrgencyPopup />
      <RecentBuyers />
      <Hero />
      <Beneficios />
      <Contenido />
      <PruebaSocial />
      <FAQ />
      <Oferta />
      <Footer />
    </main>
  );
}