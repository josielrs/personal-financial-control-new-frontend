import { useState } from "react";
import MainMenu from "./pages/MainMenu";
import MainContent from "./pages/MainContent";
import AppLogo from "./assets/AppLogoInBase64";

function App() {

  const [menuSelectedValue,setMenuSelectedValue] = useState("home")

  const handleCallbackMenuSelection = (menu) => {
      setMenuSelectedValue(menu)
  }

  return (
    <div className="smartFinApp" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div data-layer="HomeScreen" className="Homescreen" style={{width: 1512, height: 982, position: 'relative', background: '#F1FFF3', overflow: 'hidden'}}>
            <div data-layer="smartFinTitle" className="Smartfintitle" style={{left: 316, top: 108, position: 'absolute', color: 'black', fontSize: 20.11, fontFamily: 'Poppins', fontWeight: '250', wordWrap: 'break-word'}}>Sua ferramenta de gestão financeira pessoal</div>
            <div data-layer="smartFinName" className="Smartfinname" style={{left: 316, top: 61, position: 'absolute', color: 'black', fontSize: 43.37, fontFamily: 'Lexend Mega', fontWeight: '700', wordWrap: 'break-word'}}>SMART FIN</div>
            <MainMenu onMenuSelect={handleCallbackMenuSelection}/>
            <img data-layer="applogo" className="Applogo" style={{width: 126, height: 155, left: 73, top: 48, position: 'absolute'}} src={AppLogo}/>
            <MainContent menuSelected={menuSelectedValue} />
        </div>        
    </div>
  );
}

export default App;
