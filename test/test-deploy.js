const {ethers} = require("hardhat")
const {assert,expect} = require("chai")

describe("SimpleStorage",function(){
  let simpleStorage, simpleStorageFactory
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue ="123"
    assert.equal(currentValue,expectedValue)
  })

  it("Should Update when we call store",async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue,expectedValue)
    // expect(currentValue).to.equal(expectedValue)
  })
})