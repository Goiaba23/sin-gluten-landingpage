"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Star, ArrowRight, Shield, Zap, BookOpen, UtensilsCrossed, Heart, ChevronDown, Menu, X as XIcon, Lock, Truck, CreditCard, Users, ShoppingBag, Sparkles, Plus, Minus, AlertCircle, CheckCircle2, Flame, Leaf, Timer, Award } from "lucide-react";

// ============================================
// CONFIGURAÇÕES
// ============================================

const CHECKOUT_URL = "https://ggcheckout.app/checkout/v4/gyeWcozJqIUWAno9y1tj";

const PRODUCT = {
  price: 14.99,
  originalPrice: 39.99,
  discount: 63
};

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
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
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
  const [timeLeft, setTimeLeft] = useState(10 * 60);

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
  const buyers = [
    { name: "Marina S.", city: "São Paulo" },
    { name: "Carlos M.", city: "Buenos Aires" },
    { name: "Ana Paula R.", city: "Rio de Janeiro" },
    { name: "Miguel Á.", city: "Santiago" },
    { name: "Julia L.", city: "Brasília" },
    { name: "Pedro H.", city: "Córdoba" }
  ];
  
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    };

    const timer1 = setTimeout(showNotification, 5000);
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % buyers.length);
      showNotification();
    }, 25000);

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
                {buyers[current].name} acabou de comprar!
              </p>
              <p className="text-xs text-gray-500">de {buyers[current].city}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
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
    <section className="min-h-screen bg-neutral-50 pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="max-w-6xl mx-auto px-5 relative">
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

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-600 mb-6 leading-relaxed max-w-lg">
              🎯 <strong>Última chance</strong> de garantizar tu pack con 63% de descuento. 
              Después de estos 10 minutos, el precio vuelve a <span className="text-gray-400 line-through text-lg">$39.99</span>.
            </motion.p>

            {/* Price Display */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-3 mb-6">
              <span className="text-5xl font-bold text-gray-900">${PRODUCT.price}</span>
              <span className="text-xl text-gray-400 line-through">${PRODUCT.originalPrice}</span>
              <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-lg">-{PRODUCT.discount}%</span>
            </motion.div>

            {/* Countdown - 10 minutos */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
              <p className="text-red-600 font-bold mb-2">¡Se acabará en solo 10 minutos!</p>
              <div className="flex gap-2">
                <div className="bg-red-600 text-white font-bold text-2xl px-4 py-3 rounded-xl min-w-[80px] text-center">
                  {String(minutes).padStart(2, '0')}<span className="text-sm ml-1 block opacity-70">min</span>
                </div>
                <div className="bg-red-600 text-white font-bold text-2xl px-4 py-3 rounded-xl min-w-[80px] text-center">
                  {String(seconds).padStart(2, '0')}<span className="text-sm ml-1 block opacity-70">seg</span>
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
              className="inline-flex items-center justify-center gap-3 bg-amber-600 text-white text-lg font-bold py-5 px-12 rounded-xl shadow-xl shadow-amber-600/30 hover:bg-amber-700 hover:shadow-2xl transition-all w-full sm:w-auto mb-6"
            >
              <Lock className="w-5 h-5" />
              ¡RESERVAR MI PACK AHORA!
            </motion.a>

            {/* Trust */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Garantía 7 días</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Entrega inmediata</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                <span>+100 clientes atendidos</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Product Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="relative">
              <Image 
                src="/images/ebook-main.jpg" 
                alt="Pack Completo Sin Gluten" 
                width={500} 
                height={500}
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
              
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="absolute -top-4 -right-4 bg-white shadow-lg rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-sm">40 Recetas</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="absolute -bottom-4 -left-4 bg-white shadow-lg rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-sm">+3 Bónus</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-gray-300">
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Beneficios() {
  const beneficios = [
    { icon: UtensilsCrossed, title: "Recetas Fáciles", description: "Paso a paso con ingredientes de supermercado. Sin técnicas complicadas." },
    { icon: Heart, title: "100% Natural", description: "Sin aditivos, sin conservantes. Comida real para tu cuerpo." },
    { icon: Timer, title: "15-30 min", description: "Recetas rápidas para el día a día ocupado." },
    { icon: BookOpen, title: "+200 Páginas", description: "Contenido profundo con consejos y secretos." }
  ];

  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            ¿Por qué este <span className="text-amber-600">pack</span> funciona?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            No es solo un ebook. Es una guía completa para transformar tu forma de comer sin gluten.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {beneficios.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <b.icon className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">{b.title}</h3>
              <p className="text-gray-600">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contenido() {
  const contenidos = [
    { 
      title: "40 Recetas de Panadería", 
      desc: "Panes esponjosos, croissants perfectos, pizzas crujientes, bollos y más. Recetas probadas.", 
      image: "/images/panaderia.jpg",
      pages: "120+",
      details: ["Pan francés", "Croissants", "Pizza sin gluten", "Bollos"]
    },
    { 
      title: "Guía de Ejercicios", 
      desc: "Rutina completa para mantenerte activo. Ejercicios seguros para celíacos.", 
      image: "/images/ejercicios.jpg",
      pages: "40+",
      details: ["Yoga suave", "Estiramientos", "Cardio ligero", "Rutina diaria"]
    },
    { 
      title: "Infusiones que Sanan", 
      desc: "Tés y tisanas medicinales para fortalecer tu sistema digestivo.", 
      image: "/images/infusiones.jpg",
      pages: "30+",
      details: ["Té de manzanilla", "Infusión de menta", "Té laxante", "Té suavizante"]
    },
    { 
      title: "Snacks Saludables", 
      desc: "Lanches rápidos y deliciosos para cuando tenés hambre entre comidas.", 
      image: "/images/snacks.jpg",
      pages: "50+",
      details: ["Barras energéticas", "Galletas", "Frutas", "Mix de frutos secos"]
    }
  ];

  return (
    <section id="contenido" className="py-20 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Todo lo que <span className="text-amber-600">incluye</span> tu pack
          </h2>
          <p className="text-gray-600 text-lg">4 ebooks completos con más de 200 páginas de contenido real y aplicable.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {contenidos.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex gap-6">
                <div className="relative w-28 h-36 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">{item.pages} páginas</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Incluye:</p>
                    <ul className="space-y-1">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-white text-center"
        >
          <p className="text-lg mb-2">Valor si compraras por separado:</p>
          <p className="text-3xl font-bold line-through opacity-70">${PRODUCT.originalPrice * 4}</p>
          <p className="text-4xl font-bold mt-2">Hoy: solo <span className="text-4xl">${PRODUCT.price}</span></p>
          <p className="text-sm mt-2 opacity-80">Ahorras $25 (63% de descuento)</p>
        </motion.div>
      </div>
    </section>
  );
}

function PruebaSocial() {
  const testimonios = [
    { name: "Marina S.", location: "São Paulo, Brasil", text: "Nunca imaginé que podía hacer un pan tan esponjoso. Mi familia lo ama!", rating: 5 },
    { name: "Carlos M.", location: "Buenos Aires, Argentina", text: "Después de años logré hacer croissants perfectos. Esto cambió todo.", rating: 5 },
    { name: "Ana Paula R.", location: "Rio de Janeiro, Brasil", text: "Las recetas son súper fáciles. Los ingredientes los consigo en cualquier lado.", rating: 5 },
    { name: "Miguel Á.", location: "Santiago, Chile", text: "El mejor investimento que hice. Voy a hacer todas las recetas.", rating: 5 }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Lo que dicen <span className="text-amber-600">nuestros clientes</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-50 rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, r) => <Star key={r} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
              </div>
              <p className="text-gray-700 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-amber-700">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </div>
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
      a: "Inmediatamente después del pagamento, recibes un email con el enlace de descarga. Es simple: haces clic, descargas y listo. Tambien puedes acceder desde tu cuenta en nuestra plataforma. El archivo es en formato PDF compatible con cualquier dispositivo."
    },
    { 
      q: "¿Necesito ingredientes especiales o difíciles de encontrar?", 
      a: "No! Todos los ingredientes los conseguís en cualquier supermercado de tu ciudad. Harina de arroz, almidón de mandioca, leche sin lactosa - todo lo básico que ya existe en Argentina, Brasil, Chile, Uruguay y toda Latinoamérica."
    },
    { 
      q: "¿Funciona si nunca cociné antes?", 
      a: "ABSOLUTAMENTE. Las recetas están diseñadas para principiantes totales. Cada paso está detallado con tiempos exactos, temperaturas y consejos. Solo seguí las instrucciones y vas a quedar sorprendido."
    },
    { 
      q: "¿Qué pasa si no me gusta el producto?", 
      a: "Tenés 7 días de garantía TOTAL. Si por cualquier razón no quedás satisfecho, te devuelvo el 100% del dinero. Sin preguntas, sin complicaciones, sin letra pequeña. Tu satisfacción es mi prioridad."
    },
    { 
      q: "¿Es compatible con mi país?", 
      a: "Sí! El ebook está 100% en español y las recetas usan ingredientes que se encuentran en TODO Latinoamérica. Argentina, Uruguay, Chile, Perú, Colombia, México - todos los países. Las medidas son universales."
    },
    { 
      q: "¿Cuánto tiempo toma hacer las recetas?", 
      a: "La mayoría de las recetas están diseñadas para 15-30 minutos. Hay algunas rápidas (10 min) para cuando tenés poco tiempo, y otras más elaboradas (45 min) para quando tenés más tiempo y querés algo especial."
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-2xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Preguntas <span className="text-amber-600">Frecuentes</span></h2>
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
                className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
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
                    <p className="px-5 pb-5 text-gray-600">{faq.a}</p>
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
    <section id="comprar" className="py-20 bg-gray-900">
      <div className="max-w-2xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 text-center"
        >
          {/* Urgency Banner */}
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6">
            <Clock className="w-4 h-4" />
            <span className="font-bold text-sm tracking-wide uppercase">¡Última Chance!</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Oferta de <span className="text-amber-600">Lanzamiento</span>
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            {PRODUCT.discount}% de descuento. <strong>No vuelven a este precio</strong>. Después de 10 minutos, vuelve a $39.99.
          </p>

          {/* Price */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-5xl font-bold text-gray-400 line-through">${PRODUCT.originalPrice}</span>
            <span className="text-6xl font-bold text-amber-600">${PRODUCT.price}</span>
          </div>

          {/* Countdown 10 min */}
          <div className="bg-red-600 text-white font-bold text-3xl py-4 rounded-xl mb-6">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <motion.a
            href={CHECKOUT_URL}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-3 bg-amber-600 text-white text-xl font-bold py-5 px-12 rounded-xl shadow-xl shadow-amber-600/30 hover:bg-amber-700 transition-all w-full"
          >
            <ShoppingBag className="w-6 h-6" />
            ¡MISMO PACK AHORA!
          </motion.a>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Garantía 7 días</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <span>Pago 100% seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              <span>Datos protegidos</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-white">Sin Gluten<span className="text-amber-600">SinDrama</span></span>
        </div>
        <p className="text-sm opacity-60 mb-4">© 2024 Sin Gluten Sin Drama. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">Términos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Contacto</a>
        </div>
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
      <Oferta />
      <PruebaSocial />
      <FAQ />
      <Footer />
    </main>
  );
}