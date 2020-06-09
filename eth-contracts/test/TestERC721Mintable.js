var ERC721MintableComplete = artifacts.require('customERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[4];
    const account_five = accounts[5]

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two,1,"kiran");
            await this.contract.mint(account_three,2,"sai");
            await this.contract.mint(account_four,3,"sai");
            await this.contract.mint(account_five,4,"sai");

        })

        it('It should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply()
            assert.equal(totalSupply, 4, "incorrect supply value returned")
        })

        it('get token balance', async function () {
            let tokenBalance = await this.contract.balanceOf(accounts[2])
            assert.equal(tokenBalance, 1, "Token balance should equal 1");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('It should return token uri', async function () {
            let tokenURI = await this.contract.tokenURI(4);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/4", "URI is not correct")
        })

        it('should transfer token from one owner to another', async function () {
            let transfer = await this.contract.transferOwnership(accounts[3])
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, accounts[3], "Owner should be accounts[3]")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            try {
                let mint = await this.contract.mint(accounts[2], 2, "Glice", { from: account_two });
            }
            catch(e) {
                return true;
            }
        })

        it('should return contract owner', async function () {
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, account_one, "Owner should be account 1")
        })

    });
})
