import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Faculty = lazy(() => import('./pages/Faculty'));
const Students = lazy(() => import('./pages/Students'));
const Events = lazy(() => import('./pages/Events'));
const Library = lazy(() => import('./pages/Library'));
const Awards = lazy(() => import('./pages/Awards'));
const Alumni = lazy(() => import('./pages/Alumni'));
const Placements = lazy(() => import('./pages/Placements'));
const Research = lazy(() => import('./pages/Research'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/IT">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="students" element={<Students />} />
            <Route path="events" element={<Events />} />
            <Route path="library" element={<Library />} />
            <Route path="awards" element={<Awards />} />
            <Route path="alumni" element={<Alumni />} />
            <Route path="placements" element={<Placements />} />
            <Route path="research" element={<Research />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
