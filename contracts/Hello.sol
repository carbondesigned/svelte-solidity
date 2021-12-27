// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Hello is Ownable {
  string private _greeting = "Hello ";
  string private _greetee = "World!";
  function greet () external view returns (string memory) {
    return string(abi.encodePacked(_greeting, _greetee)); 
  }

  // create a function that allows to change the 'greetee'
  // Ensure the function is only callable by the owner
  function setGreetee(string calldata _newGreetee) external onlyOwner {
    _greetee = _newGreetee;
  }
}
