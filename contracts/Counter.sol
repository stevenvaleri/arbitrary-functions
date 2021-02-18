//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";


contract Counter {
  uint256 public counter = 0;

  function increase(uint256 additional) public {
    counter = counter + additional;
  }
}
