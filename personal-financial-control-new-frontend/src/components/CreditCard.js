import { useState, useEffect } from "react"
import { SERVER_ENDPOINT, showInfoMessage, isUndefined } from '../Utils'
import { confirmAlert } from 'react-confirm-alert';

import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import lixeira from '../assets/lixeira-de-reciclagem.png'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function CreditCard(props){

    const [creditCardList, setCreditCardList] = useState([])
    const sortOption = props.sortOption
    const cardInteractionId = props.cardInteractionId
    const onRowSelection = props.onRowSelection
    const hasData = (creditCardList !== undefined) &&
                    !!creditCardList &&
                    creditCardList.length > 0   

    useEffect(() => {
      axios.get(SERVER_ENDPOINT + '/creditCard')
        .then(res => {
            if (res.status === 200) {
                setCreditCardList(res.data.creditCards)
            } else {
                throw new Error(res.statusText)
            }
          })  
        .catch(error => showInfoMessage("Falha ao Retornar dados do servidor: " + error.message))
    }, [cardInteractionId,sortOption])


    const removeInCreditCardGrid = (number) => {
        const indexToRemove = creditCardList.findIndex(item => item.number === number)

        if (indexToRemove !== -1){
            setCreditCardList(creditCardList.filter(item => item.number !== number))
        }
    }                    


    /*
    --------------------------------------------------------------------------------------
    Função para deletar um cartao de credito
    --------------------------------------------------------------------------------------
    */
    const deleteCreditCardInServer = (givenNumber) => {
    let url = SERVER_ENDPOINT+'/creditCard';
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({"number":givenNumber}),
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
                removeInCreditCardGrid(givenNumber)
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
    Função para excluir cartão de crédito
    --------------------------------------------------------------------------------------
    */
    const deleteCreditCard = function(number,description){
        if (isUndefined(number)) {
            showInfoMessage('Número do cartão não selecionado para excluir !!')
        }

        confirmAlert({
            title: 'Excluir Cartão de Crédito',
            message: 'Tem certeza que deseja excluir o cartão {0}'.replace('{0}',description),
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => deleteCreditCardInServer(number)
                },
                {
                    label: 'Não',
                    onClick: () => {return}
                }
            ]
        })
    }


    const deleteClickEvent = {
        onClick: (e, column, columnIndex, row, rowIndex) => {
            e.stopPropagation();
            deleteCreditCard(row.number,row.description)
        }
    }


    const columns = [
            {
                dataField: 'id',
                text: 'ID',
                hidden: true,
                sort: true
            },
            {
                dataField: 'description',
                text: 'Descrição',
                headerStyle: {
                    width: '500px'
                }
            },
            {
                dataField: 'name',
                text: 'Nome',
                hidden: true
            }, 
            {
                dataField: 'credit_card_flag_id',
                text: 'Credit Card Flag ID',
                hidden: true
            },             
            {
                dataField: 'number',
                text: 'Número'
            }, 
            {
                dataField: 'valid_month_date',
                text: 'Mês Validade'
            }, 
            {
                dataField: 'valid_year_date',
                text: 'Ano Validade'
            }, 
            {
                dataField: 'deleteField',
                text: 'Excluir',
                style: {width:'10px', textAlign:'center'},
                formatter: (cell, row, rowIndex) => {
                    return (
                        <span><img src={lixeira} alt="" width="15px" height="15px"/></span>
                    )
                },
                events: deleteClickEvent
            }
        ];

   
    const noDataInfo = () => {
        return <div style={{position: 'relative', padding:'100px 100px 100px 100px', justifyContent:'center', color: 'red', fontSize: 20.11, fontFamily: 'Poppins', fontWeight: '200', wordWrap: 'break-word'}}>Nenhum Lançamento Realizado</div> 
    }

    const paginationOptions = paginationFactory({
                                sizePerPage: 7,
                                sizePerPageList: [7],
                                pageStartIndex: 1,
                                paginationSize: 5,
                                showTotal: true,
                                withFirstAndLast: true, 
                                alwaysShowAllBtns: false,
                                firstPageText: 'Primeiro',
                                prePageText: 'Voltar',
                                nextPageText: 'Avançar',
                                lastPageText: 'Último',
                                hideSizePerPage: true,
                                hidePageListOnlyOnePage: false,
                                paginationTotalRenderer: (from, to, size) => (
                                    <span className="react-bootstrap-table-pagination-total">
                                        Mostrando {from} até {to} de {size} entradas
                                    </span>
                                )
                            }) 

    const rowStyle = {
        whiteSpace: 'nowrap'
    }

    let defaultSort = {dataField:'credit_card_flag_id',order:'asc'}

    switch (sortOption) {
        case "number":
            defaultSort = {dataField:'number',order:'asc'}
            break
        default:
            defaultSort = {dataField:'credit_card_flag_id',order:'asc'}
    }    

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        selected: false,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (onRowSelection !== undefined){
                onRowSelection(row, rowIndex)
            }
        }
    };         

    return (
        <BootstrapTable keyField='id' 
                        data={ creditCardList } 
                        columns={ columns } 
                        bordered={false}
                        hover={hasData} 
                        noDataIndication={noDataInfo}
                        selectRow={selectRow}
                        pagination={paginationOptions}
                        rowStyle={rowStyle}
                        classes="table-borderless"
                        sort={defaultSort} />
    )    
}    