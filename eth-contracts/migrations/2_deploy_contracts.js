// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
};
// verifier address :-  0x1eF9a08e26A5d607FcAe48a1d0531Fd5EEccC47F
// solnsquare :- 0xe61845008b656E0dB02bCb653cF7A1DF3C7075F7
