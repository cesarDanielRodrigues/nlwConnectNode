import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getSubscriberInviteRanking } from "../functions/get-subscriber-invite-ranking";

export const getSubscriberInviteRankingRoute: FastifyPluginAsyncZod = async (
	app,
) => {
	app.get(
		"/subscribers/:subscriberId/ranking/position",
		{
			schema: {
				summary: "Get subscriber invite ranking position",
				tags: ["referral"],
				params: z.object({
					subscriberId: z.string(),
				}),
				response: {
					200: z.object({
						position: z.number().nullable(),
					}),
				},
			},
		},
		async (request) => {
			const { subscriberId } = request.params;

			const { position } = await getSubscriberInviteRanking({ subscriberId });

			return { position };
		},
	);
};
