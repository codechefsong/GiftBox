// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DigitalGiftbox {
    address creator;
    string recipient;
    string occasion;
    string title;
    uint256 createdAt;
    uint256 deliveryDate;
    bool isDelivered;
    uint256 tokenPot;
    string[] messages;
    address[] contributors;

    mapping(address => uint256[]) public createdGiftboxes;
    mapping(address => uint256[]) public receivedGiftboxes;

    event GiftboxCreated(address indexed creator, string recipient, uint256 deliveryDate);
    event MessageAdded(address indexed contributor, string message);
    event ContributionAdded(address indexed contributor, uint256 amount);
    event GiftboxDelivered(address indexed recipient);

    constructor(string memory _recipient, string memory _occasion, string memory _title) {
        creator = msg.sender;
        recipient = _recipient;
        occasion = _occasion;
        title = _title;
        createdAt = block.timestamp;
    }

    /**
     * @dev Adds a message to a giftbox
     * @param message The message to add
     */
    function addMessage(string memory message) public {
        messages.push(message);

        bool isContributor = false;
        for (uint i = 0; i < contributors.length; i++) {
            if (contributors[i] == msg.sender) {
                isContributor = true;
                break;
            }
        }

        if (!isContributor) {
            contributors.push(msg.sender);
        }

        emit MessageAdded(msg.sender, message);
    }

    /**
     * @dev Adds a contribution to a giftbox
     */
    function addContribution() public payable {
        require(msg.value > 0, "Contribution must be greater than 0");

        tokenPot += msg.value;

        bool isContributor = false;
        for (uint i = 0; i < contributors.length; i++) {
            if (contributors[i] == msg.sender) {
                isContributor = true;
                break;
            }
        }

        if (!isContributor) {
            contributors.push(msg.sender);
        }

        emit ContributionAdded(msg.sender, msg.value);
    }

    /**
     * @dev Get all messages for a giftbox
     */
    function getGiftboxMessages() public view returns (string[] memory) {
        return messages;
    }

    /**
     * @dev Get all contributors for a giftbox
     */
    function getGiftboxContributors() public view returns (address[] memory) {
        return contributors;
    }

    /**
     * @dev Get giftbox details
     */
    function getGiftboxDetails()
        public
        view
        returns (
            address _creator,
            string memory _recipient,
            string memory _occasion,
            string memory _title,
            uint256 _createdAt,
            uint256 _deliveryDate,
            bool _isDelivered,
            uint256 _tokenPot,
            uint256 _messageCount,
            uint256 _contributorCount
        )
    {
        return (
            creator,
            recipient,
            occasion,
            title,
            createdAt,
            deliveryDate,
            isDelivered,
            tokenPot,
            messages.length,
            contributors.length
        );
    }
}
