import { useState, useEffect } from "react"
import { SERVER_ENDPOINT, showInfoMessage } from '../Utils'
import { confirmAlert } from 'react-confirm-alert';

import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import lixeira from '../assets/lixeira-de-reciclagem.png'
import { useLocation } from "react-router-dom";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function FinancialEntry(props){

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const [financialEntriesList, setFinancialEntriesList] = useState([])
    const sortOption = props.sortOption
    const fromScreen = (location.pathname !== '/')?searchParams.get("type"):"lastEntries"
    const interactionId = props.interactionId
    const onRowSelection = props.onRowSelection
    const hasData = (financialEntriesList !== undefined) &&
                    !!financialEntriesList &&
                    financialEntriesList.length > 0   
    let descWidth = '600'

    let serviceUrl = ''
    switch (fromScreen) {
        case "revenue":
            serviceUrl = '/financialEntry?entry_type_id=1&last_entries=false'
            descWidth = '500'
            break
        case "expense":
            serviceUrl = '/financialEntry?entry_type_id=2&last_entries=false'
            descWidth = '400'
            break
        case "reserve":
            serviceUrl = '/financialEntry?entry_type_id=3&last_entries=false'
            descWidth = '500'
            break
        default:          
            serviceUrl = '/financialEntry?entry_type_id=0&last_entries=true'
    }

    useEffect(() => {
      axios.get(SERVER_ENDPOINT + serviceUrl)
        .then(res => {
            if (res.status === 200) {
                setFinancialEntriesList(res.data.financialEntries)
            } else if (res.status === 204) {
                setFinancialEntriesList([])
            } else {
                throw new Error(res.statusText)
            }
          })  
        .catch(error => showInfoMessage("Falha ao Retornar dados do servidor: " + error.message))
    }, [sortOption,fromScreen,interactionId,serviceUrl])


    const removeInFinancialEntryListGrid = (id) => {
        const indexToRemove = financialEntriesList.findIndex(item => item.id === id)

        if (indexToRemove !== -1){
            setFinancialEntriesList(financialEntriesList.filter(item => item.id !== id))
        }
    }                    


    /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
    */
    const deleteFinancialEntryInServer = (givenId) => {
    let url = SERVER_ENDPOINT+'/financialEntry';
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({"id":givenId}),
        headers: {"Content-type": "application/json"}
    })
        .then((response) => { 
            if (response === 200 || (response.status === 400)) {
                return [response.status,response.json()]
            } else {
                throw new Error(response.statusText)
            } })  
        .then((data) => {
            if (data[0]===200) {
                removeInFinancialEntryListGrid(givenId)
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
    Função para excluir dados de uma movimentação financeira
    --------------------------------------------------------------------------------------
    */
    const deleteFinancialEntry = function(id,name,entryTypeId){
        if (id === undefined || !id) {
            alert('Identificador não selecionado para excluir !!')
            return
        }

        let entryTypeName = ''
        switch (entryTypeId) {
            case 1:
                entryTypeName = 'Receita'
                break
            case 2:
                entryTypeName = 'Despesa'
                break
            default:
                entryTypeName = 'Reserva'
        }
        
        confirmAlert({
            title: 'Excluir ' + entryTypeName,
            message: 'Tem certeza que deseja excluir a movimentação com nome de [{0}]'.replace('{0}',name),
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => deleteFinancialEntryInServer(id)
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
            deleteFinancialEntry(row.id,row.name,row.entry_type_id)
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
                    width: descWidth+'px'
                }
            },
            {
                dataField: 'name',
                text: 'Nome',
                hidden: true
            }, 
            {
                dataField: 'entry_type_id',
                text: 'Tipo ID',
                hidden: true
            },             
            {
                dataField: 'entry_type_name',
                text: 'Tipo',
                hidden: (fromScreen !== 'lastEntries')
            }, 
            {
                dataField: 'financial_entry_category_name',
                text: 'Categoria',
                hidden: true,
                sort: true
            }, 
            {
                dataField: 'credit_card_desc',
                text: 'Cartão de Crédito',
                hidden: (fromScreen !== 'expense'),
                headerStyle: {
                    width: '220px'
                },
                sort: true
            }, 
            {
                dataField: 'recurrent_desc',
                text: 'Rec.',
                hidden: (fromScreen === 'lastEntries'),
                formatter: (cell, row, rowIndex) => {
                    
                    if (cell !== undefined || !!cell) {
                        if (cell === "SIM") {
                            return (
                                <input type="checkbox" disabled={true} checked/>
                            )
                        }
                    }

                    return (
                        <input type="checkbox" disabled={true} checked={false}/>
                    )
                }
            }, 
            {
                dataField: 'start_date',
                text: 'Dt. Inicio',
                formatter: (cell, row, rowIndex) => {
                    
                    let dateformated = '-'
                    if (cell !== undefined && !!cell) {
                        let valOfDate = new Date(cell+"T00:00:00")
                        const options = {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric"
                        }
                        dateformated = valOfDate.toLocaleString(undefined,options)
                    }

                    return (
                        <span>{dateformated}</span>
                    )
                },
                headerStyle: {
                    width: '95px'
                }
            }, 
            {
                dataField: 'finish_date',
                text: 'Dt. Fim',
                formatter: (cell, row, rowIndex) => {
                    
                    let dateformated = '-'
                    if (cell !== undefined && !!cell) {
                        let valOfDate = new Date(cell+"T00:00:00")
                        const options = {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric"
                        }
                        dateformated = valOfDate.toLocaleString(undefined,options)
                    }

                    return (
                        <span>{dateformated}</span>
                    )
                },
                hidden: (fromScreen === 'lastEntries'),
                headerStyle: {
                    width: '95px'
                }
            }, 
            {
                dataField: 'value',
                text: 'Valor',
                formatter: (cell, row, rowIndex) => {
                    let value = '(não informado)'
                    let colorCel = {color:'gray', fontSize: 12}

                    if ((cell !== undefined || !!cell) && (cell > 0)) {
                        value = cell.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                        if (row.entry_type_id === 1) {
                            colorCel = {color:'green'}
                        } else if (row.entry_type_id === 2) {
                            colorCel = {color:'red'}
                        } else {
                            colorCel = {color:'blue'}
                        }
                    }                    

                    return (
                        <span style={colorCel}>{value}</span>
                    )
                }
            }, 
            {
                dataField: 'value_type_name',
                text: 'F/V',
                hidden: (fromScreen === 'lastEntries'),
                formatter: (cell, row, rowIndex) => {
                    
                    if (cell !== undefined || !!cell) {
                        if (cell === "FIXO") {
                            return (
                                "F"
                            )
                        }
                    }

                    return (
                        "V"
                    )
                },
                sort: true
            }, 
            {
                dataField: 'deleteField',
                text: 'Excluir',
                style: {width:'10px', textAlign:'center'},
                hidden: (fromScreen === 'lastEntries'),
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

    let defaultSort = {dataField:'id',order:'desc'}

    switch (sortOption) {
        case "lastentries":
            defaultSort = {dataField:'id',order:'desc'}
            break
        case "creditCard":
            defaultSort = {dataField:'credit_card_desc',order:'asc'}
            break
        case "valueType":
            defaultSort = {dataField:'value_type_name',order:'asc'}
            break
        default:
            defaultSort = {dataField:'financial_entry_category_name',order:'asc'}
    }

    if (fromScreen === 'lastEntries'){
        return (
            <BootstrapTable keyField='id' 
                            data={ financialEntriesList } 
                            columns={ columns } 
                            bordered={false}
                            hover={hasData} 
                            noDataIndication={noDataInfo}
                            rowStyle={rowStyle}
                            classes="table-borderless" />
        )
    } else {
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
                            data={ financialEntriesList } 
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
}    