import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Advantage from './components/Advantage';
import Engagement from './components/Engagement';
import Capabilities from './components/Capabilities';
import Process from './components/Process';
import Sectors from './components/Sectors';
import SampleWork from './components/SampleWork';
import Tools from './components/Tools';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Advantage />
        <Engagement />
        <Capabilities />
        <Process />
        <Sectors />
        <SampleWork />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
