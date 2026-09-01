<script lang="ts">
  import Button from "./Button.svelte";
  // your script goes here
  let { children } = $props();
  let container: any = $state();
  let containerWidth = $state(0);
  let scrollWidth = $state(0);
  let scrollLeft = $state(0);

  //Pages
  let currentPage = $derived(
    containerWidth > 0 ? Math.floor(scrollLeft / containerWidth) + 1 : 1,
  );
  let totalPages = $derived(
    containerWidth > 0 ? Math.floor(scrollWidth / containerWidth) : 1,
  );

  $effect(() => {
    const updateMetrics = () => {
      containerWidth = container.clientWidth;
      scrollWidth = container.scrollWidth;
      scrollLeft = container.scrollLeft;
    };

    // Set nilai awal
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  });

  function handleScroll() {
    if (container) {
      scrollLeft = container.scrollLeft;
    }
  }

  function nextPage() {
    if (container) {
      container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
    }
  }

  function prevPage() {
    if (container) {
      container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
    }
  }
</script>

<div class="h-full w-full lg:w-1/2 flex flex-col gap-2">
  <!-- START:content disisipkan di sini -->
  <!-- <div -->
  <!--   bind:this={container} -->
  <!--   onscroll={handleScroll} -->
  <!--   class="h-full snap-x snap-mandatory overflow-hidden [column-width:100vw]" -->
  <!-- > -->
  <div
    bind:this={container}
    onscroll={handleScroll}
    class="flex flex-nowrap w-full h-full gap-10 snap-x snap-mandatory overflow-hidden"
  >
    {@render children?.()}
  </div>
  <!-- END:content disisipkan di sini -->

  <div class="flex flex-row items-center justify-between">
    <Button disabled={currentPage === 1} onclick={prevPage}>Prev</Button>
    <p>Page {currentPage}/{totalPages}</p>
    <Button disabled={currentPage === totalPages} onclick={nextPage}
      >Next</Button
    >
  </div>
</div>

<style>
  /* your styles go here */
</style>
