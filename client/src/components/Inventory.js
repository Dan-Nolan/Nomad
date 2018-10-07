import React, { Component } from 'react';
import Sidebar from './Sidebar';
import {web3} from './contract/web3util.js';
import {Link} from 'react-router-dom';
import { bytecode, abi } from './contract/NomadAsset.json';
import {connect} from 'react-redux';
import * as tradeActions from '../actions/tradeActions';
import {createSignedOrder} from './contract/tradeUtils';

const nomadAssetAddress = "0x519fdbb1f88cdd992f1624e255cbd7547235bea0";
const contract = new web3.eth.Contract(abi);
contract.options.address = nomadAssetAddress;

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      price: 0,
    }
    this.postTrade = this.postTrade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadBalance()
  }
  handleChange(prop) {
    return ({target}) => this.setState({[prop]: target.value});
  }
  loadBalance() {
    if (web3) {
      web3.eth.getAccounts().then((accounts) => {
        let account = accounts[0];
        if (account) {
          contract.methods.balanceOf(account).call({ from: account }).then((balance) => {
            if(balance > 0) {
              this.setState({
                account,
                items: [{
                  name: 'NOMAD Sword',
                  world: 'BrowserQuest',
                  description: 'It kills everything, 9000!!!!'
                }]
              })
            }
          })
        }
      });
    }
  }
  postTrade() {
    const { createTrade } = this.props;
    const { price } = this.state;
    createSignedOrder(this.state.account, nomadAssetAddress, 0).then((signedOrder) => {
      createTrade({
        item: this.state.items[0],
        account: this.state.account,
        signedOrder,
        price
      });
      this.props.history.push(`/trading`);
    });
  }
  render() {
    const { items } = this.state;
    return (
      <div className="app">
        <Sidebar />
        <div className="inventory content">
          <div className="heading">
            <h1>
              Check out your Items
            </h1>
            <p>
              And see what world they are in!
            </p>
          </div>
          {
            items.map(({name, world, description}) => {
              return (
                <div className="item">
                  <div className="header">
                    <div className="title"> {name} </div>
                  </div>
                  <div className="world"> Currently in world <Link to="/worlds">{world}</Link> </div>
                  <div className="description"> {description} </div>

                  <input placeholder="Trade for ether" onChange={this.handleChange('price')}/>
                  <div className="btn btn-primary" onClick={this.postTrade}> Post Trade </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return({
        createTrade: (trade) => dispatch(tradeActions.create(trade)),
    });
};

export default connect(null, mapDispatchToProps)(Inventory);
