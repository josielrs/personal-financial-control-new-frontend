import { useState } from 'react';
import { SERVER_ENDPOINT, showInfoMessage } from '../Utils'
import { confirmAlert } from 'react-confirm-alert';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import lixeira from '../assets/lixeira-de-reciclagem.png'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function FinancialEntries(props){

    const fromScreen = props.fromScreen
    const onRowSelection = props.onRowSelection
    const[ financialEntryListGrid, setFinancialEntryListGrid ] = useState(props.financialEntryList)
    const hasData = (financialEntryListGrid != undefined) &&
                    !!financialEntryListGrid &&
                    financialEntryListGrid.length > 0
               
    const removeInFinancialEntryListGrid = (id) => {
        const indexToRemove = financialEntryListGrid.findIndex(item => item.id == id)

        if (indexToRemove !== -1){
            setFinancialEntryListGrid(financialEntryListGrid.filter(item => item.id != id))
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
            if (response.ok || (response.status == 400)) {
                return [response.status,response.json()]
            } else {
                throw new Error(response.statusText)
            } })  
        .then((data) => {
            if (data[0]==200) {
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
        if (id == undefined || !id) {
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
                hidden: true
            },
            {
                dataField: 'description',
                text: 'Descrição'
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
                hidden: true
            }, 
            {
                dataField: 'credit_card_desc',
                text: 'Cartão de Crédito',
                hidden: (fromScreen !== 'expense')
            }, 
            {
                dataField: 'recurrent_desc',
                text: 'Recorrente',
                hidden: (fromScreen === 'lastEntries')
            }, 
            {
                dataField: 'start_date',
                text: 'Inicia Em',
                formatter: (cell, row, rowIndex) => {
                    
                    let dateformated = '-'
                    if (cell != undefined || !!cell) {
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
                }
            }, 
            {
                dataField: 'finish_date',
                text: 'Finaliza Em',
                formatter: (cell, row, rowIndex) => {
                    
                    let dateformated = '-'
                    if (cell != undefined || !!cell) {
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
                hidden: (fromScreen === 'lastEntries')
            }, 
            {
                dataField: 'value',
                text: 'Valor',
                formatter: (cell, row, rowIndex) => {
                    let value = '(não informado)'
                    let colorCel = {color:'gray', fontSize: 12}

                    if ((cell != undefined || !!cell) && (cell > 0)) {
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
                text: 'Tipo Valor',
                hidden: (fromScreen === 'lastEntries')
            }, 
            {
                dataField: 'deleteField',
                text: 'Excluir',
                style: {width:'10px', textAlign:'center'},
                hidden: (fromScreen === 'lastEntries'),
                formatter: (cell, row, rowIndex) => {
                    return (
                        <span><img src={lixeira} width="15px" height="15px"/></span>
                    )
                },
                events: deleteClickEvent
            }
        ];

   
    const noDataInfo = () => {
        return <div style={{position: 'relative', padding:'100px 100px 100px 100px', justifyContent:'center', color: 'red', fontSize: 20.11, fontFamily: 'Poppins', fontWeight: '200', wordWrap: 'break-word'}}>Nenhum Lançamento Realizado</div> 
    }

    const paginationOptions = {
                                pageStartIndex: 1,
                                paginationSize: 5,
                                showTotal: true,
                                withFirstAndLast: true, 
                                alwaysShowAllBtns: true,
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
                            } 

    if (fromScreen === 'lastEntries'){
        return (
            <BootstrapTable keyField='id' 
                            data={ financialEntryListGrid } 
                            columns={ columns } 
                            bordered={false}
                            hover={hasData} 
                            noDataIndication={noDataInfo}
                            classes="table-borderless" />
        )
    } else {
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                if (onRowSelection != undefined){
                    onRowSelection(row, rowIndex)
                }
            }
        };          
        return (
            <BootstrapTable keyField='id' 
                            data={ financialEntryListGrid } 
                            columns={ columns } 
                            bordered={false}
                            hover={hasData} 
                            noDataIndication={noDataInfo}
                            selectRow={selectRow}
                            pagination={paginationFactory(paginationOptions)}
                            classes="table-borderless" />
        )
    }
}