const hre = require("hardhat");

async function main() {
  // await testEtherTransaction();
  // await testBasicFunction();
  // await testParametersTransaction();
  // await testContractTransaction();
  // await testIncrement1();
  await testIncrement2();
  // await testExecute();
}

async function testEtherTransaction() {
  // create a wallet (signer)
  const provider = new hre.ethers.providers.JsonRpcProvider();
  const defaultWallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  // print the balance before
  const originalBalance = await defaultWallet.getBalance();
  console.log(`Original Balance: ${originalBalance.toString().substring(0,4)}`);

  // create a transaction
  const tx = await defaultWallet.sendTransaction({
    to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    value: hre.ethers.utils.parseEther("1.0")
  });

  // print the balance before
  const updatedBalance = await defaultWallet.getBalance();
  console.log(`Updated Balance: ${updatedBalance.toString().substring(0,4)}`);

  // print the transaction after
  console.log();
  console.log(JSON.stringify(tx, null, 2));
}

async function testBasicFunction() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();

  const basicTransaction = await greeter.populateTransaction.basicFunction();
  console.log(`Transaction: ${JSON.stringify(basicTransaction, null, 2)}`);
}

async function testParametersTransaction() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();

  const parameterTransaction = await greeter.populateTransaction.testParameters(
    1,
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    hre.ethers.utils.formatBytes32String("hello")
  );
  console.log(`Transaction: ${JSON.stringify(parameterTransaction, null, 2)}`);

}

async function testContractTransaction() {
  // create a wallet (signer)
  const provider = new hre.ethers.providers.JsonRpcProvider();
  const defaultWallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();

  const greetingTransaction = await greeter.populateTransaction.setGreeting(`hello hello hello`);
  console.log(`Transaction: ${JSON.stringify(greetingTransaction, null, 2)}`);

  const greeting = await greeter.greet();
  console.log(`Greeting: ${JSON.stringify(greeting, null, 2)}`);
}

async function testIncrement1() {
  // create a wallet (signer)
  const provider = new hre.ethers.providers.JsonRpcProvider();
  const defaultWallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed


  const AF = await hre.ethers.getContractFactory("ArbitraryFunctions");
  const arbFunc = await AF.deploy();
  await arbFunc.deployed();

  await arbFunc.sendIncrease(counter.address);

  const currentNumber = await counter.counter()
  console.log(currentNumber.toNumber());

}

async function testIncrement2() {
  // create a wallet (signer)
  const provider = new hre.ethers.providers.JsonRpcProvider();
  const defaultWallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed

  const AF = await hre.ethers.getContractFactory("ArbitraryFunctions");
  const arbFunc = await AF.deploy();
  await arbFunc.deployed();

  await arbFunc.sendIncrease2(counter.address);

  const currentNumber = await counter.counter()
  console.log(currentNumber.toNumber());

}

async function testExecute() {
  // create a wallet (signer)
  const provider = new hre.ethers.providers.JsonRpcProvider();
  const defaultWallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed

  const incrementTx = await counter.populateTransaction.increase(30);

  const AF = await hre.ethers.getContractFactory("ArbitraryFunctions");
  const arbFunc = await AF.deploy();
  await arbFunc.deployed();

  await arbFunc.executeTransaction(counter.address, incrementTx.data);

  const currentNumber = await counter.counter()
  console.log(currentNumber.toNumber());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
