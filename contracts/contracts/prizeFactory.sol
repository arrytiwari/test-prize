/// @notice  SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./prizes.sol";
contract PrizeFactory {
    // Event declaration
    event NewPrizeCreated(uint indexed id, address indexed prizeAddress);
    function createViaPrize(
        address _proposer,
        address[] memory _platformAdmins,
        uint _platFormFee,
        uint _proposerFee,
        uint _contractId
    ) public returns (address) {
        // Deploy a new ViaPrize contract and store its address
        Prize newPrize = new Prize(_proposer, _platformAdmins, _platFormFee, _proposerFee);
        // Emit the event with the contractId and the address of the newly created contract
        emit NewPrizeCreated(_contractId, address(newPrize));

        // Return the address of the newly created contract
        return address(newPrize);
    }
}