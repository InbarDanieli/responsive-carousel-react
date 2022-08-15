import './App.css';
import Contribiuters from './component/contribiuters/Contribiuters';

function App() {
  //can also be an object with {github name, contributer want to call in the page name}
  // for ex: {githubName: "InbarDanieli", display-name: "inbar danieli"}
  // from the githubName we can take the image
const contributersInfo = ["mr-sparkel", "michal" , "inbar", "omri", "inbaro"]

  return (
    <div className="App">
      <Contribiuters contribiuterNames={contributersInfo}/>
    </div>
  );
}

export default App;
