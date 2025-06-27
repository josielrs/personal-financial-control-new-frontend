import { useState, useEffect } from 'react';
import CreditCard from '../components/CreditCard';
import CreditCardForm from '../components/CreditCardForm';
import CreditCardIcon from "../assets/CreditCardIcon.svg"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import check from '../assets/check.svg'
import { isUndefined } from '../Utils'


export default function CreditCardMenu(props){

    const[cardInteractionId, setCardInteractionId] = useState(0)
    const[creditCardDataMenu,setCreditCardDataMenu] = useState({})

    const addCardInteractionId = () => {
        setCardInteractionId(cardInteractionId + 1)
    }

    const onSelectGridRow = (row, index) => {
        if (!isUndefined(row)) {
            setCreditCardDataMenu(row)
        }
    }

    const [orderOptionSelected,setOptionSelected] = useState({
                                                                optionSelected: "flag",
                                                                option1BC: 'white',
                                                                option1ImgHidden: false,
                                                                option2BC: '#E8DEF8',
                                                                option2ImgHidden: true
                                                            })

    const orderButtonOptionClick = (optionId) => {
        switch (optionId) {
            case 1:
                setOptionSelected({
                                    optionSelected: "flag",
                                    option1BC: 'white',
                                    option1ImgHidden: false,
                                    option2BC: '#E8DEF8',
                                    option2ImgHidden: true
                                  })
                break
            default:
                setOptionSelected({
                                    optionSelected: "number",
                                    option1BC: '#E8DEF8',
                                    option1ImgHidden: true,
                                    option2BC: 'white',
                                    option2ImgHidden: false
                                  })                         
        }
    }

    useEffect(() => {
            setOptionSelected({
                                optionSelected: "flag",
                                option1BC: 'white',
                                option1ImgHidden: false,
                                option2BC: '#E8DEF8',
                                option2ImgHidden: true
                                })
    },[])


    return (
        <div>
            <div className="Rectangle53" style={{width: 1148.26, height: 763.83, top:300,  background: 'white', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                <div style={{width: 1060.39, height: 60.27, top: 10, left: 40, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', background: '#DFF7E2', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                    <div data-size="48" style={{width: 48, height: 48, position: 'relative',  display:'flex'}}>
                        <img src={CreditCardIcon} alt=""></img>
                    </div>
                    <div style={{color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', position:'relative'}}>&nbsp;&nbsp;CARTÃO DE CRÉDITO</div>
                </div>
                <div style={{width: 1060.39, height: 60.27, top: 30, left: 10, position:'relative'}}>
                    <CreditCardForm callbackFunctionToUpdate={addCardInteractionId} interactionId={cardInteractionId} givenCreditCardData={creditCardDataMenu}/>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div>
                            <ButtonGroup className="mb-2">
                                <Button onClick={()=>orderButtonOptionClick(1)} style={{width:240,borderRadius:'20px 0px 0px 20px',borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option1BC}}><img src={check} alt="" hidden={orderOptionSelected.option1ImgHidden}/>Bandeira</Button>
                                <Button onClick={()=>orderButtonOptionClick(2)} style={{width:240,borderRadius:'0px 20px 20px 0px',borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option2BC}}><img src={check} alt="" hidden={orderOptionSelected.option2ImgHidden}/>Número</Button>
                            </ButtonGroup>
                        </div>
                    </div>                                    
                </div>
                <div style={{width: 1120, height: 420.38, left: 10, top: 220, position: 'relative', background: 'white', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.04)', borderRadius: 19}}>
                    <CreditCard sortOption={orderOptionSelected.optionSelected} interactionId={cardInteractionId} onRowSelection={onSelectGridRow}/>
                </div>                      
            </div>
        </div>
    )

}
