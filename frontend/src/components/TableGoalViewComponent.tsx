import React, { Fragment } from 'react'

import { IBlockFrame } from '../models/block/BlockFrame'
import { IBlockRow } from '../models/block/BlockRow'
import {
  BlockType,
  ICreatedTimeBlock,
  IRatingBlock,
  ITagBlock,
  ITextBlock,
} from '../models/block/BlockType.d'
import { CreatedTimeBlock, RatingBlock, TagBlock, TextBlock } from './block'
import { RatingBlockForm } from './block/RatingBlockForm'

const blockFrames: IBlockFrame[] = [
  { id: 1, name: '평가', type: BlockType.RatingBlock, order: 1 },
  { id: 2, name: '메모', type: BlockType.TextBlock, order: 2 },
  { id: 3, name: '긍정원인', type: BlockType.TagBlock, order: 3 },
  { id: 4, name: '부정원인', type: BlockType.TagBlock, order: 4 },
  { id: 5, name: '일시', type: BlockType.CreatedTimeBlock, order: 5 },
]

const blockRow: IBlockRow = {
  id: 1,
  createdAt: new Date(),
  blockColumns: [
    { blockFrameId: 1, rating: 5 },
    { blockFrameId: 2, content: '랄라-메모' },
    { blockFrameId: 3, content: '랄라' },
    { blockFrameId: 4, content: '랄라' },
    { blockFrameId: 5, timestamp: 1591276099502 },
  ],
}

const blockRows: IBlockRow[] = [blockRow]

function renderBlockBy(col: any) {
  const blockFrame = blockFrames.find((v) => v.id === col.blockFrameId)
  let p = null
  switch (blockFrame?.type) {
    case BlockType.RatingBlock:
      p = col as IRatingBlock
      return <RatingBlock rating={p.rating}></RatingBlock>
    case BlockType.TextBlock:
      p = col as ITextBlock
      return <TextBlock></TextBlock>
    case BlockType.TagBlock:
      p = col as ITagBlock
      return <TagBlock></TagBlock>
    case BlockType.CreatedTimeBlock:
      p = col as ICreatedTimeBlock
      return <CreatedTimeBlock></CreatedTimeBlock>
  }
}

export const TableGoalViewComponent = () => {
  return (
    <Fragment>
      <table>
        <thead>
          {blockFrames.map((v) => (
            <th key={v.id}>{v.name}</th>
          ))}
        </thead>
        <tbody>
          {blockRows.map((row) => (
            <tr key={row.id}>
              {row.blockColumns.map((col) => (
                <td key={col.blockFrameId}>{renderBlockBy(col)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <RatingBlockForm /> */}
    </Fragment>
  )
}
