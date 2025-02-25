//imports
const { ethers, run, network } = require("hardhat")

//async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying Contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    // console.log(`${(await simpleStorage.getAddress()).toString()}`)

    // const currentValue = await simpleStorage.retrieve()
    // console.log(`Current Value is: ${currentValue}`)

    // what happens when we deploy to our hardhat network?
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")

        // Not functionable in version 6^ ethers ----->

        await simpleStorage.deploymentTransaction().wait(6)
        await verify(simpleStorage.target, [])
    }

    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
    // const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
