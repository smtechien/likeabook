<script lang="ts">
  import parseElement from "@/utils/parseElement";
  import HorizontalContainer from "@/lib/HorizontalContainer.svelte";
  import TableOfContents from "@/lib/TableOfContents.svelte";
  import { onMount } from "svelte";

  interface ArticleData {
    title: string;
    byline: string;
    content: string;
    textContent: string;
    siteName: string;
    excerpt: string;
  }

  interface SectionData {
    headers: Element[];
    paragraphs: Element[];
  }

  let dataSections: Array<SectionData> | null = $state([]);

  // Svelte 5 rune for reactive state management
  let article = $state<ArticleData | null>(null);

  onMount(async () => {
    // Retrieve parsed article payload from local extension storage
    const data: any = await browser.storage.local.get(["activeArticle"]);
    if (data.activeArticle) {
      article = data.activeArticle;
      if (article) {
        // parse the section elements
        let sections: Array<Element> | null = parseElement(
          article.content,
          "section",
        );

        if (sections == null) {
          sections = parseElement(article.content, "#readability-page-1");
        }

        sections?.forEach((section) => {
          const headers = parseElement(section.innerHTML, "h2");
          const paragraphs = parseElement(
            section.innerHTML,
            "p:not(table p, :has(img)",
          );
          if (headers && paragraphs) {
            dataSections.push({ headers, paragraphs });
          }
        });
        // console.log(sections);
      }
    }
  });
</script>

<main
  class="h-screen w-screen flex items-center justify-center p-8"
  id="mainContainer"
>
  {#if article}
    <HorizontalContainer>
      <section
        class="flex-[0_0_100%] h-full gap-10 snap-center px-4"
        id="titleSection"
      >
        <h1>{article?.title}</h1>
        <div class="snap-center">{article.byline} | {article.siteName}</div>
        <div>
          <TableOfContents contents={dataSections} />
        </div>
      </section>
      <div class="flex-[0_0_100%] snap-center [column-width:100vw] gap-10">
        {#each dataSections as dataSection}
          <!-- content here -->
          <div>
            {#each dataSection.headers as header}
              <h2 class="text-center" id={header.textContent}>
                {@html header.innerHTML}
              </h2>
              {#each dataSection.paragraphs as paragraph}
                <p>{@html paragraph.innerHTML}</p>
              {/each}
              <div class="">---</div>
            {/each}
          </div>
        {/each}
      </div>
      <!-- {@html article?.content} -->
    </HorizontalContainer>
  {/if}
</main>
