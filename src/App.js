import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lotto from './lotto';


class App extends Component {
  state = {
    mananger: '',
    players: [],
    balance: ''
  }
  async componentDidMount(){
    const manager = await lotto.methods.manager().call();
    const players = await lotto.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lotto.options.address);
    this.setState({manager, players, balance});
  }
  render() {
    // console.log(web3.version);
    web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lotto Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
}

export default App;
