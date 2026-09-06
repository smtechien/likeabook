<script lang="ts">
  import Modal from "./Modal.svelte";
  let { ...rest } = $props();
</script>

<!-- markup (zero or more items) goes here -->
<Modal caption={rest.children.innerText}>
  {@html rest.children.outerHTML}
</Modal>

<style>
  /* your styles go here */
</style>
