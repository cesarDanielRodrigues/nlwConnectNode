import { redis } from "../redis/client";

interface GetSubscriberInviteRankingParams {
	subscriberId: string;
}

export async function getSubscriberInviteRanking({
	subscriberId,
}: GetSubscriberInviteRankingParams) {
	const rank = await redis.zrevrank("referral:ranking", subscriberId);

	if (rank === null) {
		return { position: null };
	}

	return { position: rank + 1 };
}
