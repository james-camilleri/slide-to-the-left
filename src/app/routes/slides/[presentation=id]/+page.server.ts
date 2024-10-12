import type { PageServerLoad } from './$types'

import { redirect } from '@sveltejs/kit'

export const load = (async ({ request }) => {
  throw redirect(307, `${request.url}/0`)
}) satisfies PageServerLoad
