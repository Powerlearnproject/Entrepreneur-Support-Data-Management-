import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Form from './pages/Form';
import Confirmation from './pages/Confirmation';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import CommunityPage from './pages/CommunityPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<Form />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applicationform" element={<ApplicationForm />} />
        <Route path="/communitypage" element={<CommunityPage />} />
        {/* Add more routes as needed */}
  
      </Routes>
    </Router>
  );
}

export default App;
