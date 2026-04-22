import type { Metadata } from "next";
import { Inter, Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"] 
});
const openSans = Open_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"] 
});

export const metadata: Metadata = {
  title: "Pack Completo Sin Gluten - 40 Recetas + 3 Bónus Exclusivos",
  description: "Domina la panadería sin gluten con 40 recetas exclusivas + 3 bónus. Aprende a hacer panes esponjosos, croissants, pizzas y más.",
  keywords: "sin gluten, recetas sin gluten, panadería sin gluten, celíaco, intolerante al gluten",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.className} ${openSans.className}`}>
        {children}
      </body>
    </html>
  );
}