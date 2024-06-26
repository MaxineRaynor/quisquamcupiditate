import {
  Config as _Config,
  Controller,
  Get,
} from '@midwayjs/core'
import type { Context } from '@mwcp/share'

import { TestRespBody } from '@/root.config'
import {
  ConfigKey,
  MiddlewareConfig,
} from '~/lib/types'


@Controller('/')
export class HomeController {

  @_Config(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  @Get('/')
  async home(ctx: Context): Promise<TestRespBody> {
    const {
      cookies,
      header,
      url,
    } = ctx
    const mwConfig = this.mwConfig
    const res = {
      mwConfig,
      cookies,
      header,
      url,
    }
    return res
  }

}

