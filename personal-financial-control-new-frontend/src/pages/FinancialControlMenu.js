import { useState, useEffect, useMemo } from 'react';
import CreditCard from '../components/CreditCard';
import Control from "../assets/Control.svg"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import check from '../assets/check.svg'
import { SERVER_ENDPOINT, showInfoMessage,isUndefined } from '../Utils'
import axios from 'axios'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Chart } from "react-google-charts";


export default function FinancialControlMenu(props){

    const[controlInteractionId, setControlInteractionId] = useState(0)
    const[creditCardDataMenu,setCreditCardDataMenu] = useState({})

    const addCardInteractionId = () => {
        setControlInteractionId(controlInteractionId + 1)
    }

    const onSelectGridRow = (row, index) => {
        if (!isUndefined(row)) {
            setCreditCardDataMenu(row)
        }
    }

    const [orderOptionSelected,setOptionSelected] = useState({
                                                                optionSelected: "category",
                                                                option1BC: 'white',
                                                                option1ImgHidden: false,
                                                                option2BC: '#E8DEF8',
                                                                option2ImgHidden: true,
                                                                option3BC: '#E8DEF8',
                                                                option3ImgHidden: true
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
                                    option3ImgHidden: true
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
                                    option3ImgHidden: true
                                  })
                break
            default:
                setOptionSelected({
                                    optionSelected: '',
                                    option1BC: '#E8DEF8',
                                    option1ImgHidden: true,
                                    option2BC: '#E8DEF8',
                                    option2ImgHidden: true,
                                    option3BC: 'white',
                                    option3ImgHidden: false
                                  })
                break                                

        }
    }

    const formChangeValue = () => {

    }

    const doButtonAction = () => {

    }

    const saveButtonLabel = () => {

    }

    const cleanButtonAction = () => {

    }

    useEffect(() => {
            setOptionSelected({
                                optionSelected: "category",
                                option1BC: 'white',
                                option1ImgHidden: false,
                                option2BC: '#E8DEF8',
                                option2ImgHidden: true,
                                option3BC: '#E8DEF8',
                                option3ImgHidden: true
                                })
    },[])


    const data = [
                            ["Financial Entry Type", "Amount Financial Values"],
                            ["Despesa", 3000],
                            ["Reserva", 1000],
                            ["Saldo", 500]
                            ];

            const options = {
            pieHole: 0.7,
            is3D: false,
            legend: 'none',
            chartArea: { left: "0", top: "0", width: "100%", height: "100%" },
            colors: ["#165DFF", "#0FC6C2", "#F7BA1E"]
            };

    return (
        <div>          
            <div className="Rectangle53" style={{width: 1148.26, height: 763.83, top:300,  background: 'white', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                <div style={{width: 1060.39, height: 60.27, top: 10, left: 40, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', background: '#DFF7E2', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                    <div data-size="48" style={{width: 48, height: 48, position: 'relative',  display:'flex'}}>
                        <img src={Control} alt=""></img>
                    </div>
                    <div style={{color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', position:'relative'}}>&nbsp;&nbsp;CONTROLE MENSAL</div>
                </div>
                <div style={{width: 1060.39, height: 60.27, top: 30, left: 10, position:'relative'}}>



                    <div style={{display:'flex'}}>
                        <div style={{paddingTop:40}}>
                            <FloatingLabel label="Consultar Controle" style={{width:250, paddingRight:10}}>
                                <Form.Select id="financialControlList" onChange={formChangeValue}>
                                    <option label="Selecionar Valor" disabled selected value={-1}></option>
                                </Form.Select>
                            </FloatingLabel> 
                        </div>
                        <div>
                            <FloatingLabel label="Mês" style={{width:250, paddingRight:10, paddingBottom:10}}>
                                <Form.Select id="financialControlMonthList" onChange={formChangeValue}>
                                    <option label="Selecionar Valor" disabled selected value={-1}></option>
                                    <option label="JANEIRO" value={1}></option>
                                    <option label="FEVEREIRO" value={2}></option>
                                    <option label="MARÇO" value={3}></option>
                                    <option label="ABRIL" value={4}></option>
                                    <option label="MAIO" value={5}></option>
                                    <option label="JUNHO" value={6}></option>
                                    <option label="JULHO" value={7}></option>
                                    <option label="AGOSTO" value={8}></option>
                                    <option label="SETEMBRO" value={9}></option>
                                    <option label="OUTUBRO" value={10}></option>
                                    <option label="NOVEMBRO" value={11}></option>
                                    <option label="DEZEMBRO" value={12}></option>
                                </Form.Select>
                            </FloatingLabel>  
                            <FloatingLabel label="Ano" style={{width:250, paddingRight:10, paddingBottom:10}}>
                                <Form.Control id="financialControlYear" type="number" onChange={formChangeValue} />
                            </FloatingLabel>                                       
                        </div>
                        <div>
                            <FloatingLabel label="Valor" style={{width:250,paddingBottom:15}}>
                                <Form.Control id="financialControlYear" type="number" onChange={formChangeValue} />
                            </FloatingLabel> 
                            <div>
                                <Button as="input" onClick={doButtonAction} type="button" value={saveButtonLabel} className='financialActionButton' style={{width:110,borderRadius:'20px 20px 20px 20px',margin:6}} />
                                <Button as="input" onClick={cleanButtonAction} type="button" value="Limpar" className='financialActionButton' style={{width:110,borderRadius:'20px 20px 20px 20px',margin:6}} />
                            </div>                    
                        </div>
                        <div style={{width:200}}>
                            
                        </div>
                        <div style={{width: 800, height: 132, position: 'relative'}}>
                        <div style={{width: 180.89, height: 132, left: 0, top: 0, position: 'absolute'}}>
                            <Chart chartType="PieChart" width="100%" height="100%" data={data} options={options} />                            
                        </div>
                        <div style={{width: 70.05, height: 20.84, left: 163.14, top: 0, position: 'absolute', color: '#165DFF', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>Despesas</div>
                        <div style={{width: 67.24, height: 20.84, left: 163.14, top: 43.07, position: 'absolute', color: '#0FC6C2', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>Reservas</div>
                        <div style={{width: 42.03, height: 20.84, left: 163.14, top: 86.15, position: 'absolute', color: '#F7BA1E', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>Saldo</div>
                        <div style={{width: 60.24, height: 20.84, left: 65.21, top: 33.07, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Receitas</div>
                        <div style={{width: 88.26, height: 20.84, left: 48.81, top: 53.92, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', textAlign:'center'}}>R$ 5.000,00</div>
                        <div style={{width: 85.46, height: 20.84, left: 164.54, top: 22.23, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>R$ 2,00</div>
                        <div style={{width: 85.46, height: 20.84, left: 163.14, top: 63.92, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>R$ 3,00</div>
                        <div style={{width: 81.25, height: 20.84, left: 164.54, top: 106.99, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>R$ 4,00</div>
                        </div>                        
                    </div>
                    <div style={{paddingTop:50,display:'flex', justifyContent:'center'}}>
                        <div>
                            <ButtonGroup className="mb-2">
                                <Button onClick={()=>orderButtonOptionClick(1)} style={{width:240,borderRadius:'20px 0px 0px 20px',borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option1BC}}><img src={check} hidden={orderOptionSelected.option1ImgHidden}/>Receita</Button>
                                <Button onClick={()=>orderButtonOptionClick(2)} style={{width:240,borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option2BC}}><img src={check} hidden={orderOptionSelected.option2ImgHidden}/>Despesa</Button>
                                <Button onClick={()=>orderButtonOptionClick(3)} style={{width:240,borderRadius:'0px 20px 20px 0px',borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option3BC}}><img src={check} hidden={orderOptionSelected.option3ImgHidden}/>Reserva</Button>
                            </ButtonGroup>
                        </div>
                    </div>                                    
                </div>
                <div style={{width: 1120, height: 420.38, left: 10, top: 220, position: 'relative', background: 'white', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.04)', borderRadius: 19}}>
                    <CreditCard sortOption={orderOptionSelected.optionSelected} interactionId={controlInteractionId} onRowSelection={onSelectGridRow}/>
                </div>                      
            </div>
        </div>
    )

}
