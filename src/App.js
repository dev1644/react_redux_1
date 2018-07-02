import React, { Component } from 'react';
import{Provider} from "react-redux"
import store from "./store/store";
import RootRouter from './routes/Router';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Provider store={store}>    
         <RootRouter/>
       </Provider>
     
    </div>
    );
  }
}

export default App;
