import { gql, GraphQLClient } from 'graphql-request';
export async function get() {
	const graphCmsClient = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_ENDPOINT, { headers: {} });
	try {
		const query = gql`
			query LaunchesIndex {
				launches {
					id
					slug
					date
					name
				}
			}
		`;
		const { launches } = await graphCmsClient.request(query);

		return {
			status: 200,
			body: { launches }
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
