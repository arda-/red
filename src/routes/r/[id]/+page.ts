/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ fetch, params }) {
	console.log("/r/[slug]/+page.server.ts - params", params)

    try {
        // const url = `/api/r/${params.id}`;
        // const url = `https://www.reddit.com/r/halo/.json`
        const url = `/api/r/1`
        console.log("--url", url)
        const req = await fetch(url);
        const res = await req.json();
        // console.log("--res", res)

        console.log(res);

        return res;
    } catch (e) {
        console.error(e);
        return e;
    }
}
