import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { MorphMap } from '@holoyan/adonisjs-permissions'
// import { MorphMap as LogMorphMap } from '@holoyan/adonisjs-activitylog'
import { AclModelInterface, ModelIdType } from '@holoyan/adonisjs-permissions/types'
import { LogModelInterface } from '@holoyan/adonisjs-activitylog/types'
import Car from '#models/car'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

// @LogMorphMap('users')
@MorphMap('users')
export default class User
  extends compose(BaseModel, AuthFinder)
  implements AclModelInterface, LogModelInterface
{
  getModelId(): ModelIdType
  getModelId(): string
  getModelId(): ModelIdType | string {
    return this.id
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasMany(() => Car)
  declare cars: HasMany<typeof Car>
}
