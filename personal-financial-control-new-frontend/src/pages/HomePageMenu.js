import { ProgressBar } from 'smart-webcomponents-react/progressbar';

export default function HomePageMenu(){

    const lastValidControl = "Janeiro/2025"
    const totalRevenue = "R$ 1250,00"
    const totalExpenses = "R$ 2300,00"
    const percent = 80

    return (
        <div>
            <div>
                <div style={{width: 301, height: 21, left: 395, top: 42, position: 'absolute', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#FD1717', fontSize: 36,
                fontFamily: 'Poppins', fontWeight: '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>{lastValidControl}</div>
                <div style={{width: 103, height: 21, left: 376, top: 81, position: 'absolute', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 12, fontFamily:
                'Poppins', fontWeight: '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>Total Receitas</div>
                <div style={{width: 147, height: 42, left: 377, top: 98, position: 'absolute', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#000CF2', fontSize: 24, fontFamily: 'Poppins', fontWeight:
                '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>{totalRevenue}</div>
                <div style={{width: 103, height: 21, left: 650, top: 80, position: 'absolute', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 12, fontFamily:
                'Poppins', fontWeight: '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>Total Despesas</div>
                <div style={{width: 195, height: 42, left: 550, top: 98, position: 'absolute', textAlign:'right', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#000CF2', fontSize: 24, fontFamily: 'Poppins', fontWeight:
                '700', textTransform: 'capitalize', wordWrap: 'break-word', direction:'rtl'}}>{totalExpenses}</div>
                <div style={{width: 148, height: 21, left: 374, top: 143, position: 'absolute', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 12, fontFamily:
                'Poppins', fontWeight: '700', textTransform: 'capitalize', wordWrap: 'break-word'}}>Total de Reservas</div>
                <div style={{width:'375px', left: 374, top: 168, borderRadius:'15px 15px 15px 15px',position: 'relative'}}>
                    <ProgressBar rightToLeft={false} showProgressValue value={percent} max={100} min={0} style={{width:'375px', marginBottom:'5px', marginTop:'5px', borderRadius:'15px 15px 15px 15px', justifyContent:'center', display:'flex', color:'white', backgroundColor:'#A5F8B0'}}></ProgressBar>
                </div>
            </div>

            <div style={{width: 918, height: 488.38, left: 118, top: 235, position: 'absolute', background: 'white', boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.04)', borderRadius: 19}} />
            <div style={{width: 226, height: 18, left: 153, top: 262, position: 'absolute', color: 'black', fontSize: 20.11, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>Ultimos Lançamentos</div>              
        </div>
    )

}
