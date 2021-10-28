import { gql, GraphQLClient } from 'graphql-request';

export async function get(req) {
	const graphCmsClient = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_ENDPOINT, { headers: {} });
	const slug = req.params.slug;
	try {
		const query = gql`
			query GetMission($slug: String!) {
				mission: launch(where: { slug: $slug }) {
					year
					date
					name
					launchSuccess
					rocket {
						name
						type
						image {
							fileName
							url(transformation: { image: { resize: { width: 500, height: 500, fit: clip } } })
						}
					}
					launchSite {
						name
						longName
					}
					link {
						article
						pressKit
						video
						wikipedia
						flickrImages {
							url(transformation: { image: { resize: { width: 500, height: 500, fit: clip } } })
						}
					}
				}
			}
		`;

		const variables = { slug };

		const { mission } = await graphCmsClient.request(query, variables);

		return {
			status: 200,
			body: { mission }
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'A server error occurred'
			}
		};
	}
}
