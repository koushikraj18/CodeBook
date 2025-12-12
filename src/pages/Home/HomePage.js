import { FeaturedProducts } from "./components/FeaturedProducts";
import { Hero } from "./components/Hero";
import {Faq} from './components/Faq';
import { Testimonials } from "./components/Testimonials";
import { useTitle } from "../../hooks/useTitle";

export const HomePage = () => {
  useTitle("Access Latest Computer Science eBooks");
  
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <Faq />
    </main>
  )
}
