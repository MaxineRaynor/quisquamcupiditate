import assert from 'node:assert'

import {
  Controller,
  Get,
  Inject,
  Body,
  Post,
  Query,
} from '@midwayjs/core'
import type { Context } from '@mwcp/share'

import {
  CommonSetMethodInputData,
  CreateTaskDTO,
  SetProgressInputData,
  ServerURL,
  ServerMethod,
  SetProgressDTO,
  TaskDTO,
  TaskProgressDetailDTO,
  TaskProgressDTO,
  TaskResultDTO,
  TaskStatistics,
  TaskPayloadDTO,
  SetStateInputData,
  PickInitTaskOptions,
} from '../lib/index'
import { TaskQueueService } from '../service/index.service'


@Controller(ServerURL.base)
export class ServerController {

  @Inject() protected readonly ctx: Context
  @Inject() protected readonly queueSvc: TaskQueueService

  @Post('/' + ServerURL.create)
  async [ServerMethod.create](@Body() input: CreateTaskDTO): Promise<TaskDTO> {
    const ret = await this.queueSvc.create(input)
    return ret
  }

  @Get('/' + ServerURL.getInfo)
  async [ServerMethod.getInfo](@Query('id') id: TaskDTO['taskId']): Promise<TaskDTO | undefined> {
    const ret = await this.queueSvc.getInfo(id)
    return ret
  }

  @Get('/' + ServerURL.stats)
  async [ServerMethod.stats](): Promise<TaskStatistics> {
    const ret = await this.queueSvc.stats()
    return ret
  }

  @Post('/' + ServerURL.setRunning)
  async [ServerMethod.setRunning](
    @Body() input: CommonSetMethodInputData,
  ): Promise<TaskDTO | undefined> {

    const { id, msg } = input
    const ret = await this.queueSvc.setRunning(id, msg)
    return ret
  }

  @Post('/' + ServerURL.setCancelled)
  async [ServerMethod.setCancelled](
    @Body() input: CommonSetMethodInputData,
  ): Promise<TaskDTO | undefined> {

    const { id, msg } = input
    const ret = this.queueSvc.setCancelled(id, msg)
    return ret
  }

  @Post('/' + ServerURL.setFailed)
  async [ServerMethod.setFailed](
    @Body() input: CommonSetMethodInputData,
  ): Promise<TaskDTO | undefined> {

    const { id, msg } = input
    const ret = await this.queueSvc.setFailed(id, msg)
    return ret
  }

  @Post('/' + ServerURL.setSucceeded)
  async [ServerMethod.setSucceeded](
    @Body() input: CommonSetMethodInputData,
  ): Promise<TaskDTO | undefined> {

    const { id, msg: result } = input
    const ret = await this.queueSvc.setSucceeded(id, result)
    return ret
  }

  /**
   * @description task must in state pending
   */
  @Post('/' + ServerURL.setProgress)
  async [ServerMethod.setProgress](
    @Body() input: SetProgressInputData,
  ): Promise<TaskProgressDTO | undefined> {

    const info: SetProgressDTO = {
      taskId: input.id,
      taskProgress: input.progress,
    }
    const ret = await this.queueSvc.setProgress(info, input.msg)
    return ret
  }

  @Get('/' + ServerURL.getProgress)
  async [ServerMethod.getProgress](
    @Query('id') id: TaskDTO['taskId'],
  ): Promise<TaskProgressDetailDTO | undefined> {

    const ret = await this.queueSvc.getProgress(id)
    return ret
  }

  @Get('/' + ServerURL.getResult)
  async [ServerMethod.getResult](
    @Query('id') id: TaskDTO['taskId'],
  ): Promise<TaskResultDTO | undefined> {

    const ret = await this.queueSvc.getResult(id)
    return ret
  }

  @Post('/' + ServerURL.pickTasksWaitToRun)
  async [ServerMethod.pickTasksWaitToRun](
    @Body() input: PickInitTaskOptions,
  ): Promise<TaskDTO[]> {

    assert(
      Array.isArray(input.taskTypeVerList) || `${input.taskTypeVerList}` === '*',
      'taskTypeVerList must be array or *',
    )

    if (! input.taskTypeId) {
      throw new Error('taskTypeId is required when taskTypeVerList is not empty')
    }

    const ret = await this.queueSvc.pickTasksWaitToRun(input)
    return ret
  }

  @Get('/' + ServerURL.getPayload)
  async [ServerMethod.getPayload](
    @Query('id') id: TaskDTO['taskId'],
  ): Promise<TaskPayloadDTO | undefined> {

    const ret = await this.queueSvc.getPayload(id)
    return ret
  }

  @Post('/' + ServerURL.setState)
  async [ServerMethod.setState](
    @Body() input: SetStateInputData,
  ): Promise<TaskDTO | undefined> {

    const { id, state, msg } = input
    const ret = await this.queueSvc.setState(id, state, msg)
    return ret
  }

  @Get('/' + ServerURL.hello)
  async [ServerURL.hello](): Promise<'OK'> {
    return 'OK'
  }
}

