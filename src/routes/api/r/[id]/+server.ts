import type { RequestHandler } from './$types';



export const GET: RequestHandler = async ({ params }) => {
    const time = Date.now();

	console.log('api/r/[id]', time);
    console.log("params", params);
    
    try {
        const url = `https://www.reddit.com/r/${params.id}/.json`
        // todo: make programatic
        const req = await fetch(url);
        const res = await req.json();

        console.log(req.ok)

        // todo: search for whether the subreddit exists first
        // assuming it does exist:

        const children = res.data.children;

        const posts: any[] = []

        children.forEach((child: any) => {
            child = child.data; // janky
            posts.push({
                // do this using key/value picking
                "author_fullname": child.author_fullname,
                "title": child.title,
                "name": child.name,
                "upvote_ratio": child.upvote_ratio,
                "score": child.score,
                "thumbnail": child.thumbnail,
                "post_hint": child.post_hint,
                "domain": child.domain,
                "url_overridden_by_dest": child.url_overridden_by_dest,
                "author": child.author,
                "num_comments": child.num_comments,
                "permalink": child.permalink,
                "url": child.url,
                "created_utc": child.created_utc,
                "media": child.media?.oembed,
                "preview": child.preview?.reddit_video_preview?.fallback_url
            });
        });

        // console.log(posts);

        return new Response(
            JSON.stringify(
                { 
                    posts
                }
            ),
            {
                headers: {
                    'content-type': 'application/json; charset=utf-8'
                }
            }
        );


    } catch (e) {
        return new Response(
            JSON.stringify(e),
            {
                headers: {
                    'content-type': 'application/json; charset=utf-8'
                },
                status: 500,
            },
        );
    }


};
