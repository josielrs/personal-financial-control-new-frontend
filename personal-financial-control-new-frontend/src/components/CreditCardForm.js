import { useState, useEffect, useMemo } from 'react';
import { SERVER_ENDPOINT, showInfoMessage, isUndefined } from '../Utils'

import axios from 'axios'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function CreditCardForm(props){

    const callbackToUpdate = props.callbackFunctionToUpdate
    const givenCreditCardData = useMemo(()=>{
        return isUndefined(props.givenCreditCardData)?{}:props.givenCreditCardData
    },[props.givenCreditCardData]) 
    
    const[creditCardData,setCreditCardData] = useState(givenCreditCardData)
    const[creditCardFlagList, setCreditCardFlagList] = useState([])

    let saveButtonLabel = !isUndefined(creditCardData.id)?"Atualizar":"Salvar"

    const refreshCommand = () => {
        if (!isUndefined(callbackToUpdate)) {
            callbackToUpdate()
        }
    }

    useEffect(() => {
        setCreditCardData(givenCreditCardData)
        if (!isUndefined(givenCreditCardData) && (!isUndefined(givenCreditCardData.id))) {
            document.getElementById("creditCardId").value = givenCreditCardData.id
            document.getElementById("creditCardName").value = givenCreditCardData.name
            document.getElementById("creditCardNumber").value = givenCreditCardData.number
            document.getElementById("creditCardFlag").value = givenCreditCardData.credit_card_flag_id
            document.getElementById("creditCardValidMonth").value = givenCreditCardData.valid_month_date
            document.getElementById("creditCardValidYear").value = givenCreditCardData.valid_year_date
        }
    },[givenCreditCardData])


    useEffect(() => {
      axios.get(SERVER_ENDPOINT + '/creditCardFlag')
        .then(res => {
                    let newOptions = []
                    if (res.status === 200) {
                        res.data.creditCardFlags.forEach(element => {
                            newOptions.push({'label':element.name,'value':element.id})                            
                        });
                        setCreditCardFlagList(newOptions)
                    } else if (res.status === 204) {
                        setCreditCardFlagList(newOptions)
                    } else {
                        throw new Error(res.statusText)
                    }
          })  
        .catch(error => console.log('failed to return credit card flags '+error))
    },[])    



    /*
    --------------------------------------------------------------------------------------
    Função para validar os dados do formulario de cartão de crédito
    --------------------------------------------------------------------------------------
    */
    const preValidateCreditCardFormData = function(number, month, year, idFlag, name){
        if (isUndefined(idFlag)) {
            return 'Bandeira de cartão não selecionada !!!'
        }
        if (isUndefined(name) || name === '') {
            return 'Por favor, dê um nome para este cartão !!!'
        }
        if (isUndefined(month) || month === '') {
            return 'Por favor, insira o mês de vencimento deste cartão !!!'
        }
        if (isUndefined(year) || year === '') {
            return 'Por favor, insira o ano de vencimento deste cartão !!!'
        }
        if (isUndefined(number) || number === '') {
            return 'Por favor, insira o número deste cartão !!!'
        }
    }


    /*
    --------------------------------------------------------------------------------------
    Função para um novo cartão de Credito na base de dados
    --------------------------------------------------------------------------------------
    */
    const postCreditCard = async (number, month, year, idFlag, name) => {
        let validationError = preValidateCreditCardFormData(number,month,year,idFlag,name)
        if (!isUndefined(validationError)) {
            showInfoMessage(validationError)
            return
        }            
        const bodyContent = {};
        if (!isUndefined(number)) {
            bodyContent.number = parseInt(number)
        }
        if (!isUndefined(month)) {
            bodyContent.valid_month_date = parseInt(month)
        }
        if (!isUndefined(year)) {
            bodyContent.valid_year_date = parseInt(year)
        }
        if (!isUndefined(idFlag)) {
            bodyContent.credit_card_flag_id = parseInt(idFlag)
        }
        if (!isUndefined(name)) {
            bodyContent.name = name
        }   

        let url = SERVER_ENDPOINT+'/creditCard';
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {"Content-type": "application/json"}
        })
            .then((response) => { 
                if (response.status === 200 || (response.status === 400)) {
                    return [response.status,response.json()]
                } else {
                    throw new Error(response.statusText)
                } })
            .then((data) => {
            if (data[0]===200) {
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

    /*
    --------------------------------------------------------------------------------------
    Função para validar os dados do formulario de cartao de credito para atualizacao
    --------------------------------------------------------------------------------------
    */
    const preValidateCreditCardFormDataToUpdate = function(number, month, year, idFlag, name){
        if (isUndefined(number)) {
            return 'Número do cartão de crédito é obrigatório.'
        }  
        if (isUndefined(month)&&isUndefined(year)&&isUndefined(idFlag)&&isUndefined(name)) {
            return 'Nenhuma alteração realizada para ser submetida !!'
        }
    }


    /*
    --------------------------------------------------------------------------------------
    Função para uma atualizar cartão de crédito na base de dados
    --------------------------------------------------------------------------------------
    */
    const patchCreditCard = async (number, month, year, idFlag, name) => {
        let validationError = preValidateCreditCardFormDataToUpdate(number,month,year,idFlag,name)
        if (!isUndefined(validationError)) {
            showInfoMessage(validationError)
            return
        }         
        const bodyContent = {};
        if (!isUndefined(number)) {
            bodyContent.number = parseInt(number)
        }
        if (!isUndefined(month)) {
            bodyContent.valid_month_date = parseInt(month)
        }
        if (!isUndefined(year)) {
            bodyContent.valid_year_date = parseInt(year)
        }
        if (!isUndefined(idFlag)) {
            bodyContent.credit_card_flag_id = idFlag
        }
        if (!isUndefined(name)) {
            bodyContent.name = name
        }

        let url = SERVER_ENDPOINT+'/creditCard';
        
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(bodyContent),
            headers: {"Content-type": "application/json"}
        })
            .then((response) => { 
            if (response.status === 200 || (response.status === 400)) {
                return [response.status,response.json()]
            } else {
                throw new Error(response.statusText)
            } })
            .then((data) => {
            if (data[0]===200) {
                cleanButtonAction()
                refreshCommand()
            } else {
                data[1].then(jsonObject => {showInfoMessage(jsonObject.message)})
            }
            })                
            .catch((error) => {
            showInfoMessage(error)
            });
    }


    const cleanButtonAction = () => {
        setCreditCardData({})
        document.getElementById("creditCardId").value = undefined
        document.getElementById("creditCardName").value = ""
        document.getElementById("creditCardNumber").value = undefined
        document.getElementById("creditCardFlag").value = -1
        document.getElementById("creditCardValidMonth").value = undefined
        document.getElementById("creditCardValidYear").value = undefined
    }

    const formChangeValue = (event) => {
        if (!isUndefined(event) && !isUndefined(event.currentTarget) && !isUndefined(event.currentTarget.id)) {
            let value = event.currentTarget.value
            switch (event.currentTarget.id) {
                case "creditCardId":
                    creditCardData.id = value
                    break
                case "creditCardName":
                    creditCardData.name = value
                    break
                case "creditCardNumber":
                    creditCardData.number = value
                    break
                case "creditCardFlag":
                    creditCardData.credit_card_flag_id = value
                    break
                case "creditCardValidMonth":
                    creditCardData.valid_month_date = value
                    break
                default:
                    creditCardData.valid_year_date = value
            }
        }
    }

    const doButtonAction = () => {
        if (isUndefined(creditCardData.id)) {
            postCreditCard(creditCardData.number,creditCardData.valid_month_date,creditCardData.valid_year_date,creditCardData.credit_card_flag_id,creditCardData.name)
        } else {
            patchCreditCard(creditCardData.number,creditCardData.valid_month_date,creditCardData.valid_year_date,creditCardData.credit_card_flag_id,creditCardData.name)
        }
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Form.Control id="creditCardId" type="hidden" placeholder="Nome" onChange={formChangeValue} />
                <FloatingLabel label="Bandeira" style={{width:250, paddingLeft:4, paddingBottom:4}}>
                    <Form.Select id="creditCardFlag" defaultValue={-1} onChange={formChangeValue}>
                        <option label="Selecionar Valor" disabled value={-1}></option>
                        {creditCardFlagList.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                 ))}
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel label="Nome" style={{width:400, paddingBottom:4}}>
                    <Form.Control id="creditCardName" type="text" onChange={formChangeValue} />
                </FloatingLabel>      
                <FloatingLabel label="Numero" style={{width:100, paddingBottom:4}}>
                    <Form.Control id="creditCardNumber" type="number" onChange={formChangeValue} />
                </FloatingLabel>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>     
                <FloatingLabel label="Mês Validade" style={{width:150, paddingBottom:4}}>
                    <Form.Control id="creditCardValidMonth" type="number" onChange={formChangeValue} />
                </FloatingLabel>      
                <FloatingLabel label="Ano Validade" style={{width:150, paddingBottom:4}}>
                    <Form.Control id="creditCardValidYear" type="number" onChange={formChangeValue} />
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