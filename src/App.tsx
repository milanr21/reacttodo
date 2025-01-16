import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Todos from './pages/Dashboard/Todos';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todos' element={<Todos />} />
      </Routes>
    </Router>
  );
};

export default App;
