import { redis } from "../redis/client";

interface GetSubscriberInviteClicks {
	subscriberId: string;
}

export async function getSubscriberInviteClicks({
	subscriberId,
}: GetSubscriberInviteClicks) {
	const count = await redis.hget("referral:access-count", subscriberId);

	return { count: count ? Number.parseInt(count) : 0 };
}
