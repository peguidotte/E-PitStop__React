import './index.css'
import Nav from './components/Nav.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App;
