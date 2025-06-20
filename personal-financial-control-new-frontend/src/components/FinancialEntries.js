import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function FinancialEntries(props){

    const entryType = props.entryType
    const onRowSelection = props.onRowSelection
    const financialEntryList = props.financialEntryList

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
                text: 'Inicia Em'
            }, 
            {
                dataField: 'finish_date',
                text: 'Finaliza Em',
                hidden: (entryType === 'lastEntries')
            }, 
            {
                dataField: 'value',
                text: 'Valor',
                style: {'width':'1px'}
            }, 
            {
                dataField: 'value_type_name',
                text: 'Tipo Valor',
                hidden: (entryType === 'lastEntries')
            }, 
            {
                dataField: 'deleteField',
                text: 'Excluir',
                hidden: (entryType === 'lastEntries')
            }
        ];

    const rowStyle = (row, rowIndex) => {
        if ((rowIndex === 0) || ((rowIndex%2)===0)){
            return {backgroundColor:'white', borderStyle:'none'}
        } else {
            return {backgroundColor:'red', borderStyle:'none'}
        }
    };    
    
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

    if (entryType !== 'lastEntries'){
        return (
            <BootstrapTable keyField='id' 
                            data={ financialEntryList } 
                            columns={ columns } 
                            bordered={false} 
                            rowStyle={rowStyle} 
                            hover={true} 
                            noDataIndication={noDataInfo} />
        )
    } else {
        return (
            <BootstrapTable keyField='id' 
                            data={ financialEntryList } 
                            columns={ columns } 
                            bordered={false} 
                            rowStyle={rowStyle} 
                            hover={true} 
                            noDataIndication={noDataInfo}
                            pagination={paginationFactory(paginationOptions)} />
        )
    }

}