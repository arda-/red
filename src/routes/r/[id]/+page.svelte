<script lang="ts">
	import { each } from "svelte/internal";


    /** @type {import('./$types').PageData} */
    export let data: any;

    let {posts} = data;
</script>


<div class="
    relative w-full h-screen
    flex gap-6
    pb-14 
    bg-blue-200
    dark:bg-[#000011]
    overflow-y-hidden
    overflow-x-auto"
>
    <div class="w-36 bg-red-100 shrink0-0">
        test
    </div>
    {#each posts as {author, title, ...rest}}
        <div class="
            rounded-xl p-4 shadow-lg 
            snap-always
            snap-center
            mr-4
            shrink-0
            w-5/6 h-fit
            overflow-y-scroll
            overflow-none
            bg-white dark:bg-slate-900
            text-neutral-700 dark:text-neutral-300
            "
        >
            <div class="
                text-xl font-semibold leading-tight 
            ">
                {title}</div>
            <div>{author}</div>
            {#if rest.post_hint === "image"}
                <div class="">
                    <img src={rest.url} alt="post" />
                </div>
                {/if}
            <div class="whitespace-pre text-xs font-mono">{JSON.stringify(rest, null, 2)}</div>
        </div>
    {/each}
</div>
