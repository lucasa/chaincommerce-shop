pragma solidity ^0.4.24;

contract ChainCommerce  {

    event NewProduct(string productName, uint price, address seller);
    event NewUser(string userName);
    event NewBuy(string productID, uint price, address sellerAddress, address buyerAddress);
    event ProductReceived(string productID);

    event DEBUG_NUMBER(string text, uint value);
    event DEBUG_ADDRESS(string text, address data);
    event DEBUG_STRING(string text, string data);

    constructor() public { }

    function buyOffer(string _productIds, string _buyerEmail, address _sellerAddress)
    public
    payable
    {
        emit DEBUG_STRING("buy product id", _productIds);

        // anynone can buy
        emit DEBUG_ADDRESS("buyer", msg.sender);
        
        // transfer from contract to buyer
        _sellerAddress.transfer(msg.value); // TODO: retain some taxs

        emit DEBUG_NUMBER("buyer payed value", msg.value);
        emit DEBUG_ADDRESS("buyer transfered value to seller", _sellerAddress);

        emit NewBuy(_productIds, msg.value, _sellerAddress, msg.sender);
        
    }
}
