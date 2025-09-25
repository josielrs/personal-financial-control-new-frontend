import { useState, useEffect } from "react"
import { showInfoMessage } from '../Utils'

import axios from 'axios'


export default function DollarCotation(props){

    const [cotationValue, setCotationValue] = useState([])

    const dataAtual = new Date()
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');   

    let serviceUrl = 'https://brasilapi.com.br/api/cambio/v1/cotacao/USD/' + `${ano}${mes}${dia}`

    useEffect(() => {
      axios.get(serviceUrl,{fetchOptions: {mode: 'no-cors'}})
        .then(res => {
            if (res.status === 200) {
                if (!!res.data.cotacoes) {
                    for (let item of res.data.cotacoes){
                        if (!!item && !!item.cotacao_venda) {
                            setCotationValue(item.cotacao_venda);
                            break;
                        }
                    }
                }
            } else {
                throw new Error(res.statusText)
            }
          })  
        .catch(error => showInfoMessage("Falha ao Retornar dados do servidor: " + error.message))
    }, [])

        return (
            <label>Cotação do Dolar Hoje {cotationValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
        )
}    