// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        address payable creator;
        string description;
        uint goal;
        uint amountRaised;
    }

    Campaign[] public campaigns;

    // Declare events for creating campaigns and contributing
    event CampaignCreated(address indexed creator, string description, uint goal);
    event ContributionReceived(address indexed contributor, uint campaignIndex, uint amount);

    // Create a new campaign
    function createCampaign(string memory _description, uint _goal) public {
        Campaign memory newCampaign = Campaign({
            creator: payable(msg.sender),
            description: _description,
            goal: _goal,
            amountRaised: 0
        });

        campaigns.push(newCampaign);

        // Emit the event after creating a campaign
        emit CampaignCreated(msg.sender, _description, _goal);
    }

    // Contribute to a campaign (renamed from 'contribute' to 'deposit')
    function deposit(uint _campaignIndex) public payable {
        require(_campaignIndex < campaigns.length, "Invalid campaign index");
        Campaign storage campaign = campaigns[_campaignIndex];
        campaign.amountRaised += msg.value;

        // Emit the event when a contribution is made
        emit ContributionReceived(msg.sender, _campaignIndex, msg.value);
    }

    // Withdraw funds (only by the campaign creator)
    function withdrawFunds(uint _campaignIndex) public {
        require(_campaignIndex < campaigns.length, "Invalid campaign index");
        Campaign storage campaign = campaigns[_campaignIndex];
        require(campaign.amountRaised >= campaign.goal, "Campaign goal not met");
        require(msg.sender == campaign.creator, "Only campaign creator can withdraw funds");

        uint amount = campaign.amountRaised;
        campaign.amountRaised = 0;
        campaign.creator.transfer(amount);
    }

    // Get details of a campaign
    function getCampaign(uint _campaignIndex) public view returns (address, string memory, uint, uint) {
        require(_campaignIndex < campaigns.length, "Invalid campaign index");
        Campaign memory campaign = campaigns[_campaignIndex];
        return (campaign.creator, campaign.description, campaign.goal, campaign.amountRaised);
    }

    // Get the total number of campaigns
    function getCampaignCount() public view returns (uint) {
        return campaigns.length;
    }

    // Get all campaigns (for efficient frontend loading)
    function getAllCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }
}