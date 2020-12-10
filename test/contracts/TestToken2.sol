// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "hardhat/console.sol";

import "../../contracts/dependencies/holyzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../contracts/dependencies/holyzeppelin/contracts/math/SafeMath.sol";
import "../../contracts/dependencies/holyzeppelin/contracts/datatypes/primitives/Address.sol";

contract TestToken2 is ERC20 {

    constructor () ERC20( "TestToken2", "TT2" ) {
        console.log("TestToken2::constructor: Instantiating TestToken2");
        _mint(Context._msgSender(), 50000 * 1**decimals()  );
        console.log("TestToken2::constructor: Instantiated TestToken2");
    }
}