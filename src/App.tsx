import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ResistorColorCode from './pages/ResistorColorCode';
import SeriesResistance from './pages/SeriesResistance';
import ParallelResistance from './pages/ParallelResistance';
import VoltageDivider from './pages/VoltageDivider';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resistor-color-code" element={<ResistorColorCode />} />
          <Route path="/series-resistance" element={<SeriesResistance />} />
          <Route path="/parallel-resistance" element={<ParallelResistance />} />
          <Route path="/voltage-divider" element={<VoltageDivider />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
