import { useState, useEffect } from 'react';
import { SERVER_ENDPOINT, showInfoMessage, isUndefined } from '../Utils'
import { confirmAlert } from 'react-confirm-alert';

import axios from 'axios'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function FinancialEntryForm(props){

    const entryType = props.entryType
    const callbackToUpdate = props.callbackFunctionToUpdate
    const givenFinancialEntryData = isUndefined(props.givenFinancialEntryData)?{}:props.givenFinancialEntryData
    
    const[financialEntryData,setFinancialEntryData] = useState(givenFinancialEntryData)
    const[categoryOptions, setCategoryOptions] = useState([])
    const[creditCardList, setCreditCardList] = useState([])

    let entryTypeId = 1
    let saveButtonLabel = !isUndefined(financialEntryData.id)?"Atualizar":"Salvar"

    const refreshCommand = () => {
        if (!isUndefined(callbackToUpdate)) {
            callbackToUpdate()
        }
    }

    switch (entryType) {
        case "revenue":
            entryTypeId = 1
            break
        case "expense":
            entryTypeId = 2
            break
        default:
            entryTypeId = 3
    }    

    useEffect(() => {
        setFinancialEntryData(givenFinancialEntryData)
    },[givenFinancialEntryData])

    useEffect(() => {
      axios.get(SERVER_ENDPOINT + '/financialControlCategory/?entry_type_id=' + entryTypeId)
        .then(res => {
                    let newOptions = []
                    if (res.status == 200) {
                        res.data.financialEntryCategories.forEach(element => {
                            newOptions.push({'label':element.name,'value':element.id})                            
                        });
                        setCategoryOptions(newOptions)
                    } else if (res.status == 204) {
                        setCategoryOptions(newOptions)
                    } else {
                        throw new Error(res.statusText)
                    }
          })  
        .catch(error => console.log('failed to return category itens '+error))
    }, [entryType])


    useEffect(() => {
      axios.get(SERVER_ENDPOINT + '/creditCard')
        .then(res => {
                    let newOptions = []
                    if (res.status == 200) {
                        res.data.creditCards.forEach(element => {
                            newOptions.push({'label':element.description,'value':element.number})                            
                        });
                        setCreditCardList(newOptions)
                    } else if (res.status == 204) {
                        setCreditCardList(newOptions)
                    } else {
                        throw new Error(res.statusText)
                    }
          })  
        .catch(error => console.log('failed to return credit cards '+error))
    }, [entryType])    


    /*
    --------------------------------------------------------------------------------------
    Função para validar os dados do formulario de movimentação financeira
    --------------------------------------------------------------------------------------
    */
    const preValidateFinancialEntryFormData = function(entryTypeId,financialEntryCategoryId,name,startDate,valueTypeId){
    if (isUndefined(entryTypeId)) {
        return '<entryTypeId> não definido'
    }
    if (isUndefined(financialEntryCategoryId)) {
        return 'Categoria Financeira não preenchida !!'
    }
    if (isUndefined(valueTypeId)) {
        return 'Tipo de Valor não preenchido !!'
    }   
    if (isUndefined(name) || name == '') {
        return 'Por favor, dê um nome para esta movimentação !!!'
    }
    if (isUndefined(startDate) || startDate == '') {
        return 'Por favor, insira uma data de inicio da movimentação !!!'
    }
    }


    /*
    --------------------------------------------------------------------------------------
    Função para uma nova movimentação financeira na base de dados
    --------------------------------------------------------------------------------------
    */
    const postFinancialEntry = async (entryTypeId,financialEntryCategoryId,nameValue,startDate,finishDate,recurrentValue,valueP,creditCardNumber,valueTypeId) => {
        let validationError = preValidateFinancialEntryFormData(entryTypeId,financialEntryCategoryId,nameValue,startDate,valueTypeId)
        if (!isUndefined(validationError)) {
            showInfoMessage(validationError)
            return
        }
        const bodyContent = {};
        if (!isUndefined(creditCardNumber)) {
            bodyContent.credit_card_number = parseInt(creditCardNumber)
        }
        if (!isUndefined(entryTypeId)) {
            bodyContent.entry_type_id = parseInt(entryTypeId)
        }
        if (!isUndefined(financialEntryCategoryId)) {
            bodyContent.financial_entry_category_id = parseInt(financialEntryCategoryId)
        }
        if (!isUndefined(finishDate)) {
            bodyContent.finish_date = finishDate
        }
        if (!isUndefined(nameValue)) {
            bodyContent.name = nameValue
        }
        if (!isUndefined(recurrentValue) || recurrentValue == 0) {
            bodyContent.recurrent = parseInt(recurrentValue)
        } else {
            bodyContent.recurrent = "0"
        }
        if (!isUndefined(startDate)) {
            bodyContent.start_date = startDate
        }
        if (!isUndefined(valueP)) {
            bodyContent.value = parseFloat(valueP)
        }
        if (!isUndefined(valueTypeId)) {
            bodyContent.value_type_id = parseInt(valueTypeId)
        }   

        let url = SERVER_ENDPOINT+'/financialEntry';
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {"Content-type": "application/json"}
        })
            .then((response) => { 
                if (response.ok || (response.status == 400)) {
                    return [response.status,response.json()]
                } else {
                    throw new Error(response.statusText)
                } })
            .then((data) => {
            if (data[0]==200) {
                data[1].then(jsonObject => {
                cleanButtonAction()
                refreshCommand()
                })
            } else {
                data[1].then(jsonObject => {showInfoMessage(jsonObject.message)})
            }
            })
            .catch((error) => {
            showInfoMessage(!isUndefined(error)?error.message:"general failure")
            });
    }    

    /*
    --------------------------------------------------------------------------------------
    Função para validar os dados do formulario de movimentação financeira para atualizacao
    --------------------------------------------------------------------------------------
    */
    const preValidateFinancialEntryFormDataToUpdate = function(id,entryTypeId,financialEntryCategoryId,name,startDate,finishDate,value,recurrent,creditCardNumber,valueTypeId){
    if (isUndefined(id)) {
        return '<entryTypeId> não definido'
    }
    if (isUndefined(entryTypeId)) {
        return '<entryTypeId> não definido'
    }
    if (isUndefined(valueTypeId)) {
        return 'Tipo de Valor não preenchido !!'
    } 
    if (isUndefined(recurrent)) {
        return 'Necessário Informar se a movimentação é recorrente !!'
    }      
    if (isUndefined(financialEntryCategoryId)&&isUndefined(name)&&isUndefined(finishDate)&&isUndefined(startDate)&&isUndefined(value)&&
    isUndefined(recurrent)&&isUndefined(creditCardNumber)&&isUndefined(valueTypeId)) {
        return 'Nenhuma alteração realizada para ser submetida !!'
    }
    }


    /*
    --------------------------------------------------------------------------------------
    Função para uma atualizar movimentação financeira na base de dados
    --------------------------------------------------------------------------------------
    */
    const patchFinancialEntry = async (entryTypeId,financialEntryCategoryId,nameValue,startDate,finishDate,recurrentValue,valueP,creditCardNumber,valueTypeId,id) => {
        let validationError = preValidateFinancialEntryFormDataToUpdate(id,entryTypeId,financialEntryCategoryId,nameValue,startDate,finishDate,valueP,recurrentValue,creditCardNumber,valueTypeId)
        if (!isUndefined(validationError)) {
            showInfoMessage(validationError)
            return
        }        
        const bodyContent = {};
        bodyContent.id = id
        if (!isUndefined(creditCardNumber)) {
            bodyContent.credit_card_number = parseInt(creditCardNumber)
        }
        if (!isUndefined(entryTypeId)) {
            bodyContent.entry_type_id = parseInt(entryTypeId)
        }
        if (!isUndefined(financialEntryCategoryId)) {
            bodyContent.financial_entry_category_id = parseInt(financialEntryCategoryId)
        }
        if (!isUndefined(finishDate)) {
            bodyContent.finish_date = finishDate
        }
        if (!isUndefined(nameValue)) {
            bodyContent.name = nameValue
        }
        if (!isUndefined(recurrentValue) || recurrentValue == 0) {
            bodyContent.recurrent = parseInt(recurrentValue)
        }
        if (!isUndefined(startDate)) {
            bodyContent.start_date = startDate
        }
        if (!isUndefined(valueP)) {
            bodyContent.value = parseFloat(valueP)
        }
        if (!isUndefined(valueTypeId)) {
            bodyContent.value_type_id = parseInt(valueTypeId)
        }   

        let url = SERVER_ENDPOINT+'/financialEntry';
        
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(bodyContent),
            headers: {"Content-type": "application/json"}
        })
            .then((response) => { 
            if (response.ok || (response.status == 400)) {
                return [response.status,response.json()]
            } else {
                throw new Error(response.statusText)
            } })
            .then((data) => {
            if (data[0]==200) {
                data[1].then(jsonObject => {
                    cleanButtonAction()
                    refreshCommand()
                })
            } else {
                data[1].then(jsonObject => {showInfoMessage(jsonObject.message)})
            }
            })                
            .catch((error) => {
            showInfoMessage(error)
            });
    }


    const cleanButtonAction = () => {
        setFinancialEntryData({})
        document.getElementById("financialEntryId").value = undefined
        document.getElementById("financialEntryName").value = ""
        document.getElementById("financialEntryCategory").value = -1
        document.getElementById("financialEntryCreditCard").value = -1
        document.getElementById("financialEntryRecurrent").checked = false
        document.getElementById("financialEntryStartDate").value = undefined
        document.getElementById("financialEntryFinishDate").value = undefined
        document.getElementById("financialEntryValue").value = undefined
        document.getElementById("financialEntryValueType").value = -1
    }

    const formChangeValue = (event) => {
        if (!isUndefined(event) && !isUndefined(event.currentTarget) && !isUndefined(event.currentTarget.id)) {
            let value = event.currentTarget.value
            let checked = event.currentTarget.checked
            switch (event.currentTarget.id) {
                case "financialEntryId":
                    financialEntryData.id = value
                    break
                case "financialEntryName":
                    financialEntryData.name = value
                    break
                case "financialEntryCategory":
                    financialEntryData.financial_entry_category_id = value
                    break
                case "financialEntryCreditCard":
                    financialEntryData.credit_card_number = value
                    break
                case "financialEntryRecurrent":
                    financialEntryData.recurrent = checked?"1":"0"
                    break
                case "financialEntryStartDate":
                    financialEntryData.start_date = value
                    break
                case "financialEntryFinishDate":
                    financialEntryData.finish_date = value
                    break
                case "financialEntryValue":
                    financialEntryData.value = value
                    break
                default:
                    financialEntryData.value_type_id = value
            }
        }
    }

    const doButtonAction = () => {
        if (isUndefined(financialEntryData.id)) {
            postFinancialEntry(entryTypeId,financialEntryData.financial_entry_category_id,financialEntryData.name,financialEntryData.start_date,financialEntryData.finish_date,financialEntryData.recurrent,financialEntryData.value,financialEntryData.credit_card_number,financialEntryData.value_type_id)
        } else {
            patchFinancialEntry(entryTypeId,financialEntryData.financial_entry_category_id,financialEntryData.name,financialEntryData.start_date,financialEntryData.finish_date,financialEntryData.recurrent,financialEntryData.value,financialEntryData.credit_card_number,financialEntryData.value_type_id,financialEntryData.id)
        }
    }

    const returnRecurrentValue = () => {
        return ((!isUndefined(financialEntryData))&&(!isUndefined(financialEntryData.recurrent))&&(financialEntryData.recurrent == "1"))?"on":undefined
    }

    return (
        <div>
            <div style={{display:'flex'}}>
                <Form.Control id="financialEntryId" type="hidden" placeholder="Nome" value={financialEntryData.id} onChange={formChangeValue} />
                <FloatingLabel label="Nome" style={{width:600, paddingBottom:4}}>
                    <Form.Control id="financialEntryName" type="text" placeholder="Nome" value={financialEntryData.name} onChange={formChangeValue} />
                </FloatingLabel>                    
                <FloatingLabel label="Categoria" style={{width:400, paddingLeft:4, paddingBottom:4}}>
                    <Form.Select id="financialEntryCategory" value={financialEntryData.financial_entry_category_id} onChange={formChangeValue}>
                        <option label="Selecionar Valor" disabled selected value={-1}></option>
                        {categoryOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                 ))}
                    </Form.Select>
                </FloatingLabel>                        
                <FloatingLabel label="Cartão de Crédito" style={{width:400, paddingLeft:4, paddingBottom:4}} hidden={entryType!=="expense"}>
                    <Form.Select id="financialEntryCreditCard" value={financialEntryData.credit_card_number} onChange={formChangeValue}>
                        <option label="Selecionar Valor" disabled selected value={-1}></option>
                        {creditCardList.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                 ))}                        
                    </Form.Select>
                </FloatingLabel>
                <div style={{alignItems:'center', display:'flex', paddingLeft:4, paddingBottom:4}}>
                    <Form.Check  enabled id="financialEntryRecurrent" label="Recorrente" value={returnRecurrentValue} onChange={formChangeValue}/>
                </div>
            </div>
            <div style={{display:'flex'}}>
                <FloatingLabel label="Data Inicio" style={{paddingBottom:4}}>
                    <Form.Control id="financialEntryStartDate" type="date" value={financialEntryData.start_date} onChange={formChangeValue}/>
                </FloatingLabel>  
                <FloatingLabel label="Data Fim" style={{paddingLeft:4, paddingBottom:4}}>
                    <Form.Control id="financialEntryFinishDate" type="date" value={financialEntryData.finish_date} onChange={formChangeValue}/>
                </FloatingLabel>   
                <FloatingLabel label="Valor (R$)" style={{width:600}}>
                    <Form.Control id="financialEntryValue" type="number" value={financialEntryData.value} onChange={formChangeValue} />
                </FloatingLabel>
                <FloatingLabel label="Tipo Valor" style={{width:400, paddingLeft:4, paddingBottom:4}}>
                    <Form.Select id="financialEntryValueType" value={financialEntryData.value_type_id} onChange={formChangeValue}>
                        <option label="Selecionar Valor" disabled selected value={-1}></option>
                        <option label="Fixo" value={0}></option>
                        <option label="Variavel" value={1}></option>
                    </Form.Select>
                </FloatingLabel>                       
            </div>
            <div style={{display:'flex', justifyContent:'center', paddingBottom:10}}>
                <div>
                    <Button as="input" onClick={doButtonAction} type="button" value={saveButtonLabel} className='financialActionButton' style={{width:120,borderRadius:'20px 20px 20px 20px',margin:4}} />
                    <Button as="input" onClick={cleanButtonAction} type="button" value="Limpar" className='financialActionButton' style={{width:120,borderRadius:'20px 20px 20px 20px',margin:4}} />
                </div>
            </div>                                  
        </div>
    )
}