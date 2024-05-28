import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';

const App: React.FC = () => {
  return (
    <div className="w-screen h-auto lg:h-screen bg-primary flex flex-col items-center">
      <div className="w-full bg-secondary-dark flex justify-center items-center py-4 border-b border-secondary-light">
        <span className="text-text-selected text-md font-semibold">
          Order Trade & Balance Simulation
        </span>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
