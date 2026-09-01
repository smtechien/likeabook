<script lang="ts">
  interface SectionData {
    headers: Element[];
    paragraphs: Element[];
  }

  interface Props {
    contents: Array<SectionData> | null;
  }
  // your script goes here
  let { contents }: Props = $props();
 </script>

<h2 id="toc">Table of contents</h2>
{#if contents != null}
  {#each contents as dataSection}
    <li>
      {#each dataSection.headers as header}
        {const textHeader = header.textContent}
        <ul><a href={"#"+textHeader}>{textHeader}</a></ul>
      {/each}
    </li>
  {/each}
{/if}

<style>
  /* your styles go here */
</style>
