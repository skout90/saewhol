export enum BlockType {
  RatingBlock = 'RatingBlock',
  TagBlock = 'TagBlock',
  TextBlock = 'TextBlock',
  DateBlock = 'DateBlock',
  CreatedTimeBlock = 'CreatedTimeBlock',
}

interface IBlockType {
  id: number
  blockFrameId: number
}

export interface IRatingBlock extends IBlockType {
  rating: number
}

export interface ITagBlock extends IBlockType {
  itemId: number
  items: ITagBlockItem[]
}

export interface ITagBlockItem {
  id: number
  content: string
}

export interface ITextBlock extends IBlockType {
  content: string
}

export interface IDateBlock extends IBlockType {}

export interface ICreatedTimeBlock extends IBlockType {
  timestamp: Date
}
