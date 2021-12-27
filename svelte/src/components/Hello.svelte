<script>
  import { Web3 } from "svelte-web3";
  import App from "../App.svelte";
  import HelloContract from "../contracts/Hello.json";

  async function getGreeting() {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = HelloContract.networks[networkId];
    const contract = new web3.eth.Contract(
      HelloContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    const res = await contract.methods.greet().call();
    return res;
  }

  $: promise = getGreeting();
  let greetee;

  async function setGreeting(greetee) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = HelloContract.networks[networkId];
    const contract = new web3.eth.Contract(
      HelloContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    await contract.methods.setGreetee(greetee).send({ from: accounts[0] });
    promise = getGreeting();
  }
</script>

{#await promise}
  <p>Loading...</p>
{:then greeting}
  <h1>{greeting}</h1>
  <input type="text" placeholder="Change Greeting" bind:value={greetee} />
  <button on:click={() => setGreeting(greetee)}>Change Greeting</button>
{/await}

<!-- markup (zero or more items) goes here -->
<style>
  /* your styles go here */
</style>
