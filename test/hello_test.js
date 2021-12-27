const Hello = artifacts.require("Hello");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hello", function (accounts) {
  it("should assert true", async function () {
    await Hello.deployed();
    return assert.isTrue(true);
  });
  // describe a function called greet()
  describe("greet", function () {
    it("should return Hello World!", async () => {
      const hello = await Hello.deployed();
      const greeting = await hello.greet();
      const expectedGreeting = "Hello World!";
      assert.equal(
        greeting,
        expectedGreeting,
        "greeting should be Hello World!"
      );
    });
  });
  // ensure the function can only be called by the owner
  describe("owner()", function () {
    // it can return the owner
    it("should return the owner", async () => {
      const hello = await Hello.deployed();
      const owner = await hello.owner();
      assert(owner, "the current owner");
    });
    // it returns the owners address
    it("should return the owner's address", async () => {
      const hello = await Hello.deployed();
      const owner = await hello.owner();
      const expected = accounts[0];
      assert.equal(owner, expected, "matches the owner's address");
    });
  });

  // update the greeting message
  describe("setGreetee()", () => {
    it("sets greeting to passed in string", async () => {
      // deploy
      const hello = await Hello.deployed();
      // set expected
      const expected = "Hello Human!";
      const greetee = "Human!";
      // call the function
      await hello.setGreetee(greetee);
      // get actual
      const actual = await hello.greet();
      // assert the result
      assert.equal(actual, expected, "greetee should be 'Hello Human!'");
    });
  });
});
