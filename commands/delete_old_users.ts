import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import app from '@adonisjs/core/services/app'

export default class DeleteOldUsers extends BaseCommand {
  static commandName = 'test:user-get'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    // staysAlive: false,
  }

  async run() {
    const { default: User } = await import('#models/user')
    const { default: Car } = await import('#models/car')
    await User.first()
    await Car.first()
    // const c = await app.container.make('morphMap')
    // console.log(c)
    this.logger.info('Hello world from "DeleteOldUsers"')
  }
}
