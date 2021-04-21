
# ChainCommerce Web3 ETH Shop Demo

This is a experiental demo project to test integration of a online shop with the Ethereum Blockchain.
Technologies: Polymer WebComponents, Truffle, Ganache, Web3...

The "shop/" folder has a polymer single-page-application demo with custom components implemented by me to use Web3 and Truffle framework to manage the integration with the remote Ethereum contracts.

Carbono Web Components are developed by: lucasa at gmail | twitter.com/lucasa


## SETUP

#### Install NodeJS e NPM

    https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt

#### Install local blockchain e tools as global programs:
    
    sudo npm install -g truffle ganache-cli bower

#### Install dependencies
    
    cd contracts-workspace/
    npm install

## BUILD
### Compile and Migrate the contracts

    cd chaincommerce-shop/contracts-chaincommerce
    sh deploy_contract_shop.sh

The contract specification JSON file was copied to the "shop/contracts/".

## Start Ethereum Development Node

In a new terminal, start a local ethereum node.

### Ganache Cli
    ganache-cli -p 9545

### Ganache UI (download from Truffle's site)
    ~/Downloads/ganache-1.2.2-x86_64.AppImage


## RUN

## Deploy Demo Products

Call manually a contract method to register offers of demo products:

* ProductID: "teste"

    truffle console
    truffle(development)> ChainCommerce.deployed().then(instance => instance.setupDemo('teste', {value:11111111111})).then(result => storeData = result)

## Run the Shop

#### Start a local simple web server

    cd chaincommerce-shop/shop
    polymer serve

Open the shop at: http://127.0.0.1:8081/

Buy some product and see the account balance.
The tax to convert the price from Dolar to Eth can be adjusted (price[2018] DOLAR_ETH = 0.004347826 ).

# More Information

- Polymer Shop Documentation: https://www.polymer-project.org/3.0/toolbox/case-study

- Truffle Contract Tutorial: https://truffleframework.com/tutorials/pet-shop


