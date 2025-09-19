import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import About from '../components/About';
import Contact from '../components/Contact';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="content-section">
        <ProductGrid />
      </div>
      <div className="content-section bg-white">
        <About />
      </div>
      <div className="content-section">
        <Contact />
      </div>
    </div>
  );
}

export default Home;
