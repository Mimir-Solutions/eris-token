// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "hardhat/console.sol";

import "./abstract/Divine.sol";
import "./dependencies/holyzeppelin/contracts/math/SafeMath.sol";

contract ErisToken is Divine {

    using SafeMath for uint256;

    uint8 public transferFeePercentageX100;
    
    constructor () Divine( "Eris", "ERIS", 18 ) {
        console.log("ErisToken::constructor: Instantiating ErisToken");
        console.log("ErisToken::constructor: Instantiated ErisToken");
    }
}