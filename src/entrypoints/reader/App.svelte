<script lang="ts">
  import { onMount, createRawSnippet, mount } from "svelte";
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

  $effect(() => {
    if (container) {
      const figures = container.querySelectorAll("figure");
      figures.forEach((figure) => {
        const wrapper = document.createElement("div");
        console.log(figure);
        figure.replaceWith(wrapper);
        wrapElement(wrapper, figure);
      });
    }
  });
</script>

<main
  class="h-screen w-screen flex items-center justify-center p-8 overflow-hidden"
  id="mainContainer"
>
  {#if article}
    <HorizontalContainer>
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
</main>

<style>
</style>
