import type { RequestHandler } from './$types';


// turn reddit comment into reasonable thing
function redditCommentToOurStuff(rc: any, depth = 1) {
    // console.log("redditCommentToOurStuff", depth);

    if (!!!rc) {
        return
    }

    if (rc.kind === "more") {
        // not a comment to unwrap
        // console.log("- returning early cuz rc.kind was more");
        return
    }
    
    if (depth === 3) {
        // we've already done enough recursive comment unwraps. 
        // console.log("- returning early cuz of detph");
        return
    }; 

    const data = rc.data;

    const child = {
        "comment_type": data.comment_type,
        "likes": data.likes,
        "replies": data.replies,
        "id": data.id,
        "author": data.author,
        "created_utc": data.created_utc,
        "parent_id": data.parent_id,
        "score": data.score,
        "author_fullname": data.author_fullname,
        "body": data.body,
        "name": data.name,
        "is_submitter": data.is_submitter,
        "downs": data.downs,
        "body_html": data.body_html,
        "link_id": data.link_id,
        "permalink": data.permalink,
        "created": data.created,
        "subreddit_name_prefixed": data.subreddit_name_prefixed,
        "controversiality": data.controversiality,
        "depth": data.depth,
        "ups": data.ups,
    }

    // console.log("intermediate child", child);

    if (data.replies === "") {
        // console.log("returning earliy cuz replies are emptystring")
        // nothing to do 
        return child;
    } else {
        // console.log("unwrapping descrendants")

        // the post actually has reply comments
        // NB this is recursive and may not be performant.
        // todo: limit to 3
        // todo: somehow sort for best replies?

        const furtherChildren: any[] = [];
        
        const subreplies = data.replies.data.children;
        // console.log("- subreplies", subreplies)
        subreplies.forEach((reply: any) => {
            // console.log("sub reply", reply)
            furtherChildren.push(redditCommentToOurStuff(reply, depth + 1))
        });

        // console.log(furtherChildren);
        child.replies = furtherChildren;
    }

    // console.log("returning:", child);
    return child;
}

export const GET: RequestHandler = async () => {
	const time = Date.now();
	console.log('api/post', time);

    try {
        const url = `https://www.reddit.com/comments/wwgrdu/.json` // todo: make programatic
        
        const req = await fetch(url);
        const res = await req.json();

        console.log("fetched", "wwgrdu", req.ok)

        // todo: check whether the post exists
        // assuming it does exist:

        const postInfo = res[0].data;
        const comments = res[1].data.children;


        const trimmedComments: any[] = [];

        comments.forEach((c: any)  => {
            const ourStuff = redditCommentToOurStuff(c)
            // console.log("ourStuff === undefined", ourStuff === undefined, ourStuff === null)
            // if ((ourStuff === undefined) === true) {
            //     console.log(c);
            // }
            if (!!ourStuff) trimmedComments.push(ourStuff)  // prevents undefined "more" conversion block
        });
        
        console.log("postInfo", postInfo);
        console.log("trimmedComments", trimmedComments);


        return new Response(
            JSON.stringify(
                { 
                    postInfo: postInfo,
                    trimmedComments: trimmedComments,
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
