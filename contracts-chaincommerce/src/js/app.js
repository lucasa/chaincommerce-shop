App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    let w = App.initWeb3();
    console.log('App.init web3 ', w);
    return w;
  },

  initWeb3: function () {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    }

    let c = App.initContract();
    console.log('App.initContract ', c);
    return c;
  },

  initContract: function () {
    $.getJSON('CPTToken.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TokenArtifact = data;
      App.contracts.Token = TruffleContract(TokenArtifact);

      // Set the provider for our contract.
      App.contracts.Token.setProvider(App.web3Provider);

      console.log('App provider set to ', App);
      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },

  handleTransfer: function (event) {
    console.log('App.handleTransfer event ', event);
    event.preventDefault();

    var amount = parseInt($('#TTTransferAmount').val());
    var toAddress = $('#TTTransferAddress').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var tutorialTokenInstance;

    console.log('App.handleTransfer going to get web3.eth.getAccounts...');
    web3.eth.getAccounts(function (error, accounts) {
      console.log('web3.eth.getAccounts ', error, accounts);
      if (error) {
        console.log('Error');
        console.log(error);
      }

      var account = accounts[0];
      console.log('Accounts ', accounts);
      console.log('Accounts choosed ', account);

      App.contracts.Token.deployed().then(function (instance) {
        tokenInstance = instance;

        return tokenInstance.transfer(toAddress, amount, { from: account, gas: 100000 });
      }).then(function (result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function () {
    console.log('Getting balances...');

    var tutorialTokenInstance;

    console.log('App.getBalances going to get web3.eth.getAccounts...');
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log('Accounts ', accounts);
      console.log('Accounts choosed ', account);

      App.contracts.Token.deployed().then(function (instance) {
        tutorialTokenInstance = instance;

        return tutorialTokenInstance.balanceOf(account);
      }).then(function (result) {
        balance = result.c[0];

        $('#TTBalance').text(balance);
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
