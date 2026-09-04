<script lang="ts">
  import Button from "./Button.svelte";
  let { children } = $props();

  let show = $state(false);

  function toogleModal(event: Event) {
    event.preventDefault();
    console.log(event);
    show = !show;
  }
</script>

<!-- markup (zero or more items) goes here -->
<div class="p-4">
  {#if !show}
    <Button onclick={(e: Event) => toogleModal(e)}>See figure</Button>
    <!-- content here -->
  {:else}
    <!-- else content here -->
    <Button onclick={(e: Event) => toogleModal(e)}>Opened</Button>
  {/if}

  <dialog
    class:hidden={!show}
    class:flex={show}
    class="fixed flex-col items-center justify-center gap-4 top-0 left-0 shadow-2xl w-full bg-black/25 h-full z-10 border transition-all ease-in-out"
  >
    <div class="flex flex-col gap-2 border bg-gray-50 min-w-50">
      <div class="p-2 border-b border-gray-600">Title</div>
      <div class="p-2">
        {@render children?.()}
      </div>
      <div class="flex flex-col w-full p-2">
        <Button onclick={toogleModal}>Close</Button>
      </div>
    </div>
  </dialog>
</div>

<style>
  /* your styles go here */
</style>
