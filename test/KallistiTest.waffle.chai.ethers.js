const { utils } = require("ethers").utils;
const { expect } = require("chai");
const { ethers, waffle, solidity } = require("hardhat");
const { expectRevert, time, BN } = require('@openzeppelin/test-helpers');
const { deployContract, loadFixture } = waffle;

// describe(
//     "Fixtures",
//     () => {
//         async function deployment(
//             [deployer, buyer1],
//             provider
//         ) {
//             kaliContract = await ethers.getContractFactory("kaliToken");
//             kali = await kaliContract.connect( deployer ).deploy();

//             return 
//         }
//     }
// );

describe(
    "kali contract waffle/chai/ethers test",
    function () {

        // Roles
        // let DEFAULT_ADMIN_ROLE = ethers.utils.solidityKeccak256( ["string"], ["DEFAULT_ADMIN_ROLE"] );
        // let MINTER_ROLE = ethers.utils.solidityKeccak256( ["string"], ["MINTER_ROLE"] );

        // let kaliToEthRatio = 5;

        // let burnAddress = "0x0000000000000000000000000000000000000000";

        // Wallets
        let deployer;
        // let newOwner;
        // let charity;
        // let newCharity;
        // let newDev;
        let buyer1;
        // let buyer2;
        // let buyer3;

        // Contracts

        // let UniswapV2FactoryContract;
        // let uniswapV2Factory;

        // let UniswapV2RouterContract;
        // let uniswapV2Router;

        // let WETH9Contract;
        // let weth;

        // let kaliWETHDEXPair;

        let KallistiTokenContract;
        let kali;

        beforeEach(
            async function () {
                [
                    deployer,
                    // newOwner,
                    // charity,
                    // newCharity,
                    // newDev,
                    buyer1//,
                    // buyer2,
                    // buyer3
                ] = await ethers.getSigners();

                // UniswapV2FactoryContract = await ethers.getContractFactory("UniswapV2Factory");
                // uniswapV2Factory = await UniswapV2FactoryContract
                //     .connect( owner )
                //     .deploy( owner.address );

                // WETH9Contract = await ethers.getContractFactory("WETH9")
                // weth = await WETH9Contract.connect( owner ).deploy();

                // UniswapV2RouterContract = await ethers.getContractFactory("UniswapV2Router02");
                // uniswapV2Router = await UniswapV2RouterContract.connect( owner ).deploy( uniswapV2Factory.address, weth.address );

                KallistiTokenContract = await ethers.getContractFactory("KallistiToken");

                //Add check for events
                kali = await KallistiTokenContract.connect( deployer ).deploy();

                // kaliWETHDEXPair = await uniswapV2Factory.connect( owner ).getPair( kali.address, weth.address);
            }
        );

        describe(
            "Deployment",
            function () {
                it( 
                    "DeploymentSuccess", 
                    async function() {
                        // expect( await kali.hasRole( kali.DEFAULT_ADMIN_ROLE(), deployer.address ) ).to.equal( true );
                        console.log("Test::Deployment::DeploymentSuccess: token name.");
                        expect( await kali.name() ).to.equal("Kallisti");
                        console.log("Test::Deployment::DeploymentSuccess: token symbol.");
                        expect( await kali.symbol() ).to.equal("KALLI");
                        console.log("Test::Deployment::DeploymentSuccess: token decimals.");
                        expect( await kali.decimals() ).to.equal(18);
                        //console.log("Deployment::DeploymentSuccess: token burnAddress.");
                        // expect( await kali.burnAddress() ).to.equal(burnAddress);
                        expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 0 ), "ether" ) );
                        //console.log("Deployment::DeploymentSuccess: owner.");
                        // expect( await kali.owner() ).to.equal(owner.address);
                        //console.log("Deployment::DeploymentSuccess: devAddress.");
                        // expect( await kali.devAddress() ).to.equal(owner.address);
                        //console.log("Deployment::DeploymentSuccess: charityAddress.");
                        // expect( await kali.charityAddress() ).to.equal(charity.address);
                        //console.log("Deployment::DeploymentSuccess: qplgmeActive.");
                        // expect( await kali.qplgmeActive() ).to.equal(false);
                        expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
                        expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                        // expect( await kali.connect(owner).balanceOf(charity.address) ).to.equal( String( 0 ) );
                        // expect( await kali.connect(owner).balanceOf( kali.uniswapV2kaliWETHDEXPairAddress() ) ).to.equal( String( 0 ) );
                        // expect( await kali.connect(owner).balanceOf( kali.address ) ).to.equal( String( 0 ) );
                    }
                );
            }
        );

        describe(
            "ERC20Compliance",
            function () {
                // it( 
                //     "transfer", 
                //     async function() {
                //         console.log("Test::ERC20Compliance::transfer: Testing ERC20 transfer implementation functionality");
                //         expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 50000 ), "ether" ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(deployer).transfer(buyer1.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 40000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 9000 ), "ether" ) ) );
                //     }
                // );

                // it( 
                //     "approve", 
                //     async function() {
                //         console.log("Test::ERC20Compliance::approve: Testing ERC20 transferFrom implementation functionality");
                //         expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 50000 ), "ether" ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(buyer1).approve(deployer.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).allowance(buyer1.address, deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //     }
                // );

                // it( 
                //     "increaseAllowance", 
                //     async function() {
                //         console.log("Test::ERC20Compliance::increaseAllowance: Testing ERC20 transferFrom implementation functionality");
                //         expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 50000 ), "ether" ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(buyer1).increaseAllowance(deployer.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).allowance(buyer1.address, deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //     }
                // );

                // it( 
                //     "decreaseAllowance", 
                //     async function() {
                //         console.log("Test::ERC20Compliance::increaseAllowance: Testing ERC20 transferFrom implementation functionality");
                //         expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 50000 ), "ether" ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(buyer1).increaseAllowance(deployer.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).allowance(buyer1.address, deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(buyer1).decreaseAllowance(deployer.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).allowance(buyer1.address, deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //     }
                // );

                // it( 
                //     "transfer:approve", 
                //     async function() {
                //         console.log("Test::ERC20Compliance::transferFrom:approve: Testing ERC20 transferFrom implementation functionality");
                //         expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 50000 ), "ether" ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(deployer).transfer(buyer1.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 40000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 9000 ), "ether" ) ) );
                //         expect( await kali.connect(buyer1).approve(deployer.address, ethers.utils.parseUnits( String( 9000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).allowance(buyer1.address, deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 9000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).transferFrom(buyer1.address, deployer.address, ethers.utils.parseUnits( String( 9000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 48100 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //     }
                // );

                // it( 
                //     "transferFrom:increaseAllowance", 
                //     async function() {
                //         console.log("Test::ERC20Compliance::transferFrom:increaseAllowance: Testing ERC20 transferFrom implementation functionality");
                //         expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 50000 ), "ether" ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(deployer).transfer(buyer1.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 40000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 9000 ), "ether" ) ) );
                //         expect( await kali.connect(buyer1).increaseAllowance(deployer.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).allowance(buyer1.address, deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).transferFrom(buyer1.address, deployer.address, ethers.utils.parseUnits( String( 9000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 48100 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //     }
                // );

                // it( 
                //     "burn", 
                //     async function() {
                //         console.log("Test::ERC20Compliance::burn: Testing ERC20 transferFrom implementation functionality");
                //         expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 50000 ), "ether" ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(deployer).burn(ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 40000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //     }
                // );

                // it( 
                //     "burnFrom:approve", 
                //     async function() {
                //         console.log("Test::ERC20Compliance::transferFrom:approve: Testing ERC20 transferFrom implementation functionality");
                //         expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 50000 ), "ether" ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(deployer).approve(buyer1.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).allowance(deployer.address, buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(buyer1).burnFrom(deployer.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 40000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //     }
                // );

                // it( 
                //     "burnFrom:increaseAllowance", 
                //     async function() {
                //         console.log("Test::ERC20Compliance::transferFrom:increaseAllowance: Testing ERC20 transferFrom implementation functionality");
                //         expect( await kali.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 50000 ), "ether" ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 50000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //         expect( await kali.connect(deployer).increaseAllowance(buyer1.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).allowance(deployer.address, buyer1.address) ).to.equal( String( ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(buyer1).burnFrom(deployer.address, ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 40000 ), "ether" ) ) );
                //         expect( await kali.connect(deployer).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
                //     }
                // );
            }
        );

        // describe(
        //     "Owner Management",
        //     function () {
        //         it( 
        //             "Confirm owner management.", 
        //             async function() {
        //                 expect( await kali.owner() ).to.equals(owner.address)
        //                 expect( await kali.devAddress() ).to.equals(owner.address);
        //                 expect( await kali.charityAddress() ).to.equal(charity.address);

        //                 await expect( kali.connect(newOwner).changeCharityAddress(newOwner.address) ).to.be.revertedWith("Ownable: caller is not the owner");
        //                 expect( await kali.charityAddress() ).to.equal(charity.address);
        //                 expect( await kali.connect(owner).changeCharityAddress(newCharity.address));
        //                 expect( await kali.charityAddress() ).to.equal(newCharity.address);

        //                 await expect( kali.connect(newOwner).changeDevAddress(newOwner.address) ).to.be.revertedWith("Ownable: caller is not the owner");
        //                 expect( await kali.devAddress() ).to.equal(owner.address);
        //                 expect( await kali.connect(owner).changeDevAddress(newDev.address));
        //                 expect( await kali.devAddress() ).to.equal(newDev.address);
        //             }
        //         );

        //         it(
        //             "Confirm only owner can start QPLGME",
        //             async function() {
        //                 await expect( kali.connect(newOwner).startQPLGME() ).to.be.revertedWith("Ownable: caller is not the owner");
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(owner.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(charity.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.uniswapV2kaliWETHDEXPairAddress() ) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.address ) ).to.equal( String( 0 ) );
        //                 await expect( kali.connect(owner).startQPLGME() ).to.emit(kali,"QPLGMEStarted");
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(owner.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(charity.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.uniswapV2kaliWETHDEXPairAddress() ) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).totalExchangekaliReserve() ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.address ) ).to.equal( String( 0 ) );
        //             }
        //         );

        //         it(
        //             "Confirm only owner can end QPLGME",
        //             async function() {
        //                 await expect( kali.connect(owner).startQPLGME() ).to.emit(kali,"QPLGMEStarted");
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.qplgmeActive() ).to.equal(true);
        //                 expect( await kali.hadQPLGME() ).to.equal(false);
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(owner.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(charity.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.uniswapV2kaliWETHDEXPairAddress() ) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.address ) ).to.equal( String( 0 ) );
        //                 await expect( kali.connect(newOwner).endQPLGME() ).to.be.revertedWith("Ownable: caller is not the owner");
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.qplgmeActive() ).to.equal(true);
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(owner.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(charity.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.uniswapV2kaliWETHDEXPairAddress() ) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.address ) ).to.equal( String( 0 ) );
        //                 await expect( kali.connect(owner).endQPLGME() ).to.emit(kali,"QPLGMEEnded");
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.qplgmeActive() ).to.equal(false);
        //                 expect( await kali.hadQPLGME() ).to.equal(false);
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(owner.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(charity.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.uniswapV2kaliWETHDEXPairAddress() ) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).totalExchangekaliReserve() ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.address ) ).to.equal( String( 0 ) );
        //             }
        //         );
        //     }
        // );

        // describe(
        //     "Buy kali.",
        //     function () {
        //         it(
        //             "Try to buy kali.",
        //             async function() {
                        
        //                 var buy1Amount = 1;

        //                 await expect( kali.connect(owner).startQPLGME() ).to.emit(kali,"QPLGMEStarted");
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.qplgmeActive() ).to.equal(true);
        //                 expect( await kali.hadQPLGME() ).to.equal(false);
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(owner.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf(charity.address) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.uniswapV2kaliWETHDEXPairAddress() ) ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).totalExchangekaliReserve() ).to.equal( String( 0 ) );
        //                 expect( await kali.connect(owner).balanceOf( kali.address ) ).to.equal( String( 0 ) );
                        
        //                 expect( await kali.connect(buyer1).buykali( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
                        
        //                 expect( await kali.connect(buyer2).buykali( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
        //                 expect( await kali.connect(buyer2).buykali( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );

        //                 expect( await kali.connect(buyer3).buykali( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
        //                 expect( await kali.connect(buyer3).withdrawPaidETHForfeitAllkali() );

        //                 await expect( kali.connect(owner).endQPLGME() ).to.emit(kali, "QPLGMEEnded");
                        
        //                 expect( await weth.balanceOf(charity.address)).to.equal( String( 0 ) );

        //                 await expect( kali.connect(buyer1).collectkaliFromQPLGME() );
        //                 expect( await kali.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( 7071067810000000000 ) );
        //                 expect( await weth.balanceOf(charity.address)).to.equal( String( 300000000000000000 ) );

        //                 await expect( kali.connect(buyer2).collectkaliFromQPLGME() );
        //                 expect( await kali.connect(buyer2).balanceOf(buyer2.address) ).to.equal( String( 10000000000000000000 ) );

        //                 await expect( kali.connect(buyer1).collectkaliFromQPLGME() );
        //                 expect( await kali.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( 7071067810000000000 ) );
                        
        //                 await expect( kali.connect(buyer3).collectkaliFromQPLGME() );
        //                 expect( await kali.connect(buyer3).balanceOf(buyer3.address) ).to.equal( String( 0 ) );

        //             }
        //         );
        //     }
        // );

        // describe(
        //     "Complete QPLGME.",
        //     function () {
        //         it(
        //             "Try to transfer kali.",
        //             async function() {
                        
        //                 var buy1Amount = 750;

        //                 //console.log( "Starting QPLGME.");
        //                 await expect( kali.connect(owner).startQPLGME() ).to.emit(kali,"QPLGMEStarted").withArgs( await kali.qplgmeActive(), await kali.qplgmeStartTimestamp());
        //                 //console.log("Confirming QPLGME is active.");
        //                 expect( await kali.qplgmeActive() ).to.equal(true);
        //                 //console.log("Confirming kali totalsupply.");
        //                 expect( await kali.totalSupply() ).to.equal( String( 0 ) );
                        
        //                 //console.log("Buying kali.");
        //                 expect( await kali.connect(buyer1).buykali( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
        //                 // expect( ethers.utils.parseUnits( String( await  buyer1.getBalance() ), "gwei" ) ).to.equal( ethers.utils.parseUnits( String( 9998997990712000000000 ), "gwei" ) );
                        
        //                 expect( await kali.connect(buyer2).buykali( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
        //                 // expect( await buyer1.getBalance() ).to.equal( String( 9998997990712000000000 ) );
        //                 // expect( await kali.connect(buyer2).buykali( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
        //                 // expect( await buyer1.getBalance() ).to.equal( String( 9998997990712000000000 ) );

        //                 expect( await kali.connect(buyer3).buykali( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
        //                 // expect( await buyer1.getBalance() ).to.equal( String( 9998997990712000000000 ) );
        //                 expect( await kali.connect(buyer3).withdrawPaidETHForfeitAllkali() );
        //                 // expect( await buyer1.getBalance() ).to.equal( String( 1000000000000000000000 ) );

        //                 await expect( kali.connect(owner).endQPLGME() ).to.emit(kali, "QPLGMEEnded");
                        
        //                 expect( await weth.balanceOf(charity.address)).to.equal( String( 0 ) );

        //                 await expect( kali.connect(buyer1).collectkaliFromQPLGME() );
        //                 expect( await kali.connect(buyer1).balanceOf(buyer1.address) )
        //                     //.to.equal( String( 7071067810000000000 ) )
        //                     ;
        //                 // expect( await kali.totalSupply() ).to.equal( String( 1676392616930000000000 ) );
        //                 // expect( await kali.connect(owner).balanceOf(owner.address) ).to.equal( String( 0 ) );
        //                 // expect( await kali.connect(owner).balanceOf(charity.address) ).to.equal( String( 0 ) );
        //                 // expect( await kali.connect(owner).balanceOf( kali.uniswapV2kaliWETHDEXPairAddress() ) ).to.equal( String( 0 ) );
        //                 // expect( await kali.connect(owner).totalExchangekaliReserve() ).to.equal( String( 0 ) );
        //                 // expect( await kali.connect(owner).balanceOf( kali.address ) ).to.equal( String( 0 ) );
        //                 expect( await weth.balanceOf(charity.address))
        //                     //.to.equal( String( 300000000000000000 ) )
        //                     // ;

        //                 await expect( kali.connect(buyer2).collectkaliFromQPLGME() );
        //                 expect( await kali.connect(buyer2).balanceOf(buyer2.address) )
        //                     //.to.equal( String( 10000000000000000000 ) )
        //                     ;

        //                 await expect( kali.connect(buyer1).collectkaliFromQPLGME() );
        //                 expect( await kali.connect(buyer1).balanceOf(buyer1.address) )
        //                     //.to.equal( String( 7071067810000000000 ) )
        //                     ;
                        
        //                 await expect( kali.connect(buyer3).collectkaliFromQPLGME() );
        //                 expect( await kali.connect(buyer3).balanceOf(buyer3.address) )
        //                     //.to.equal( String( 0 ) )
        //                     ;

        //                 //console.log("Confirming buyer1 can transfer %s.", ethers.utils.parseUnits( String( 217944947175000000000 ), "wei" ) );
        //                 await expect( kali.connect(buyer1).transfer(buyer2.address, 217944947175000000000) );
        //                 // expect( await kali.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
        //                 // expect( await kali.connect(buyer2).balanceOf(buyer2.address) ).to.equal( String( 437160310264880370000 ) );
        //                 // expect( await kali.connect(buyer1).balanceOf(kali.address) ).to.equal( String( 0 ) );

                        
        //             }
        //         );
        //     }
        // );
    }
);