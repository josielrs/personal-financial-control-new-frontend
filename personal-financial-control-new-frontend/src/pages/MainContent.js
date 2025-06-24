import FinancialEntryMenu from "./FinancialEntryMenu"
import FinancialControlMenu from "./FinancialControlMenu";
import CreditCardMenu from "./CreditCardMenu"
import HomePageMenu from "./HomePageMenu"

export default function MainContent(props){

    const getTagMenuSelected = (value) => {

        switch (value) {
            case "revenue":
                return <FinancialEntryMenu entryType="revenue" />
            case "expense":
                return <FinancialEntryMenu entryType="expense" />
            case "reserve":
                return <FinancialEntryMenu entryType="reserve" />
            case "cartaoDeCredito":
                return <CreditCardMenu />
            case "controle":
                return <FinancialControlMenu />
            default:
                return <HomePageMenu />
        }

    }

    return(
        <div>
            <div data-layer="mainContent" className="Maincontent" style={{width: 1153, height: 814, left: 322, top: 150, position: 'absolute', overflow: 'hidden'}}>
                {getTagMenuSelected(props.menuSelected)}
            </div>
        </div>
    )

}