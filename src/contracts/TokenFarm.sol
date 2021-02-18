pragma solidity^0.5.0;

import "./DaiToken.sol";
import "./DappToken.sol";


/**
 * The TokenFarm contract does staking/unstaking mDAI tokens and issuing DAPP Tokens
 */
contract TokenFarm {

	// state variable - to be stored on the Blockchain
	string public name = "Dapp Token Farm";

	DappToken public dappToken;
	DaiToken public daiToken;

	address[] public stakers;
	mapping (address => uint) public stakingBalance;
	mapping (address => bool) public hasStaked;
	mapping (address => bool) public isStaking;
	
	
	constructor(DappToken _dappToken, DaiToken _daiToken) public {
		dappToken = _dappToken;
		daiToken = _daiToken;
	}

	// 1. Stakes Tokens (Deposit)
	function stakeTokens(uint _amount) public {

		// Transfer mDAI tokens to this contract for staking
		daiToken.transferFrom(msg.sender, address(this), _amount);
		// Update staking balance
		stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
		// Add user to stakers array *only* if they haven't staked already
		if(!hasStaked[msg.sender]){
			stakers.push(msg.sender);
		}
		// Update staking status
		hasStaked[msg.sender] = true;
		isStaking[msg.sender] = true;
	}

	// 2. Unstaking Tokens (Withdraw)
	// 3. Issuing Tokens 
}
