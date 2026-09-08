<script lang="ts">
  import Button from "./Button.svelte";

  let { children, caption = "" } = $props();

  let show = $state(false);

  function closeModal(event: Event) {
    event.preventDefault();
    show = false;
  }

  function openModal(event: Event) {
    event.preventDefault();
    show = true;
  }
</script>

<!-- markup (zero or more items) goes here -->
<div class="m-4 flex items-center justify-center">
  {#if !show}
    <Button onclick={(e: Event) => openModal(e)}>
      <div class="flex flex-col items-start text-justify">
        <strong class="text-sm"> Click to see </strong>
        <snap class="text-sm">{caption}</snap>
      </div>
    </Button>
    <!-- content here -->
  {:else}
    <!-- else content here -->
    <Button onclick={(e: Event) => openModal(e)}>
      <div class="flex flex-col items-start text-justify">
        <strong class="text-sm"> Opened</strong>
        <snap class="text-sm">{caption}</snap>
      </div>
    </Button>
  {/if}

  <dialog
    class:hidden={!show}
    onclick={(e) => {
      closeModal(e);
    }}
    class:flex={show}
    class="fixed flex-col items-center justify-center gap-4 top-0 left-0 shadow-2xl w-full bg-black/25 h-full z-10 border p-4"
  >
    <div
      class="flex flex-col gap-2 border bg-gray-50 min-w-50 max-w-full md:max-w-3/4 lg:max-w-1/2 max-h-full p-4 overflow-scroll"
    >
      <div class="p-2 border-b border-gray-600">Figure</div>
      <div class="p-2 figure">
        {@render children?.()}
      </div>
      <div class="flex flex-col w-full p-2">
        <Button
          onclick={(e: Event) => {
            closeModal(e);
          }}>Close</Button
        >
      </div>
    </div>
  </dialog>
</div>

<style>
  /* your styles go here */
</style>
