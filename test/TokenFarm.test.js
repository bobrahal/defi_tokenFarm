const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
	.use(require('chai-as-promised'))
	.should()

let tokens = n => web3.utils.toWei(n, 'ether')

contract('TokenFarm', ([owner, investor]) => {

	let daiToken, dappToken, tokenFarm

	// before hook that runs before tests
	before(async () => {
		// Load contracts
		daiToken = await DaiToken.new()
		dappToken = await DappToken.new()
		tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

		// Transfer all DAPP tokens to farm (1 million)
		await dappToken.transfer(tokenFarm.address, tokens('1000000'))

		// Transfer 100 Mock DAI to investor
		await daiToken.transfer(investor, tokens('100'), {from: owner})
	})

	describe('Mock DAI deployment', async () => {
		it('has a name', async () => {
			const name = await daiToken.name()
			assert.equal(name, 'Mock DAI Token', 'YAYY DAI')
		})
	})

	describe('DApp Token deployment', async () => {
		it('has a name', async () => {
			const name = await dappToken.name()
			assert.equal(name, 'DApp Token', 'YAYY DAPP')
		})
	})

	describe('Token Farm deployment', async () => {
		it('has a name', async () => {
			const name = await tokenFarm.name()
			assert.equal(name, 'Dapp Token Farm')
		})
		
		it('contract has tokens', async () => {
		let balance = await dappToken.balanceOf(tokenFarm.address)
		assert.equal(balance, tokens('1000000'))
		})

	})
})