/**
 * R2 image storage is optional. This deployment currently runs without the
 * IMAGES binding (see workers/wrangler.toml — R2 is disabled for the
 * free-tier-only phase, matching the same pattern already used for
 * REST_NOTIFICATION_QUEUE in workers/functions/lib/routes/restNotifications.ts).
 *
 * Read through a Partial cast so this compiles no matter how the generated
 * Cloudflare.Env type currently declares IMAGES (present, optional, or absent
 * entirely once workers/worker-configuration.d.ts is regenerated against a
 * wrangler.toml with no r2_buckets block) — if the binding is configured
 * again later, this starts returning the real bucket with no code change
 * needed here.
 */
export function getImagesBucket(env: Cloudflare.Env): R2Bucket | undefined {
	return (env as Partial<{ IMAGES: R2Bucket }>).IMAGES
}

export const IMAGES_NOT_CONFIGURED_MESSAGE = 'Image uploads are not configured on this deployment'
