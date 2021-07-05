import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom';

function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={NewRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
