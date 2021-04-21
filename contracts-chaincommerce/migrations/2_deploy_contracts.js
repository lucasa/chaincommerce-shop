var ChainCommerce = artifacts.require("ChainCommerce");

module.exports = function (deployer) {
  deployer.deploy(ChainCommerce,  {gas: 4500000});
};


// var purchase = artifacts.require("Purchase");
// deployer.deploy(purchase,  {gas: 4500000}).then(() => { return deployer.deploy(chainCommerce),  {gas: 4500000} });
// var ChainCommerce = artifacts.require("./ChainCommerce.sol");
// console.log("deployer.deploy", ChainCommerce);
// // module.exports = function(deployer, network, accounts) {
// module.exports = function(deployer) {
//   deployer.deploy(ChainCommerce);
//   console.log("AFTER ChainCommerce.address ", ChainCommerce.address)
// };
