<script lang="ts">
  import HorizontalContainer from "../../lib/HorizontalContainer.svelte";
  import { onMount } from "svelte";

  interface ArticleData {
    title: string;
    byline: string;
    content: string;
    textContent: string;
    siteName: string;
  }

  // Svelte 5 rune for reactive state management
  let article = $state<ArticleData | null>(null);

  onMount(async () => {
    // Retrieve parsed article payload from local extension storage
    const data: any = await browser.storage.local.get(["activeArticle"]);
    if (data.activeArticle) {
      article = data.activeArticle;
    }
  });
</script>

<main class="h-screen w-screen flex items-center justify-center p-8">
  {#if article}
    <HorizontalContainer>
      <div class="flex h-full snap-center flex-col justify-center">
        <h1>{article?.title}</h1>
        <p>{article.byline} | {article.siteName}</p>
      </div>
      <div class="flex snap-center flex-col">
        {@html article?.content}
      </div>
    </HorizontalContainer>
  {/if}
</main>
