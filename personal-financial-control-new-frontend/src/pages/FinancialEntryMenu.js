import { useState } from 'react';
import FinancialEntry from '../components/FinancialEntry';
import { TextBox } from 'smart-webcomponents-react/textbox';
import { Select } from 'smart-webcomponents-react/Select';
import ReserveIcon from "../assets/ReserveIcon.svg"
import RevenueIcon from "../assets/RevenueIcon.svg"
import ExpensesIcon from "../assets/ExpensesIcon.svg"

import 'smart-webcomponents-react/source/styles/smart.default.css';



export default function FinancialEntryMenu(props){

    const initialData = {}
    const entryType = props.entryType

    const [financiaEntryCurrentData, setFinancialEntryCurrentData] = useState(initialData)    

    let screenName = ''
    let screenIcon = ReserveIcon

    switch (entryType) {
        case "revenue":
            screenName = 'RECEITAS'
            screenIcon = RevenueIcon
            break
        case "expense":
            screenName = 'DESPESAS'
            screenIcon = ExpensesIcon
            break
        default:
            screenName = 'RESERVAS'
            screenIcon = ReserveIcon
    }

          const options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ];

      const [selectedItem, setSelectedItem] = useState(null);

      const handleChange = (event) => {
        setSelectedItem(event.detail.value);
        console.log("Selected item:", event.detail.value);
      };


    return (
        <div>
  


            <div className="Rectangle53" style={{width: 1148.26, height: 763.83, top:300,  background: 'white', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                <div style={{width: 1060.39, height: 60.27, top: 10, left: 40, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', background: '#DFF7E2', boxShadow: '0px 1.3224623203277588px 1.3224623203277588px rgba(0, 0, 0, 0.50)', borderRadius: 12.89}}>
                    <div data-size="48" style={{width: 48, height: 48, position: 'relative',  display:'flex'}}>
                        <img src={screenIcon}></img>
                    </div>
                    <div style={{color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', position:'relative'}}>&nbsp;&nbsp;{screenName}</div>
                </div>
                <div style={{width: 1060.39, height: 60.27, top: 50, left: 10, position:'relative'}}>
                    <TextBox label='Nome' />
                    <Select
            dataSource={options}
            onChange={handleChange}
            value={selectedItem}
            displayMember="label"
            valueMember="value"
          />
                </div>
                <div style={{width: 1120, height: 420.38, left: 10, top: 270, position: 'relative', background: 'white', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.04)', borderRadius: 19}}>
                    <FinancialEntry fromScreen={entryType} />
                </div>                      
            </div>
        </div>
    )

}
