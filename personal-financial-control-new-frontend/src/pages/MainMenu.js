import HomeIcon from "../assets/HomeIcon.svg"
import ReserveIcon from "../assets/ReserveIcon.svg"
import RevenueIcon from "../assets/RevenueIcon.svg"
import CreditCardIcon from "../assets/CreditCardIcon.svg"
import ExpensesIcon from "../assets/ExpensesIcon.svg"
import ControlIcon from "../assets/Control.svg"

export default function MainMenu(props){

    const handleClick = (menuName) => {
        props.onMenuSelect(menuName)
    }

    return(
        <div>
            <div data-layer="mainMenuBackground" className="Mainmenubackground" style={{width: 256, height: 890, left: 8, top: 24, position: 'absolute', background: '#DFF7E2', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.50)', borderRadius: 39}} />
            <div data-layer="Group 85" className="menuButton" onClick={()=>{handleClick('home')}} style={{width: 200, height: 48, left: 43, top: 256, position: 'absolute'}}>
                <div data-svg-wrapper data-layer="Home" data-size="48" className="Home" style={{left: 0, top: 0, position: 'absolute'}}>
                    <img src={HomeIcon}/>
                </div>
                <div data-layer="home" className="Home" style={{left: 68, top: 11, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>home</div>
            </div>
            <div data-layer="Group 80" className="menuButton" onClick={()=>{handleClick('reserve')}} style={{width: 200, height: 56, left: 40, top: 572, position: 'absolute'}}>
                <div data-svg-wrapper data-layer="Dollar sign" data-size="48" className="DollarSign" style={{left: 0, top: 4, position: 'absolute'}}>
                    <img src={ReserveIcon}/>
                </div>
                <div data-layer="Frame 10" className="Frame10" style={{padding: 10, left: 58, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <div data-layer="reservas" className="Reservas" style={{color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>reservas</div>
                </div>
            </div>
            <div data-layer="Group 78" className="menuButton" onClick={()=>{handleClick('controle')}} style={{width: 200, height: 72, left: 40, top: 645, position: 'absolute'}}>
                <div data-layer="controle mensal" className="ControleMensal" style={{left: 70, top: 0, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>controle <br/>mensal</div>
                    <div data-svg-wrapper data-layer="Trending up" data-size="48" className="TrendingUp" style={{left: 0, top: 4, position: 'absolute'}}>
                        <img src={ControlIcon}/>
                    </div>
            </div>            
            <div data-layer="Group 84" className="menuButton" onClick={()=>{handleClick('revenue')}} style={{width: 200, height: 68, left: 35, top: 319, position: 'absolute'}}>
                <div data-layer="Frame 6" className="Frame6" style={{padding: 10, left: 0, top: 0, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <div data-svg-wrapper data-layer="Arrow down-circle" data-size="48" className="ArrowDownCircle" style={{position: 'relative'}}>
                        <img src={RevenueIcon}/>
                    </div>
                </div>
                <div data-layer="receitas" className="Receitas" style={{left: 78, top: 14, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>receitas</div>
            </div>
            <div data-layer="Group 83" className="menuButton" onClick={()=>{handleClick('expense')}} style={{width: 200, height: 68, left: 35, top: 402, position: 'absolute'}}>
                <div data-layer="Frame 7" className="Frame7" style={{padding: 10, left: 0, top: 0, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <div data-svg-wrapper data-layer="Arrow up-circle" data-size="48" className="ArrowUpCircle" style={{position: 'relative'}}>
                        <img src={ExpensesIcon}/>
                    </div>
                </div>
                <div data-layer="despesas" className="Despesas" style={{left: 76, top: 14, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>despesas</div>
            </div>
            <div data-layer="Group 82" className="menuButton" onClick={()=>{handleClick('cartaoDeCredito')}} style={{width: 200, height: 72, left: 36, top: 485, position: 'absolute'}}>
                <div data-layer="Frame 8" className="Frame8" style={{padding: 10, left: 0, top: 4, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <div data-svg-wrapper data-layer="Credit card" data-size="48" className="CreditCard" style={{position: 'relative'}}>
                        <img src={CreditCardIcon}/>
                    </div>
                </div>
                <div data-layer="cartão de crédito" className="CartODeCrDito" style={{width: 124, left: 75, top: 0, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>cartão de
                    <br/>crédito</div>
            </div>
        </div>
    )

}