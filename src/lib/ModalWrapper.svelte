<script lang="ts">
  import Modal from "./Modal.svelte";
  let { ...rest } = $props();
</script>

<!-- markup (zero or more items) goes here -->
<Modal caption={rest.caption} title={rest.title}>
  {@html rest.children.outerHTML}
</Modal>

<style>
  /* your styles go here */
</style>
