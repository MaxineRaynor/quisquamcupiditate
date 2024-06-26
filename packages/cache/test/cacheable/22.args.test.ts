import assert from 'node:assert/strict'
import { relative } from 'node:path'

import { apiPrefix, apiRoute } from '@/fixtures/base-app/src/api-route'
import { testConfig } from '@/root.config'


const filename = relative(process.cwd(), __filename).replace(/\\/ug, '/')

describe(filename, () => {
  describe('Should @Cacheable decorator work', () => {
    const prefix = apiPrefix.args

    it(apiRoute.ttl, async () => {
      const { httpRequest } = testConfig
      const url = `${prefix}/${apiRoute.ttl}`

      const resp = await httpRequest
        .get(url)
        .expect(200)

      assert(resp)
    })

    it(apiRoute.cacheName, async () => {
      const { httpRequest } = testConfig
      const url = `${prefix}/${apiRoute.cacheName}`

      const resp = await httpRequest
        .get(url)
        .expect(200)

      assert(resp)
    })

    it(apiRoute.condition, async () => {
      const { httpRequest } = testConfig
      const url = `${prefix}/${apiRoute.condition}`

      const resp = await httpRequest
        .get(url)
        .expect(200)

      assert(resp)
    })

  })
})

