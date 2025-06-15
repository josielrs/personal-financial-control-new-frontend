import FinancialEntryMenu from "./FinancialEntryMenu"
import FinancialControlMenu from "./FinancialControlMenu";
import CreditCardMenu from "./CreditCardMenu"
import HomePageMenu from "./HomePageMenu"

export default function MainContent(props){

    const getTagMenuSelected = (value) => {

        switch (value) {
            case "receita":
                return <FinancialEntryMenu entryType="receita" />
            case "despesa":
                return <FinancialEntryMenu entryType="despesas" />
            case "reserva":
                return <FinancialEntryMenu entryType="reserva" />
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