// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "hardhat/console.sol";

import "../dependencies/holyzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "../dependencies/holyzeppelin/contracts/security/Context.sol";

/**
 * Intended to gather other abstract contracts and interfaces for Eris.
 */
abstract contract Divine is ERC20Burnable {

    // using Bytes32 for bytes32;

    // bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor ( string memory name_, string memory symbol_, uint8 decimals_ ) ERC20( name_, symbol_, decimals_ ) {
        console.log("Divine::constructor: Instantiating Divine");
        console.log("Divine::constructor: Instantiated Divine");
    }
}