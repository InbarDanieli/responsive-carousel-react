import './App.css';

import Carousel from './lib/carousel/Carousel';
import Testy from './testComponent/ContributerCard';

function App() {
  //can also be an object with {github name, contributer want to call in the page name}
  // for ex: {githubName: "InbarDanieli", display-name: "inbar danieli"}
  // from the githubName we can take the image
  const contribiuterNames = ["mr-sparkel", "michal", "inbar", "omri", "inbaro"]
  const maxGapItems = 24
  const minGapItems = 8
  const paddingBodyContainer = 60
  // the required distance between touchStart and touchEnd to be detected as a swipe
  const swipeSensativity = 50
  return (
    <div className="App">
      <Carousel
        title="test"
        contribiuterNames={contribiuterNames}
        maxGapItems={maxGapItems}
        minGapItems={minGapItems}
        paddingBodyContainer={paddingBodyContainer}
        swipeSensativity={swipeSensativity}
      >
        {contribiuterNames.map(name => <Testy contributerName={name}></Testy>)}
      </Carousel>
    </div>
  );
}

export default App;
