import Web3 from 'web3';

//create new instance of web3 and take provider from metamask in browser
const web3 = new Web3(window.web3.currentProvider);

export default web3;

