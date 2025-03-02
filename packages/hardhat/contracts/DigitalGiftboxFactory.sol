// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./DigitalGiftbox.sol";

/**
 * @title DigitalGiftboxFactory
 * @dev A factory contract for creating new DigitalGiftbox contracts
 */
contract DigitalGiftboxFactory {
    address[] public deployedGiftboxes;
    mapping(address => address[]) public userGiftboxes;

    event GiftboxCreated(address indexed giftboxAddress, address indexed creator, string title);
    event ImplementationUpdated(address indexed oldImplementation, address indexed newImplementation);

    constructor() {}

    /**
     * @dev Creates a new DigitalGiftbox contract
     * @param recipient Name of the recipient
     * @param occasion The occasion for the gift
     * @param title The title of the giftbox
     * @return giftboxAddress Address of the newly created DigitalGiftbox contract
     */
    function createGiftbox(
        string calldata recipient,
        string calldata occasion,
        string calldata title
    ) public returns (address giftboxAddress) {
        DigitalGiftbox newDigitalGiftbox = new DigitalGiftbox(recipient, occasion, title);

        deployedGiftboxes.push(address(newDigitalGiftbox));
        userGiftboxes[msg.sender].push(address(newDigitalGiftbox));

        emit GiftboxCreated(giftboxAddress, msg.sender, title);

        return giftboxAddress;
    }

    /**
     * @dev Get all giftboxes created by a specific user
     * @param user Address of the user
     * @return Array of giftbox contract addresses created by the user
     */
    function getUserGiftboxes(address user) external view returns (address[] memory) {
        return userGiftboxes[user];
    }

    /**
     * @dev Get total number of deployed giftboxes
     * @return Total number of deployed giftboxes
     */
    function getTotalGiftboxCount() external view returns (uint256) {
        return deployedGiftboxes.length;
    }

    /**
     * @dev Get deployed giftboxes with pagination
     * @param startIndex Start index for pagination
     * @param count Number of items to return
     * @return Array of giftbox addresses
     */
    function getDeployedGiftboxes(uint256 startIndex, uint256 count) external view returns (address[] memory) {
        require(startIndex < deployedGiftboxes.length, "Start index out of bounds");

        if (startIndex + count > deployedGiftboxes.length) {
            count = deployedGiftboxes.length - startIndex;
        }

        address[] memory result = new address[](count);

        for (uint256 i = 0; i < count; i++) {
            result[i] = deployedGiftboxes[startIndex + i];
        }

        return result;
    }
}
