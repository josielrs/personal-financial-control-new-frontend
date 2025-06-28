import { useState, useEffect } from 'react';
import FinancialControlEntry from '../components/FinancialControlEntry';
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
    const[selectControlDataInteractionId, setSelectControlDataInteractionId] = useState(0)
    const[updateControlDataInteractionId, setUpdateControlDataInteractionId] = useState(0)

    const[currentFinancialControl, setCurrentFinancialControl] = useState("")
    const[financialControlsList,setFinancialControlsList] = useState([])
    const[financialControlsEntriesList,setFinancialControlsEntriesList] = useState([])


    useEffect(() => {
      axios.get(SERVER_ENDPOINT + '/financialControl')
        .then(res => {
                    let newOptions = []
                    if (res.status === 200) {
                        res.data.financialControls.forEach(element => {
                            newOptions.push({'label':element.description,'value':element.month+';'+element.year})                            
                        });
                        setFinancialControlsList(newOptions)
                    } else if (res.status === 204) {
                        setFinancialControlsList(newOptions)
                    } else {
                        throw new Error(res.statusText)
                    }
          })  
        .catch(error => console.log('failed to return financial controls '+error))
    }, [controlInteractionId])    


    useEffect(() => {
        if (!isUndefined(currentFinancialControl) && (currentFinancialControl.indexOf(";")>-1)){
            let values = currentFinancialControl.split(";")
            axios.get(SERVER_ENDPOINT + '/financialControl/?month='+values[0]+'&year='+values[1])
              .then(res => {
                          if (res.status === 200) {
                            let givenFinancialControlEntries = res.data.financialControlEntries
                            if (!isUndefined(givenFinancialControlEntries)){
                                setFinancialControlsEntriesList(givenFinancialControlEntries)
                            } else {
                                setFinancialControlsEntriesList([])
                            }                            
                          } else if (res.status === 204) {
                              setFinancialControlsEntriesList([])
                          } else {
                              throw new Error(res.statusText)
                          }
                })  
              .catch(error => console.log('failed to return financial controls entries '+error))
        } 
    }, [updateControlDataInteractionId,currentFinancialControl])   
    

    const[financialControlSummaryData,setFinancialControlSummaryData] = useState([])
    

    useEffect(() => {
        if (!isUndefined(currentFinancialControl) && (currentFinancialControl.indexOf(";")>-1)){
            let values = currentFinancialControl.split(";")
            axios.get(SERVER_ENDPOINT + '/financialControl/summary/?month='+values[0]+'&year='+values[1])
              .then(res => {
                          if (res.status === 200) {
                              setFinancialControlSummaryData(res.data)
                          } else if (res.status === 204) {
                              setFinancialControlSummaryData({})
                          } else {
                              throw new Error(res.statusText)
                          }
                })  
              .catch(error => console.log('failed to return financial controls summary '+error))
        } 
    }, [updateControlDataInteractionId,currentFinancialControl])     


    useEffect(()=>{
        if (financialControlsEntriesList.length > 0) {
            prepareScreenToControlSelected()
            setSelectControlDataInteractionId(selectControlDataInteractionId+1)
        } else {
            financialControlCleanScreen()
            setSelectControlDataInteractionId(selectControlDataInteractionId+1)
        }
    },[financialControlsEntriesList])


    const prepareScreenToControlSelected = () => {
        document.getElementById("financialControlList").disabled = true
        let values = currentFinancialControl.split(";")
        document.getElementById("financialControlMonthList").value = values[0]
        document.getElementById("financialControlMonthList").disabled = true
        document.getElementById("financialControlYear").value = values[1]
        document.getElementById("financialControlYear").disabled = true
        document.getElementById("financialControlValue").disabled = false
        document.getElementById("financialControlValue").value = 0
        document.getElementById("financialControlValue").readOnly = true
        document.getElementById("financialControlValueMonth").value = undefined
        document.getElementById("financialControlValueYear").value = undefined
        document.getElementById("financialControlValueId").value = -1
        document.getElementById("graphDiv").hidden = false
        document.getElementById("filterButtonDiv").hidden = false
        document.getElementById("gridDiv").hidden = false
        document.getElementById("saveButton").innerHTML = "Atualizar"
    }

    const financialControlCleanScreen = () => {
        document.getElementById("financialControlList").disabled = false
        document.getElementById("financialControlList").value = -1
        document.getElementById("financialControlMonthList").value = -1
        document.getElementById("financialControlMonthList").disabled = false
        document.getElementById("financialControlYear").value = undefined
        document.getElementById("financialControlYear").disabled = false
        document.getElementById("financialControlValue").disabled = true
        document.getElementById("financialControlValue").value = undefined
        document.getElementById("financialControlValue").readOnly = true
        document.getElementById("financialControlValueMonth").value = undefined
        document.getElementById("financialControlValueYear").value = undefined
        document.getElementById("financialControlValueId").value = -1        
        document.getElementById("graphDiv").hidden = true
        document.getElementById("filterButtonDiv").hidden = true
        document.getElementById("gridDiv").hidden = true
        document.getElementById("saveButton").innerHTML = "Gerar"
        setOptionSelected({
                            optionSelected: "revenue",
                            option1BC: 'white',
                            option1ImgHidden: false,
                            option2BC: '#E8DEF8',
                            option2ImgHidden: true,
                            option3BC: '#E8DEF8',
                            option3ImgHidden: true
                        })
    }


    const onSelectGridRow = (row, index) => {
        if (!isUndefined(row) && !isUndefined(row.financialEntry)) {
            document.getElementById("financialControlValue").readOnly = (row.financialEntry.value_type_id === 1)
            document.getElementById("financialControlValue").disabled = false
            document.getElementById("financialControlValue").value = row.value
            document.getElementById("financialControlValueMonth").value = row.month
            document.getElementById("financialControlValueYear").value = row.year
            document.getElementById("financialControlValueId").value = row.financialEntry.id
        } else {
            document.getElementById("financialControlValue").readOnly = true
            document.getElementById("financialControlValue").disabled = true
            document.getElementById("financialControlValue").value = undefined
            document.getElementById("financialControlValueMonth").value = undefined
            document.getElementById("financialControlValueYear").value = undefined
            document.getElementById("financialControlValueId").value = -1
        }
    }

    const [orderOptionSelected,setOptionSelected] = useState({
                                                                optionSelected: "revenue",
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
                                    optionSelected: "revenue",
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
                                    optionSelected: "expense",
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
                                    optionSelected: 'reserve',
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


    const financialControlSelectValue = (event) => {
          if (!isUndefined(event) && !isUndefined(event.currentTarget) && !isUndefined(event.currentTarget.id)) {
            let value = event.currentTarget.value
            if (!isUndefined(value) && (value.indexOf(";")>-1)) {
                setCurrentFinancialControl(value)
                document.getElementById(event.currentTarget.id).disabled = true
            }
          }      
    }


    /*
    --------------------------------------------------------------------------------------
    Função para validar os dados do formulario de controle mensal para atualizacao
    --------------------------------------------------------------------------------------
    */
    const preValidateFinancialControlFormDataToUpdate = function(monthValue,yearValue,entryIdValue,formValue){
        if (isUndefined(monthValue)) {
            return 'Mês é obrigatório.'
        }  
        if (isUndefined(yearValue)) {
            return 'Ano é obrigatório.'
        }  
        if (isUndefined(entryIdValue)) {
            return 'Identificador da movimentação é obrigatório.'
        }  
        if (isUndefined(formValue)) {
            return 'Nenhuma alteração realizada para ser submetida !!'
        }
    }   


    /*
    --------------------------------------------------------------------------------------
    Função para uma atualizar uma movimentacao financeira de um controle mensal na base de dados
    --------------------------------------------------------------------------------------
    */
    const patchFinancialControlEntry = async (monthValue,yearValue,entryIdValue,formValue) => {
        let validationError = preValidateFinancialControlFormDataToUpdate(monthValue,yearValue,entryIdValue,formValue)
        if (!isUndefined(validationError)){
            showInfoMessage(validationError)
            return
        }
        const bodyContent = {}
        bodyContent.month = monthValue
        bodyContent.year = yearValue
        bodyContent.financialEntryId = entryIdValue
        bodyContent.value = formValue

        let url = SERVER_ENDPOINT+'/financialControl';
        
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(bodyContent),
            headers: {"Content-type": "application/json"}
        })
        .then((response) => { 
                if (response.ok) {
                    return undefined
                } else if (response.status === 400) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                } 
        })
        .then((data) => {
                if (data) {
                    showInfoMessage(data.message)
                } else {
                    setUpdateControlDataInteractionId(updateControlDataInteractionId+1)
                }
        })                
        .catch((error) => {
            showInfoMessage(error)
        });
    } 
    

    /*
    --------------------------------------------------------------------------------------
    Função para validar os dados do formulario de controle mensal
    --------------------------------------------------------------------------------------
    */
    const preValidateFinacialControlFormData = function(month,year){
        if (isUndefined(month) || month === '') {
            return 'Mês deve ser informado !!!'
        }
        if (isUndefined(year) || year === '') {
            return 'Ano deve ser informado !!!'
        }
    }


    /*
    --------------------------------------------------------------------------------------
    Função para gerar um novo controle mensal na base de dados
    --------------------------------------------------------------------------------------
    */
    const postBuildFinancialControl = async (monthForm, yearForm) => {
        let validationError = preValidateFinacialControlFormData(monthForm,yearForm)
        if (!isUndefined(validationError)){
            showInfoMessage(validationError)
            return
        }        
        const bodyContent = {}
        bodyContent.month = monthForm
        bodyContent.year = yearForm

        let url = SERVER_ENDPOINT+'/financialControl';
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {"Content-type": "application/json"}
        })
        .then((response) => {
                if (response.ok) {
                    return undefined
                } else if (response.status === 400) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                } 
        })
        .then((data) => {
                if (data) {
                    showInfoMessage(data.message)
                } else {
                    setControlInteractionId(controlInteractionId+1)
                }
        })
        .catch((error) => {
            showInfoMessage(error)
        });
    }



    const updateFinancialData = () => {
        let month = document.getElementById("financialControlValueMonth").value
        let year = document.getElementById("financialControlValueYear").value
        let id = document.getElementById("financialControlValueId").value
        let value = document.getElementById("financialControlValue").value
        if (!document.getElementById("financialControlValue").readOnly) {
            patchFinancialControlEntry(month,year,id,value)
        }
    }


    const createFinancialData = () => {
        let month = document.getElementById("financialControlMonthList").value
        let year = document.getElementById("financialControlYear").value
        postBuildFinancialControl(month,year)
        document.getElementById("financialControlMonthList").value = -1
        document.getElementById("financialControlYear").value = undefined
    }


    const doButtonAction = () => {
        let id = document.getElementById("financialControlValueId").value
        if (!isUndefined(id) && id > 0){
            updateFinancialData()
        } else {
            createFinancialData()
        }
    }

    useEffect(() => {
            setOptionSelected({
                                optionSelected: "revenue",
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
                    ["Despesa", financialControlSummaryData.expensesAmout],
                    ["Reserva", financialControlSummaryData.reservesAmount],
                    ["Saldo", financialControlSummaryData.difference]
                ]

    const options = {
            pieHole: 0.7,
            is3D: false,
            legend: 'none',
            chartArea: { left: "0", top: "0", width: "100%", height: "100%" },
            colors: ["#165DFF", "#0FC6C2", "#F7BA1E"]
    }

    const formatedValue = (value) => {
        if (!isUndefined(value) && value > 0){
            return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        } else {
            return "R$ 0,00"
        }
    }            

    return (
        <div>          
            <div style={{width: 1148.26, height: 763.83, top:300,  background: 'white', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
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
                                <Form.Select id="financialControlList" onChange={financialControlSelectValue}>
                                    <option label="Selecionar Valor" disabled selected value={-1}></option>
                                    {financialControlsList.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}                                    
                                </Form.Select>
                            </FloatingLabel> 
                        </div>
                        <div>
                            <FloatingLabel label="Mês" style={{width:250, paddingRight:10, paddingBottom:10}}>
                                <Form.Select id="financialControlMonthList">
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
                                <Form.Control id="financialControlYear" type="number" />
                            </FloatingLabel>                                       
                        </div>
                        <div>
                            <FloatingLabel label="Valor" style={{width:250,paddingBottom:15}}>
                                <Form.Control id="financialControlValue" type="number" readOnly disabled/>
                                <Form.Control id="financialControlValueMonth" type="hidden" hidden/>
                                <Form.Control id="financialControlValueYear" type="hidden" hidden/>
                                <Form.Control id="financialControlValueId" type="hidden" hidden/>
                            </FloatingLabel> 
                            <div>
                                <Button id="saveButton" as="button" onClick={doButtonAction} type="button" className='financialActionButton' style={{width:110,borderRadius:'20px 20px 20px 20px',margin:6}}>Gerar</Button>
                                <Button as="input" onClick={()=>setFinancialControlsEntriesList([])} type="button" value="Limpar" className='financialActionButton' style={{width:110,borderRadius:'20px 20px 20px 20px',margin:6}} />
                            </div>                    
                        </div>
                        <div id="graphDiv" hidden>
                            <div style={{width: 800, height: 132, position: 'relative'}}>
                            <div style={{width: 280.89, height: 132, left: 0, top: 0, position: 'absolute'}}>
                                <Chart chartType="PieChart" width="100%" height="100%" data={data} options={options}/>                            
                            </div>
                            <div style={{width: 70.05, height: 20.84, left: 213.14, top: 0, position: 'absolute', color: '#165DFF', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>Despesas</div>
                            <div style={{width: 67.24, height: 20.84, left: 213.14, top: 43.07, position: 'absolute', color: '#0FC6C2', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', textAlign:'center'}}>Reservas</div>
                            <div style={{width: 42.03, height: 20.84, left: 213.14, top: 86.15, position: 'absolute', color: '#F7BA1E', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>Saldo</div>
                            <div style={{width: 60.24, height: 20.84, left: 110.21, top: 43.07, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Receitas</div>
                            <div style={{width: 108.26, height: 20.84, left: 81.81, top: 63.92, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', textAlign:'center'}}>{formatedValue(financialControlSummaryData.revenueAmout)}</div>
                            <div style={{width: 105.46, height: 20.84, left: 210.54, top: 22.23, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>{formatedValue(financialControlSummaryData.expensesAmout)}</div>
                            <div style={{width: 105.46, height: 20.84, left: 210.14, top: 63.92, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>{formatedValue(financialControlSummaryData.reservesAmount)}</div>
                            <div style={{width: 101.25, height: 20.84, left: 210.54, top: 106.99, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>{formatedValue(financialControlSummaryData.difference)}</div>
                            </div>
                        </div>
                    </div>
                    <div id="filterButtonDiv" style={{paddingTop:50,display:'flex', justifyContent:'center'}} hidden>
                        <div>
                            <ButtonGroup className="mb-2">
                                <Button onClick={()=>orderButtonOptionClick(1)} style={{width:240,borderRadius:'20px 0px 0px 20px',borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option1BC}}><img src={check} alt="" hidden={orderOptionSelected.option1ImgHidden}/>Receita</Button>
                                <Button onClick={()=>orderButtonOptionClick(2)} style={{width:240,borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option2BC}}><img src={check} alt="" hidden={orderOptionSelected.option2ImgHidden}/>Despesa</Button>
                                <Button onClick={()=>orderButtonOptionClick(3)} style={{width:240,borderRadius:'0px 20px 20px 0px',borderColor:'#79747E',color:'black',backgroundColor:orderOptionSelected.option3BC}}><img src={check} alt="" hidden={orderOptionSelected.option3ImgHidden}/>Reserva</Button>
                            </ButtonGroup>
                        </div>
                    </div>                                    
                </div>
                <div id="gridDiv" style={{width: 1120, height: 420.38, left: 10, top: 220, position: 'relative', background: 'white', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.04)', borderRadius: 19}} hidden>
                    <FinancialControlEntry filterOption={orderOptionSelected.optionSelected} interactionId={selectControlDataInteractionId} onRowSelection={onSelectGridRow} givenFinancialControlEntriesList={financialControlsEntriesList}/>
                </div>                      
            </div>
        </div>
    )
}