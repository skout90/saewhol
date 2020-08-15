import React from 'react'

import { IRatingBlock } from '../../models/block/BlockType'
import { Rating } from '../ui/molecules/RatingComponent'

const ratingText = (rating?: number) => {
  switch (rating) {
    case 0:
      return 'Bad'
    case 5:
      return 'Good'
    case 10:
      return 'Excellent'
    default:
      return ''
  }
}

export const RatingBlock = ({ rating }: Partial<IRatingBlock>) => (
  <Rating rating={rating}>{ratingText(rating)}</Rating>
)
