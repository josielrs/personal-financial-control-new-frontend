import { useState, useEffect } from 'react';
import MainContent from '../components/MainContent';
import FinancialEntry from '../components/FinancialEntry';
import FinancialEntryForm from '../components/FinancialEntryForm';
import ReserveIcon from "../assets/ReserveIcon.svg"
import RevenueIcon from "../assets/RevenueIcon.svg"
import ExpensesIcon from "../assets/ExpensesIcon.svg"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import check from '../assets/check.svg'
import { isUndefined } from '../Utils'
import { useSearchParams } from 'react-router-dom';


export default function FinancialEntryMenu(){

    const [searchParams] = useSearchParams()

    const entryType = searchParams.get("type")
    const[interationId, setInteractionId] = useState(0)
    const[financialEntryData,setFinancialEntryData] = useState({})

    const addInteractionId = () => {
        setInteractionId(interationId + 1)
    }

    const onSelectGridRow = (row, index) => {
        if (!isUndefined(row)) {
            setFinancialEntryData(row)
        }
    }

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
        <div className="smartFinApp">
            <div className="smartFinHome">
                <MainContent />
                <div className="subPageContent">
                    <div className="Rectangle53" style={{width: 1148.26, height: 763.83, top:300,  background: 'white', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                        <div style={{width: 1060.39, height: 60.27, top: 10, left: 40, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', background: '#DFF7E2', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                            <div data-size="48" style={{width: 48, height: 48, position: 'relative',  display:'flex'}}>
                                <img src={screenIcon}></img>
                            </div>
                            <div style={{color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', position:'relative'}}>&nbsp;&nbsp;{screenName}</div>
                        </div>
                        <div style={{width: 1060.39, height: 60.27, top: 30, left: 10, position:'relative'}}>
                            <FinancialEntryForm entryType={entryType} callbackFunctionToUpdate={addInteractionId} interactionId={interationId} givenFinancialEntryData={financialEntryData}/>
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
                            <FinancialEntry fromScreen={entryType} sortOption={orderOptionSelected.optionSelected} interactionId={interationId} onRowSelection={onSelectGridRow}/>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    )

}
