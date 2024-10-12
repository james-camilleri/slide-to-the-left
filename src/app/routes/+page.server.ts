import type { PageServerLoad } from './$types'

import { redirect } from '@sveltejs/kit'

export const prerender = true

export const load = (async () => {
  throw redirect(307, '/slides/0')
}) satisfies PageServerLoad
