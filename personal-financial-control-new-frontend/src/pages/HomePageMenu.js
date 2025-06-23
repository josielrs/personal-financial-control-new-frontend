import { useState, useEffect } from 'react';
import { ProgressBar } from 'smart-webcomponents-react/progressbar';
import { SERVER_ENDPOINT } from '../Utils'

import FinancialEntry from '../components/FinancialEntry';
import axios from 'axios'

import 'smart-webcomponents-react/source/styles/smart.default.css';

export default function HomePageMenu(){

    const initialData = {
        "description": "Sem Informações",
        "difference": 0,
        "expensesAmout": "R$ 0,00",
        "month": 0,
        "reservesAmount": 0,
        "reservesPercent": 0,
        "revenueAmout": "R$ 0,00",
        "year": 0
    }
    const [currentControlMonthData, setCurrentControlMonthData] = useState(initialData)    

    useEffect(() => {
      axios.get(SERVER_ENDPOINT + '/financialControl/currentSummary/')
        .then(res => {
            if (res.status === 200) {
                let receivedData = res.data
                if (receivedData.expensesAmout !== undefined && !!receivedData.expensesAmout && receivedData.expensesAmout > 0) {
                    receivedData.expensesAmout = res.data.expensesAmout.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                } else {
                    receivedData.expensesAmout = "R$ 0,00"
                }
                if (receivedData.revenueAmout !== undefined && !!receivedData.revenueAmout && receivedData.revenueAmout > 0) {
                    receivedData.revenueAmout = res.data.revenueAmout.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                } else {
                    receivedData.revenueAmout = "R$ 0,00"
                }
                setCurrentControlMonthData(receivedData)
            } else if (res.status === 204) {
                setCurrentControlMonthData(initialData)
            } else {
                throw new Error(res.statusText)
            }
          })  
        .catch(error => {
            console.log('failed to return summary data. ' + error)
            setCurrentControlMonthData(initialData)
        })
    }, [])    

    return (
        <div>
            <div>
                <div style={{width: 401, height: 21, left: 365, top: 42, position: 'absolute', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#FD1717', fontSize: 36,
                fontFamily: 'Poppins', fontWeight: '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>{currentControlMonthData.description}</div>
                <div style={{width: 103, height: 21, left: 376, top: 81, position: 'absolute', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 12, fontFamily:
                'Poppins', fontWeight: '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>Total Receitas</div>
                <div style={{width: 200, height: 42, left: 377, top: 98, position: 'absolute', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#000CF2', fontSize: 24, fontFamily: 'Poppins', fontWeight:
                '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>{currentControlMonthData.revenueAmout}</div>
                <div style={{width: 103, height: 21, left: 650, top: 80, position: 'absolute', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 12, fontFamily:
                'Poppins', fontWeight: '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>Total Despesas</div>
                <div style={{width: 195, height: 42, left: 550, top: 98, position: 'absolute', textAlign:'right', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#000CF2', fontSize: 24, fontFamily: 'Poppins', fontWeight:
                '700', textTransform: 'capitalize', wordWrap: 'break-word', direction:'rtl'}}>{currentControlMonthData.expensesAmout}</div>
                <div style={{width: 200, height: 21, left: 374, top: 143, position: 'absolute', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 12, fontFamily:
                'Poppins', fontWeight: '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>Total de Reservas</div>
                <div style={{width:'375px', left: 374, top: 168, borderRadius:'15px 15px 15px 15px',position: 'relative'}}>
                    <ProgressBar theme='purple' rightToLeft={false} showProgressValue value={currentControlMonthData.reservesPercent} max={100} min={0} style={{width:'375px', marginBottom:'5px', marginTop:'5px', borderRadius:'15px 15px 15px 15px', justifyContent:'center', display:'flex', color:'white', backgroundColor:'#A5F8B0'}} />
                </div>
            </div>

            <div style={{width: 918, height: 520, left: 118, top: 235, position: 'absolute', background: 'white', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.04)', borderRadius: 19}}>
                <div style={{width: 918, height: 420.38, left: 0, top: 80, position: 'relative'}}>
                    <FinancialEntry fromScreen={"lastEntries"} />
                </div>
            </div>
            <div style={{width: 226, height: 18, left: 153, top: 262, position: 'absolute', color: 'black', fontSize: 20.11, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>Ultimos Lançamentos</div>                         

        </div>
    )

}
