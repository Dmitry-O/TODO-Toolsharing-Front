import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
//import {Provider} from 'react-redux';
//import {ConfigureStore} from './redux/configureStore';

//const store = ConfigureStore();

function App() {
  return (
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>
  );
}

export default App;