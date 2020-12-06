// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.4;

import "hardhat/console.sol";

import "./abstract/Divine.sol";
import "./dependencies/holyzeppelin/contracts/utils/math/SafeMath.sol";

contract ErisToken is Divine {

    using SafeMath for uint256;

    uint8 public transferFeePercentageX100;
    
    constructor () Divine( "ERIS", "ERIS" ) {
        console.log("ERIS::constructor: Instantiating ERIS");
        // transferFeePercentageX100 = 100;
        // uint256 amountToMint_ = 50000 * 1e18;
        // console.log("Minting %s ERIS.", amountToMint_ );
        // _mint(Context._msgSender(), amountToMint_  );
        // console.log("Minted %s ERIS.", totalSupply());
        console.log("ERIS::constructor: Instantiated ERIS");
    }
}