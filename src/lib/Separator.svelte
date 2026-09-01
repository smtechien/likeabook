<script lang="ts">
  interface Props {
    titleDiv: HTMLElement;
    id: string;
  }

  let { titleDiv, id }: Props = $props();
  let separatorDiv: HTMLElement | null = $state(null);
  let height: number = $state(0);

  $effect(() => {
    if (separatorDiv && titleDiv) {
      height =
        titleDiv.clientHeight - (separatorDiv.offsetTop - titleDiv?.offsetTop);
      separatorDiv.style.height = height + "px";
    }
  });
</script>

<div class="block" {id} bind:this={separatorDiv}></div>

<style>
  /* your styles go here */
</style>
