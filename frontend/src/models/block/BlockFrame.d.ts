import { BlockType } from './BlockType.d'

export interface IBlockFrame {
  readonly id: number
  readonly type: BlockType
  readonly name: string
  readonly order: number
}
