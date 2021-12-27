<script>
  import Hello from "./components/Hello.svelte";
  async function connectWallet() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      await window.ethereum.enable();
      metamaskConnected = window.ethereum.isConnected();
    }
  }
  $: promise = connectWallet();
  $: metamaskConnected = window.ethereum
    ? window.ethereum.isConnected()
    : false;

  function onClickConnectWallet() {
    promise = connectWallet();
  }
</script>

<main>
  {#if window.ethereum}
    <p>Browser wallet is already connected: {metamaskConnected}</p>
  {/if}
  {#if window.ethereum && !metamaskConnected}
    <p>Browser wallet is not connected</p>
    <button on:click={() => onClickConnectWallet}>Connect</button>
  {:else}
    <Hello />
  {/if}
</main>

<style>
</style>
