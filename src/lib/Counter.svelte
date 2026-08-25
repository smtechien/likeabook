<script lang="ts">
  let count: number = 0;
  const increment = () => {
    count += 10;
  };
</script>

<button on:click={increment}>
  count is {count}
</button>
