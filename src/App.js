import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lotto from './lotto';


class App extends Component {
  state = {
    mananger: '',
    players: [],
    balance: '',
    value: ''
  }
  async componentDidMount(){
    const manager = await lotto.methods.manager().call();
    const players = await lotto.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lotto.options.address);
    this.setState({manager, players, balance});
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    await lotto.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWeir(this.state.value, 'ether')
    });

  }


  render() {
    // console.log(web3.version);
    web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lotto Contract</h2>
        <p>This contract is managed by {this.state.manager}. There are currently {this.state.players.length} people entered competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your Luck?</h4>
          <div>
            <label> Amount of ether to enter:</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default App;
