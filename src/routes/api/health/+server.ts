import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const time = Date.now();

	console.log('health.json.ts', time);

	return new Response(
		JSON.stringify(
			{
				method: 'health.json',
				time,	
			}
		),
		{
			headers: {
				'content-type': 'application/json; charset=utf-8'
			}
		}
	);
};
