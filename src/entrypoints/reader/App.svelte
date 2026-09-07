<script lang="ts">
  import { tick, onMount, mount } from "svelte";
  import parseElement from "@/utils/parseElement";
  import HorizontalContainer from "@/lib/HorizontalContainer.svelte";
  import TableOfContents from "@/lib/TableOfContents.svelte";
  import Separator from "@/lib/Separator.svelte";
  import ModalWrapper from "@/lib/ModalWrapper.svelte";

  interface ArticleData {
    title: string;
    byline: string;
    content: string;
    textContent: string;
    siteName: string;
    excerpt: string;
  }

  let article = $state<ArticleData | null>(null);
  let container: HTMLElement | null = $state(null);
  let loadedState = $state(false);
  let isResizing = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | null = $state(null);
  onMount(async () => {
    // Retrieve parsed article payload from local extension storage
    const data: any = await browser.storage.local.get(["activeArticle"]);
    if (data.activeArticle) {
      article = data.activeArticle;
    }
  });

  function wrapElement(wrapper: HTMLElement, content: HTMLElement | Element) {
    mount(ModalWrapper, {
      target: wrapper,
      props: {
        children: content,
      },
    });
  }

  function handleResize() {
    loadedState = false;
    isResizing = true;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      isResizing = false;
    }, 150);
  }

  function elementManipulation(): boolean {
    const images = container?.querySelectorAll("p img");
    images?.forEach((image) => {
      const wrapper = document.createElement("div");
      image.replaceWith(wrapper);
      wrapElement(wrapper, image);
    });
    const figures = container?.querySelectorAll("figure");
    figures?.forEach((figure) => {
      const wrapper = document.createElement("div");
      figure.replaceWith(wrapper);
      wrapElement(wrapper, figure);
    });
    const headings = container?.querySelectorAll("section:has(h2)");
    headings?.forEach((heading) => {
      const h2 = heading.querySelector("h2");
      const wrapper = document.createElement("div");
      const parentNode = h2?.parentNode;
      parentNode?.insertBefore(wrapper, h2);
      mount(Separator, {
        target: wrapper,
        props: {
          titleDiv: container,
          id: heading.id,
        },
      });
    });
    return true;
  }

  $effect(() => {
    if (container && article && !isResizing) {
      elementManipulation();
      tick().then(() => {
        loadedState = true;
      });
    }
  });
</script>

<svelte:window onresize={handleResize} />
{#if isResizing}
  <main
    class="h-screen w-screen flex items-center justify-center p-8 overflow-hidden"
    id="mainContainer"
  >
    <p>Resizing component, please wait...</p>
  </main>
{/if}

<main
  class="h-screen w-screen flex items-center justify-center p-8 overflow-hidden"
  id="mainContainer"
>
  {#if article && !isResizing}
    <HorizontalContainer bind:loaded={loadedState}>
      <section class="flex-[0_0_100%] h-full snap-center" id="titleDiv">
        <h1>{article?.title}</h1>
        <div class="snap-center">{article.byline} | {article.siteName}</div>
      </section>
      <div
        class="flex-[0_0_100%] snap-center [column-width:100vw] gap-10"
        bind:this={container}
      >
        {@html article.content}
      </div>
    </HorizontalContainer>
  {/if}
  {#if !article && !isResizing}
    <p>Load document, please wait...</p>
  {/if}
</main>

<style>
</style>
