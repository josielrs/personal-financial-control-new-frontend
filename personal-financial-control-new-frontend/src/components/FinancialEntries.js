import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import lixeira from '../assets/lixeira-de-reciclagem.png'
import {SERVER_ENDPOINT} from '../configs'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function FinancialEntries(props){

    const entryType = props.entryType
    const onRowSelection = props.onRowSelection
    const financialEntryList = props.financialEntryList
    const hasData = (financialEntryList != undefined) &&
                    !!financialEntryList &&
                    financialEntryList.length > 0


    /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
    */
    const deleteFinancialEntryInServer = (givenId,entryTypeId) => {
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
                this.setState()
            } else {
                data[1].then(jsonObject => {alert(jsonObject.message)})
            }
        })
        .catch((error) => {
            alert(error)
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
                onClick: () => deleteFinancialEntryInServer(id,entryTypeId)
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
                hidden: (entryType !== 'lastEntries')
            }, 
            {
                dataField: 'financial_entry_category_name',
                text: 'Categoria',
                hidden: true
            }, 
            {
                dataField: 'credit_card_desc',
                text: 'Cartão de Crédito',
                hidden: (entryType !== 'expense')
            }, 
            {
                dataField: 'recurrent_desc',
                text: 'Recorrente',
                hidden: (entryType !== 'expense')
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
                hidden: (entryType === 'lastEntries')
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
                hidden: (entryType === 'lastEntries')
            }, 
            {
                dataField: 'deleteField',
                text: 'Excluir',
                style: {width:'10px', textAlign:'center'},
                hidden: (entryType !== 'lastEntries'),
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
    
    if (entryType === 'lastEntries'){
        return (
            <BootstrapTable keyField='id' 
                            data={ financialEntryList } 
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
                console.log(row, isSelect, rowIndex, e);
                alert('click row')
            },
            style: { backgroundColor: '#c8e6c9' } // Example style for selected rows
        };          
        return (
            <BootstrapTable keyField='id' 
                            data={ financialEntryList } 
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