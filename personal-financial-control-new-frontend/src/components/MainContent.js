import AppLogo from "../assets/AppLogoInBase64";
import Menu from "./Menu";
import DollarCotation from "./DollarCotation";

export default function MainContent(){

    return(
        <div>
            <div data-layer="smartFinTitle" className="Smartfintitle" style={{left: 316, top: 108, position: 'absolute', color: 'black', fontSize: 20.11, fontFamily: 'Poppins', fontWeight: '250', wordWrap: 'break-word'}}>Sua ferramenta de gestão financeira pessoal</div>
            <div data-layer="smartFinName" className="Smartfinname" style={{left: 316, top: 61, position: 'absolute', color: 'black', fontSize: 43.37, fontFamily: 'Lexend Mega', fontWeight: '700', wordWrap: 'break-word'}}>SMART FIN</div>
            <div data-layer="smartFinName" className="Smartfinname" style={{left: 1016, top: 100, position: 'absolute', color: 'black', fontSize: 13.37, fontFamily: 'Lexend Mega', fontWeight: '700', wordWrap: 'break-word'}}><DollarCotation/></div>
            <Menu/>
            <img data-layer="applogo" className="Applogo" style={{width: 126, height: 155, left: 73, top: 48, position: 'absolute'}} alt="" src={AppLogo}/>               
        </div> 
    )
}