const { Wallet } = require("ethers");

const mnemonic = "token....razor";
const wallet = Wallet.fromPhrase(mnemonic);

console.log("Private Key:", wallet.privateKey);
