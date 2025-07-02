import MainContent from '../components/MainContent';

export default function NotFoundPage(){

    return (
      <div className="smartFinApp">
          <div className="smartFinHome">
            <MainContent />
            <div className="subPageContent">
                <div style={{position: 'relative',top:300, left: 100, justifyContent:'center', alignItems:'center'}}>
                    <h3>Oooops! Esta página não existe, acesse via nosso menu lateral :)</h3>
                </div>
            </div>
          </div>
      </div>
    )

}
