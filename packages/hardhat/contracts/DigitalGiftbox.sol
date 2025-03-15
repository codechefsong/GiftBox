// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DigitalGiftbox {
    address creator;
    string recipient;
    address recipientAddress;
    string occasion;
    string title;
    uint256 createdAt;
    uint256 deliveryDate;
    string status = "Not Send";
    uint256 tokenPot;
    string verificationTokenHex;
    string message;
    address[] contributors;
    Message[] messages;

    struct Message {
        address owner;
        string name;
        string email;
        string text;
    }

    mapping(address => uint256[]) public createdGiftboxes;
    mapping(address => uint256[]) public receivedGiftboxes;

    event GiftboxCreated(address indexed creator, string recipient, uint256 deliveryDate);
    event MessageAdded(address indexed contributor, string message);
    event ContributionAdded(address indexed contributor, uint256 amount);
    event GiftboxDelivered(address indexed recipient);

    modifier isRecipient() {
        require(msg.sender == recipientAddress, "Not the Recipient");
        _;
    }

    constructor(string memory _recipient, string memory _occasion, string memory _title, string memory _message) {
        creator = msg.sender;
        recipient = _recipient;
        occasion = _occasion;
        title = _title;
        createdAt = block.timestamp;
        message = _message;
    }

    /**
     * @dev Adds a message to a giftbox
     * @param _name Name
     * @param _email Email
     * @param _text The message to add
     */
    function addMessage(string memory _name, string memory _email, string memory _text) public {
        Message memory newMessage = Message(msg.sender, _name, _email, _text);
        messages.push(newMessage);

        emit MessageAdded(msg.sender, _text);
    }

    /**
     * @dev Set recipient address of a giftbox
     * @param _recipientAddress Address of the recipient
     */
    function setRecipientAddress(address _recipientAddress) public {
       recipientAddress = _recipientAddress;
       status = "Sent";
    }

    /**
     * @dev Set recipient email of a giftbox
     * @param _verificationTokenHex Email of the recipient
     */
    function setRecipientEmail(string memory _verificationTokenHex) public {
       verificationTokenHex = _verificationTokenHex;
       status = "Sent";
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
     * @dev Withdraw ETH from giftbox
     */
    function withdraw() public isRecipient {
        (bool success, ) = recipientAddress.call{ value: address(this).balance }("");
        require(success, "Failed to send Ether");
        tokenPot = 0;
    }

    /**
     * @dev Get all messages for a giftbox
     */
    function getGiftboxMessages() public view returns (Message[] memory) {
        return messages;
    }

    /**
     * @dev Get all contributors for a giftbox
     */
    function getGiftboxContributors() public view returns (address[] memory) {
        return contributors;
    }

    /**
     * @dev Get recipient address of the giftbox
     */
    function getRecipientAddress() public view returns (address) {
        return recipientAddress;
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
            string memory _status,
            uint256 _tokenPot,
            uint256 _messageCount,
            uint256 _contributorCount,
            string memory _message
        )
    {
        return (
            creator,
            recipient,
            occasion,
            title,
            createdAt,
            deliveryDate,
            status,
            tokenPot,
            messages.length,
            contributors.length,
            message
        );
    }
}
