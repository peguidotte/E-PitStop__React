import './index.css'
import './App.css'
import Aside from './components/Aside.jsx'
import Nav from './components/Nav.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <div className='grid-container'>
      <Nav className='nav' style={{ gridArea: 'nav' }}/>
      <Outlet className='outlet' style={{ gridArea: 'outlet' }}/>
      <Aside className='aside' style={{ gridArea: 'aside' }}/>
  </div>
  )
}

export default App;
