import { useState, useEffect } from "react"
import { isUndefined } from '../Utils'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function FinancialControlEntry(props){

    const interactionId = props.interactionId
    const filterOption = props.filterOption
    const givenFinancialControlEntriesList = props.givenFinancialControlEntriesList
    const onRowSelection = props.onRowSelection
    const hasData = (givenFinancialControlEntriesList !== undefined) &&
                    !!givenFinancialControlEntriesList &&
                    givenFinancialControlEntriesList.length > 0   
    let descWidth = '600'
    let entryTypeId = 1
    switch (filterOption) {
        case "revenue":
            descWidth = '500'
            entryTypeId = 1
            break
        case "expense":
            descWidth = '400'
            entryTypeId = 2
            break
        default:   
            descWidth = '500'
            entryTypeId = 3
    }

    const [filteredEntriesList,setFilteredEntriesList] = useState([])

    useEffect(() => {
        if (!isUndefined(givenFinancialControlEntriesList)) {
            setFilteredEntriesList(givenFinancialControlEntriesList.filter(item => (!isUndefined(item)&&!isUndefined(item.financialEntry))?item.financialEntry.entry_type_id === entryTypeId:false))                        
        } else {
            setFilteredEntriesList([])
        }
    },[givenFinancialControlEntriesList,filterOption,interactionId])

    const columns = [
            {
                dataField: 'financialEntry.id',
                text: 'ID',
                hidden: true,
                sort: true
            },
            {
                dataField: 'financialEntry.description',
                text: 'Descrição',
                headerStyle: {
                    width: descWidth+'px'
                }
            },
            {
                dataField: 'financialEntry.name',
                text: 'Nome',
                hidden: true
            }, 
            {
                dataField: 'financialEntry.entry_type_id',
                text: 'Tipo ID',
                hidden: true
            },             
            {
                dataField: 'financialEntry.entry_type_name',
                text: 'Tipo',
                hidden: true
            }, 
            {
                dataField: 'financialEntry.financial_entry_category_name',
                text: 'Categoria',
                hidden: true,
                sort: true
            }, 
            {
                dataField: 'financialEntry.credit_card_desc',
                text: 'Cartão de Crédito',
                hidden: (filterOption !== 'expense'),
                headerStyle: {
                    width: '220px'
                },
                sort: true
            }, 
            {
                dataField: 'financialEntry.recurrent_desc',
                text: 'Rec.',
                hidden: false,
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
                dataField: 'entryDate',
                text: 'Data',
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
                dataField: 'financialEntry.value_type_name',
                text: 'F/V',
                hidden: false,
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
                dataField: 'financialEntry.value_type_id',
                text: 'Tipo Valor ID',
                hidden: true
            }, 
            {
                dataField: 'month',
                text: 'Mês',
                hidden: true
            }, 
            {
                dataField: 'year',
                text: 'Ano',
                hidden: true
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
        <BootstrapTable keyField='financialEntry.id' 
                        data={ filteredEntriesList } 
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