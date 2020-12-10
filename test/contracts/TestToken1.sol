// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "hardhat/console.sol";

import "../../contracts/dependencies/holyzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../contracts/dependencies/holyzeppelin/contracts/math/SafeMath.sol";
import "../../contracts/dependencies/holyzeppelin/contracts/datatypes/primitives/Address.sol";

contract TestToken1 is ERC20 {

    using SafeMath for uint256;
    using Address for address;

    constructor () ERC20( "TestToken1", "TT1" ) {
        console.log("TestToken1::constructor: Instantiating TestToken1");
        _mint(Context._msgSender(), 50000 * 1**decimals()  );
        console.log("TestToken1::constructor: Instantiated TestToken1");
    }
}