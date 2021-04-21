const Web3 = require("web3");
const truffleAssert = require('truffle-assertions');
const ChainCommerce = artifacts.require("ChainCommerce");
const web3 = new Web3();

contract("ChainCommerce", accounts => {
    const [firstAccount, secondAccount] = accounts;

    beforeEach(async () => {
        coommerce = await ChainCommerce.new();
    });

    it("offer one product", async () => {
        var _username = "fulano";
        var _email = "fulano@gmail.com";
        var _img = "http://chaincommerce.cc/qrcode.png";
        var _info = "{'some json'}";
        var _productName = "Test Product";

        // string _userName, string _email, string _productName, string _img, string _info
        var result = await coommerce.publishOffer(_username, _email, _productName, _img, _info);

        truffleAssert.eventEmitted(result, 'NewUser', (ev) => {
            console.log("new user ", ev);
            return ev.userName == _username;
        });

        truffleAssert.eventEmitted(result, 'NewProduct', (ev) => {
            console.log("new product ", ev);
            return ev.productName == _productName;
        });

        const users = await coommerce.getAllUsers.call();
        console.log("users ", users);
        assert.equal(users.length, 1, "One user most be registered!");

        var id = users[0];
        var offer = await coommerce.dumpOffer(id);
        console.log("offer ", offer);
        var [prod, im, inf, price, us, contr] = offer;
        assert.equal(prod, "Test Product", "The product name is not correct!");
        assert.equal(us, firstAccount, "The seller is wrong!");
    });

    it("buy one product", async () => {
        var _username = "fulano";
        var _email = "fulano@gmail.com";
        var _img = "http://chaincommerce.cc/qrcode.png";
        var _info = "{'some json'}";
        var _productName = "Test Product";
        var _price = 5;
        var result = await coommerce.publishOffer(_username, _email, _productName, _img, _info, { from: firstAccount, value: web3.utils.toWei((_price * 2).toString(), "finney") });

        var id = firstAccount;
        // buy, the price is 10/2
        var result = await coommerce.buyOffer(id, { from: secondAccount, value: web3.utils.toWei((_price * 2).toString(), "finney") });

        // truffleAssert.eventEmitted(result, 'DEBUG', (ev) => {
        //     console.log("DEBUG ", ev);
        // });

        truffleAssert.eventEmitted(result, 'NewBuy', (ev) => {
            console.log("new product ", ev);
            return ev.productName == _productName && ev.id == id;
        }, "A NewBuy event must be emitted!");

        var state = await coommerce.getNegotiationState(firstAccount);
        console.log("state ", state);
        assert.equal(state, "Locked", "The negotiation has to be at Locked!");
    });

    it("confirm product", async () => {
        var _username = "fulano";
        var _email = "fulano@gmail.com";
        var _img = "http://chaincommerce.cc/qrcode.png";
        var _info = "{'some json'}";
        var _productName = "Test Product";
        var _price = 5;
        var result = await coommerce.publishOffer(_username, _email, _productName, _img, _info, { from: firstAccount, value: web3.utils.toWei((_price * 2).toString(), "finney") });

        var id = firstAccount;
        // buy, the price is 10/2
        var result = await coommerce.buyOffer(id, { from: secondAccount, value: web3.utils.toWei((_price * 2).toString(), "finney") });

        var result = await coommerce.confirmReceived(id, { from: secondAccount });
        // truffleAssert.eventEmitted(result, 'DEBUG', (ev) => {
        //     console.log("DEBUG ", ev);
        // }, false);
        var state = await coommerce.getNegotiationState(firstAccount);
        console.log("state after confirm receive", state);
        assert.equal(state, "Inactive", "The negotiation has to be at Locked!");
    });
});