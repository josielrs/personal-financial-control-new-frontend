import FinancialEntries from "./FinancialEntries"

export default function FinancialEntry(props){

    const entryType = props.entryType
    const onRowSelection = props.onRowSelection

    const products = [{
      "credit_card_desc": null,
      "credit_card_number": null,
      "description": "string",
      "entry_type_id": 1,
      "entry_type_name": "string",
      "financial_entry_category_id": 0,
      "financial_entry_category_name": "string",
      "finish_date": null,
      "id": 80,
      "name": "string",
      "recurrent": 0,
      "recurrent_desc": "string",
      "start_date": "2025-06-20",
      "value": 1000,
      "value_type_id": 0,
      "value_type_name": "string"
    },{
      "credit_card_desc": null,
      "credit_card_number": null,
      "description": "string",
      "entry_type_id": 2,
      "entry_type_name": "string",
      "financial_entry_category_id": 0,
      "financial_entry_category_name": "string",
      "finish_date": null,
      "id": 1,
      "name": "string",
      "recurrent": 0,
      "recurrent_desc": "string",
      "start_date": "2025-06-20",
      "value": 300,
      "value_type_id": 0,
      "value_type_name": "string"
    },{
      "credit_card_desc": null,
      "credit_card_number": null,
      "description": "string",
      "entry_type_id": 3,
      "entry_type_name": "string",
      "financial_entry_category_id": 0,
      "financial_entry_category_name": "string",
      "finish_date": null,
      "id": 2,
      "name": "string",
      "recurrent": 0,
      "recurrent_desc": "string",
      "start_date": "2025-06-20",
      "value": 250,
      "value_type_id": 0,
      "value_type_name": "string"
    },{
      "credit_card_desc": null,
      "credit_card_number": null,
      "description": "string",
      "entry_type_id": 0,
      "entry_type_name": "string",
      "financial_entry_category_id": 0,
      "financial_entry_category_name": "string",
      "finish_date": null,
      "id": 3,
      "name": "string",
      "recurrent": 0,
      "recurrent_desc": "string",
      "start_date": "2025-06-20",
      "value": null,
      "value_type_id": 0,
      "value_type_name": "string"
    },{
      "credit_card_desc": null,
      "credit_card_number": null,
      "description": "string",
      "entry_type_id": 0,
      "entry_type_name": "string",
      "financial_entry_category_id": 0,
      "financial_entry_category_name": "string",
      "finish_date": null,
      "id": 4,
      "name": "string",
      "recurrent": 0,
      "recurrent_desc": "string",
      "start_date": "2025-06-20",
      "value": null,
      "value_type_id": 0,
      "value_type_name": "string"
    },{
      "credit_card_desc": null,
      "credit_card_number": null,
      "description": "string",
      "entry_type_id": 0,
      "entry_type_name": "string",
      "financial_entry_category_id": 0,
      "financial_entry_category_name": "string",
      "finish_date": null,
      "id": 5,
      "name": "string",
      "recurrent": 0,
      "recurrent_desc": "string",
      "start_date": "2025-06-20",
      "value": null,
      "value_type_id": 0,
      "value_type_name": "string"
    },{
      "credit_card_desc": null,
      "credit_card_number": null,
      "description": "string",
      "entry_type_id": 0,
      "entry_type_name": "string",
      "financial_entry_category_id": 0,
      "financial_entry_category_name": "string",
      "finish_date": null,
      "id": 6,
      "name": "string",
      "recurrent": 0,
      "recurrent_desc": "string",
      "start_date": "2025-06-20",
      "value": null,
      "value_type_id": 0,
      "value_type_name": "string"
    },{
      "credit_card_desc": null,
      "credit_card_number": null,
      "description": "string",
      "entry_type_id": 0,
      "entry_type_name": "string",
      "financial_entry_category_id": 0,
      "financial_entry_category_name": "string",
      "finish_date": null,
      "id": 7,
      "name": "string",
      "recurrent": 0,
      "recurrent_desc": "string",
      "start_date": "2025-06-20",
      "value": null,
      "value_type_id": 0,
      "value_type_name": "string"
    },{
      "credit_card_desc": null,
      "credit_card_number": null,
      "description": "string",
      "entry_type_id": 0,
      "entry_type_name": "string",
      "financial_entry_category_id": 0,
      "financial_entry_category_name": "string",
      "finish_date": null,
      "id": 8,
      "name": "string",
      "recurrent": 0,
      "recurrent_desc": "string",
      "start_date": "2025-06-20",
      "value": null,
      "value_type_id": 0,
      "value_type_name": "string"
    }]

    return (
        <FinancialEntries financialEntryList={products} entryType={entryType} />
    )


}    