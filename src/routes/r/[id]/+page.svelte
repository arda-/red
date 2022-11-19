<script lang="ts">
	import { each } from "svelte/internal";


    /** @type {import('./$types').PageData} */
    export let data: any;

    let {posts} = data;
</script>


<div class="
    relative w-full
    flex items-start gap-4 sm:gap-6
    pb-14 
    bg-blue-200
    dark:bg-[#000011]
    overflow-x-auto
    snap-x snap-mandatory"
>
    {#each posts as {author, title, url, thumbnail, ...rest}}
        <div class="
            rounded-xl p-4 shadow-lg 
            snap-center shrink-0
            mt-12
            first:ml-16
            last:mr-16
            w-5/6 max-w-3xl
            bg-white dark:bg-slate-900
            text-neutral-700 dark:text-neutral-300
            overflow-y-scroll
            "
        >
            <div class="
                text-xl font-semibold leading-tight
            ">
                {title}</div>
            <div>{author}</div>
            <div>{url}</div>
            <div class="h-3/4 max-h-5/6 shrink-0">
                {#if rest.post_hint === "image"}
                    <img 
                        src={url} 
                        alt="post" loading="lazy" 
                    />
                {/if}
                {#if url.endsWith("gifv") && rest.domain === "i.imgur.com"}
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video
                        on:mouseenter={(e) => e?.target?.play()}
                        on:mouseleave={(e) => e?.target?.pause()}
                        controls
                        poster={url.slice(0,-4).concat("jpg")}
                        preload="none"
                        src={url.slice(0,-4).concat("mp4")} 
                    />
                {:else if rest.preview}
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video 
                        on:mouseenter={(e) => e?.target?.play()}
                        on:mouseleave={(e) => e?.target?.pause()}
                        poster={thumbnail}
                        preload="none"
                        src={rest.preview}
                    />
                {:else if rest.domain === "v.redd.it"}
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video 
                        on:mouseenter={(e) => e?.target?.play()}
                        on:mouseleave={(e) => e?.target?.pause()}
                        poster={thumbnail}
                        preload="none"
                        src={`${rest.url}.mp4`}
                    />
                {/if}
            </div>

            <div class="whitespace-pre text-xs font-mono">{JSON.stringify(rest, null, 2)}</div>
        </div>
    {/each}
</div>
