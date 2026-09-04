<script lang="ts">
  import Modal from "./Modal.svelte";
  let { ...rest } = $props();


</script>

<!-- markup (zero or more items) goes here -->
<Modal>
  {@html rest.children.innerHTML}
</Modal>

<style>
  /* your styles go here */
</style>
