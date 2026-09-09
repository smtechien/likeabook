<script lang="ts">
  interface Props {
    headings: NodeListOf<Element> | null;
  }
  // your script goes here
  let { headings }: Props = $props();
</script>

{#if headings != null}
<div class="fixed top-0 py-8 left-4 w-fit-content h-full overflow-scroll scrollbar-track-white">
<h4 id="toc">Table of contents</h4>
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
