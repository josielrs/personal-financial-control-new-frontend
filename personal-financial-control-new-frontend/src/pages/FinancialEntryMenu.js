import { useState, useEffect } from 'react';
import FinancialEntry from '../components/FinancialEntry';
import ReserveIcon from "../assets/ReserveIcon.svg"
import RevenueIcon from "../assets/RevenueIcon.svg"
import ExpensesIcon from "../assets/ExpensesIcon.svg"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import check from '../assets/check.svg'



export default function FinancialEntryMenu(props){

    const entryType = props.entryType

    const [orderOptionSelected,setOptionSelected] = useState({
                                                                optionSelected: "category",
                                                                option1BC: 'white',
                                                                option1ImgHidden: false,
                                                                option2BC: '#E8DEF8',
                                                                option2ImgHidden: true,
                                                                option3BC: '#E8DEF8',
                                                                option3ImgHidden: true,
                                                                option3Text: (entryType === 'expense')?'Cartão de Crédito':'Tipo de Valor'
                                                            })

    const orderButtonOptionClick = (optionId) => {
        switch (optionId) {
            case 1:
                setOptionSelected({
                                    optionSelected: "category",
                                    option1BC: 'white',
                                    option1ImgHidden: false,
                                    option2BC: '#E8DEF8',
                                    option2ImgHidden: true,
                                    option3BC: '#E8DEF8',
                                    option3ImgHidden: true,
                                    option3Text: (entryType === 'expense')?'Cartão de Crédito':'Tipo de Valor'
                                  })
                break
            case 2:
                setOptionSelected({
                                    optionSelected: "lastentries",
                                    option1BC: '#E8DEF8',
                                    option1ImgHidden: true,
                                    option2BC: 'white',
                                    option2ImgHidden: false,
                                    option3BC: '#E8DEF8',
                                    option3ImgHidden: true,
                                    option3Text: (entryType === 'expense')?'Cartão de Crédito':'Tipo de Valor'
                                  })
                break
            default:
                setOptionSelected({
                                    optionSelected: (entryType === 'expense')?'creditCard':'valueType',
                                    option1BC: '#E8DEF8',
                                    option1ImgHidden: true,
                                    option2BC: '#E8DEF8',
                                    option2ImgHidden: true,
                                    option3BC: 'white',
                                    option3ImgHidden: false,
                                    option3Text: (entryType === 'expense')?'Cartão de Crédito':'Tipo de Valor'
                                  })
                break                                

        }
    }

    useEffect(() => {
            setOptionSelected({
                                optionSelected: "category",
                                option1BC: 'white',
                                option1ImgHidden: false,
                                option2BC: '#E8DEF8',
                                option2ImgHidden: true,
                                option3BC: '#E8DEF8',
                                option3ImgHidden: true,
                                option3Text: (entryType === 'expense')?'Cartão de Crédito':'Tipo de Valor'
                                })
    },[entryType])


    let screenName = ''
    let screenIcon = ReserveIcon

    switch (entryType) {
        case "revenue":
            screenName = 'RECEITAS'
            screenIcon = RevenueIcon
            break
        case "expense":
            screenName = 'DESPESAS'
            screenIcon = ExpensesIcon
            break
        default:
            screenName = 'RESERVAS'
            screenIcon = ReserveIcon
    }


    return (
        <div>
  


            <div className="Rectangle53" style={{width: 1148.26, height: 763.83, top:300,  background: 'white', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                <div style={{width: 1060.39, height: 60.27, top: 10, left: 40, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', background: '#DFF7E2', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                    <div data-size="48" style={{width: 48, height: 48, position: 'relative',  display:'flex'}}>
                        <img src={screenIcon}></img>
                    </div>
                    <div style={{color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', position:'relative'}}>&nbsp;&nbsp;{screenName}</div>
                </div>
                <div style={{width: 1060.39, height: 60.27, top: 30, left: 10, position:'relative'}}>
                    <div style={{display:'flex'}}>
                        <FloatingLabel controlId="floatingInputName" label="Nome" style={{width:600, paddingBottom:4}}>
                            <Form.Control type="text" placeholder="Nome" />
                        </FloatingLabel>                    
                        <FloatingLabel controlId="floatingInputName" label="Categoria" style={{width:400, paddingLeft:4, paddingBottom:4}}>
                            <Form.Select aria-label="Default select example">
                                <option disabled>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>                        
                        <FloatingLabel controlId="floatingInputName" label="Cartão de Crédito" style={{width:400, paddingLeft:4, paddingBottom:4}} hidden={entryType!=="expense"}>
                            <Form.Select aria-label="Default select example">
                                <option disabled>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                        <div style={{alignItems:'center', display:'flex', paddingLeft:4, paddingBottom:4}}>
                            <Form.Check  enabled id="recorrente" label="Recorrente"  />
                        </div>
                    </div>
                    <div style={{display:'flex'}}>
                        <FloatingLabel controlId="floatingInputName" label="Data Inicio" style={{paddingBottom:4}}>
                            <Form.Control type="date" placeholder="Nome" />
                        </FloatingLabel>  
                        <FloatingLabel controlId="floatingInputName" label="Data Fim" style={{paddingLeft:4, paddingBottom:4}}>
                            <Form.Control type="date" placeholder="Nome" />
                        </FloatingLabel>   
                        <FloatingLabel controlId="floatingInputName" label="Valor (R$)" style={{width:600}}>
                            <Form.Control type="number" placeholder="Nome" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInputName" label="Tipo Valor" style={{width:400, paddingLeft:4, paddingBottom:4}}>
                            <Form.Select aria-label="Default select example">
                                <option disabled>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>                       
                    </div>
                    <div style={{display:'flex', justifyContent:'center', paddingBottom:10}}>
                        <div>
                            <Button as="input" type="button" value="Salvar" className='financialActionButton' style={{width:120,borderRadius:'20px 20px 20px 20px',margin:4}} />
                            <Button as="input" type="button" value="Limpar" className='financialActionButton' style={{width:120,borderRadius:'20px 20px 20px 20px',margin:4}} />
                        </div>
                    </div>   
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div>
                            <ButtonGroup className="mb-2">
                                <Button onClick={()=>orderButtonOptionClick(1)} style={{width:240,borderRadius:'20px 0px 0px 20px',borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option1BC}}><img src={check} hidden={orderOptionSelected.option1ImgHidden}/>Categoria</Button>
                                <Button onClick={()=>orderButtonOptionClick(2)} style={{width:240,borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option2BC}}><img src={check} hidden={orderOptionSelected.option2ImgHidden}/>Últimos Lançamentos</Button>
                                <Button onClick={()=>orderButtonOptionClick(3)} style={{width:240,borderRadius:'0px 20px 20px 0px',borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option3BC}}><img src={check} hidden={orderOptionSelected.option3ImgHidden}/>{orderOptionSelected.option3Text}</Button>
                            </ButtonGroup>
                        </div>
                    </div>                                    
                </div>
                <div style={{width: 1120, height: 420.38, left: 10, top: 220, position: 'relative', background: 'white', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.04)', borderRadius: 19}}>
                    <FinancialEntry fromScreen={entryType} sortOption={orderOptionSelected.optionSelected}/>
                </div>                      
            </div>
        </div>
    )

}
