"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Star, ArrowRight, Shield, Zap, BookOpen, UtensilsCrossed, Heart, ChevronDown, Menu, X as XIcon, Lock, Truck, CreditCard, Users, ShoppingBag, Sparkles } from "lucide-react";

// ============================================
// CONFIGURAÇÕES - ALTERE AQUI!
// ============================================

// URL do seu checkout GGC
const CHECKOUT_URL = "https://ggcheckout.app/checkout/v4/gyeWcozJqIUWAno9y1tj";

const PRODUCT = {
  name: "Pack Completo Sin Gluten",
  price: 14.99,
  originalPrice: 49.99,
  currency: "USD",
  discount: 70
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

function Hero() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen bg-neutral-50 pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="max-w-5xl mx-auto px-5 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* URGENCY CTA - 2026 Best Practice */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-red-700 font-semibold text-xs tracking-wide uppercase">
                Oferta por tiempo limitado
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5 tracking-tight">
              Panadería Sin Gluten<span className="text-amber-600"> Perfecta</span> en 40 Recetas
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base text-gray-600 mb-6 leading-relaxed max-w-md">
              Dejá de buscar recetas. Este pack tiene todo: panes esponjosos, croissants, pizzas y más. 4 ebooks con +200 páginas reales.
            </motion.p>

            {/* Price Display - Social Proof Value */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">${PRODUCT.price}</span>
              <span className="text-lg text-gray-400 line-through">${PRODUCT.originalPrice}</span>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{PRODUCT.discount}%</span>
            </motion.div>

            {/* Countdown - alta conversão */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 mb-6 text-sm">
              <span className="text-red-600 font-semibold">Termina en:</span>
              <div className="flex gap-1.5">
                {[
                  { val: timeLeft.hours, label: 'hs' },
                  { val: timeLeft.minutes, label: 'min' },
                  { val: timeLeft.seconds, label: 'seg' }
                ].map((item, i) => (
                  <div key={i} className="bg-red-600 text-white font-bold text-sm px-2.5 py-1.5 rounded-md min-w-[48px] text-center">
                    {String(item.val).padStart(2, '0')}<span className="text-xs ml-0.5 opacity-70">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* PRIMARY CTA - Ownership + Urgency */}
            <motion.a
              href={CHECKOUT_URL}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-base font-bold py-4 px-8 rounded-xl shadow-xl hover:bg-gray-800 hover:shadow-2xl transition-all w-full sm:w-auto"
            >
              <Lock className="w-4 h-4" />
              ¡RESERVAR MI PACK AHORA!
            </motion.a>

            {/* Trust Signals - 2026 Best Practice */}
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

            {/* Floating Badges */}
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
    { title: "40 Recetas de Panadería", desc: "Panes, croissants, pizzas", emoji: "🥐", pages: "120+" },
    { title: "Guía de Ejercicios", desc: "Rutina completa", emoji: "🧘", pages: "40+" },
    { title: "Infusiones que Sanan", desc: "Tés medicinales", emoji: "🍵", pages: "30+" },
    { title: "Snacks Saludables", desc: "Lanches rápidos", emoji: "🥗", pages: "50+" }
  ];

  return (
    <section id="contenido" className="py-16 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Todo lo que <span className="text-amber-600">incluye</span>
          </h2>
          <p className="text-gray-600">4 ebooks completos con más de 200 páginas de contenido.</p>
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
    { name: "María G.", text: "Nunca imaginé que podía hacer un pan tan esponjoso. ¡Mi familia lo ama!", rating: 5 },
    { name: "Carlos M.", text: "Después de años logré hacer croissants perfectos. Cambió todo.", rating: 5 },
    { name: "Ana R.", text: "Las recetas son súper fáciles. Ingredientes consigo en cualquier lado.", rating: 5 }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Lo que dicen <span className="text-amber-600">nuestros clientes</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
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

function Oferta() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="comprar" className="py-16 bg-gray-900">
      <div className="max-w-2xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-10 text-center"
        >
          {/* Urgency Banner - 2026 Best Practice */}
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6">
            <Clock className="w-4 h-4" />
            <span className="font-bold text-sm tracking-wide uppercase">¡Última Chance!</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Oferta de <span className="text-amber-600">Lanzamiento</span>
          </h2>

          <p className="text-gray-600 mb-6">
            {PRODUCT.discount}% de descuento. No volver a este precio.
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-400 line-through">${PRODUCT.originalPrice}</span>
            <span className="text-5xl font-bold text-amber-600">${PRODUCT.price}</span>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-2 mb-6 text-sm">
            <Clock className="w-4 h-4 text-red-600" />
            <span className="text-red-600 font-semibold">Expires en:</span>
            {[
              { val: timeLeft.hours, label: 'hs' },
              { val: timeLeft.minutes, label: 'min' },
              { val: timeLeft.seconds, label: 'seg' }
            ].map((item, i) => (
              <div key={i} className="bg-red-600 text-white font-bold text-sm px-2.5 py-1.5 rounded-md min-w-[42px]">
                {String(item.val).padStart(2, '0')}<span className="text-xs ml-0.5">{item.label}</span>
              </div>
            ))}
          </div>

          {/* PRIMARY CTA - Best 2026 CTA with ownership */}
          <motion.a
            href={CHECKOUT_URL}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-xl hover:bg-gray-800 transition-all w-full"
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

function FAQ() {
  const faqs = [
    { q: "¿Cómo recibo el producto?", a: "Inmediatamente después del pago, recibís el enlace de descarga por email." },
    { q: "¿Necesito ingredientes especiales?", a: "No. Ingredientes de cualquier supermercado." },
    { q: "¿Funciona si soy principiante?", a: "Sí. Recetas paso a paso." },
    { q: "¿Y si no me sirve?", a: "Tenés 7 días de garantía. Te devuelvo el dinero." }
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
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </motion.div>
          ))}
        </div>
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
      <Hero />
      <Beneficios />
      <Contenido />
      <PruebaSocial />
      <Oferta />
      <FAQ />
      <Footer />
    </main>
  );
}