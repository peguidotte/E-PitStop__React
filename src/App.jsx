import './index.css'
import './App.css'
import Menu from './components/Menu.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <div className='grid-container'>
      <Menu className='nav' style={{ gridArea: 'nav' }}/>
      <div className='outlet' style={{ gridArea: 'outlet' }}>
        <Outlet />
      </div>
  </div>
  )
}

export default App;
