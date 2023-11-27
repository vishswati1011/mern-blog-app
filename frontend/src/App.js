

import MegaMenu from './navbar/megaMenu';
import Card from './card/card'

import Popup from './popup/popup-model'
// import the library
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Footer from './footer/footer';
import Header from './header/header';
import './App.css'
function App() {
  return (
    <div className="">
        <Header/>  
        <MegaMenu/>
     <div className='main-content'>
      <Card/>
     </div>
      {/* <Popup/> */}
      <Footer/>
    </div>  
  );
}

export default App;
library.add(fab, fas, far)