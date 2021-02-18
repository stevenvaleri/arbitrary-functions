//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";


contract ArbitraryFunctions {
  string greeting;

  bytes4 funnctionSigIncrease = bytes4(keccak256("increase(uint256)"));

  constructor() {
  }

  function sendIncrease(address to) public {
    (bool successMultiNoReplace, bytes memory resultMultiNoReplace) =
      to.call(abi.encodePacked(funnctionSigIncrease, uint256(20)));

    require(successMultiNoReplace == true, "transaction failed to increment");
  }

  function sendIncrease2(address to) public {
    (bool successMultiNoReplace, bytes memory resultMultiNoReplace) =
      to.call(abi.encodeWithSignature("increase(uint256)", uint256(25)));

    require(successMultiNoReplace == true, "transaction failed to increment");
  }

  function executeTransaction(address to, bytes memory data) public {
    (bool successMultiNoReplace, bytes memory resultMultiNoReplace) =
      to.call(data);

    require(successMultiNoReplace == true, "transaction failed to increment");
  }
}
