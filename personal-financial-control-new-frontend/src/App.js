import MainContent from "./components/MainContent";
import InitialInformation from "./components/InitialInformation"

function App() {

  return (
      <div className="smartFinApp">
          <div className="smartFinHome">
            <MainContent />
            <div className="subPageContent">
                <InitialInformation />
            </div>
          </div>
      </div>
  );
}

export default App;
