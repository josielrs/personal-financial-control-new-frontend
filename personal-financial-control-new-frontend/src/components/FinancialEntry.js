import { useState, useEffect } from "react"
import { SERVER_ENDPOINT, showInfoMessage } from '../Utils'
import FinancialEntries from "./FinancialEntries"
import axios from 'axios'

export default function FinancialEntry(props){

    const [financialEntriesList, setFinancialEntriesList] = useState([])
    const fromScreen = props.fromScreen
    const onRowSelection = props.onRowSelection

    let serviceUrl = ''
    switch (fromScreen) {
        case "revenue":
            serviceUrl = '/financialEntry?entry_type_id=1'
            break
        case "expense":
            serviceUrl = '/financialEntry?entry_type_id=2'
            break
        case "reserve":
            serviceUrl = '/financialEntry?entry_type_id=3'
            break            
        default:          
            serviceUrl = '/financialEntry?entry_type_id=0&last_entries=true'
    }

    
    useEffect(() => {
      axios.get(SERVER_ENDPOINT + serviceUrl)
        .then(res => {
           setFinancialEntriesList(res.data.financialEntries)
          })  
        .catch(error => showInfoMessage(error))
    }, [])


    return (
        <FinancialEntries financialEntryList={financialEntriesList} fromScreen={fromScreen} noRowSelection={onRowSelection} />
    )
}    