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

    function createCampaign(string memory _description, uint _goal) public {
        Campaign memory newCampaign = Campaign({
            creator: payable(msg.sender),
            description: _description,
            goal: _goal,
            amountRaised: 0
        });

        campaigns.push(newCampaign);
    }

    function contribute(uint _campaignIndex) public payable {
        Campaign storage campaign = campaigns[_campaignIndex];
        campaign.amountRaised += msg.value;
    }

    function withdrawFunds(uint _campaignIndex) public {
        Campaign storage campaign = campaigns[_campaignIndex];
        require(campaign.amountRaised >= campaign.goal, "Campaign goal not met");
        require(msg.sender == campaign.creator, "Only campaign creator can withdraw funds");

        campaign.creator.transfer(campaign.amountRaised);
    }

    function getCampaign(uint _campaignIndex) public view returns (address, string memory, uint, uint) {
        Campaign memory campaign = campaigns[_campaignIndex];
        return (campaign.creator, campaign.description, campaign.goal, campaign.amountRaised);
    }
}
