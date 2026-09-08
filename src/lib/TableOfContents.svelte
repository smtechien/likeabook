<script lang="ts">
  interface Props {
    headings: NodeListOf<Element> | null;
  }
  // your script goes here
  let { headings }: Props = $props();
  $effect(() => {
    if (headings) {
      console.log(headings)
    }
  })
</script>

{#if headings != null}
<div class="fixed top-0 py-8 left-4 w-fit-content h-full overflow-scroll scrollbar-track-white">
<h2 id="toc">Table of contents</h2>
  <ul>
    {#each headings as heading}
      {const text = heading.textContent;}
      {const href = heading.id;}
      {const tagName = heading.tagName}
      <li class:indent-2={tagName == 'H3'}><a href={"#"+href}>{text}</a></li>
    {/each}
  </ul>

</div>
{/if}

<style>
  /* your styles go here */
</style>
