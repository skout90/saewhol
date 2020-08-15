import React from 'react'

import { TextLg } from '../atoms/typography/TextLgComponent'

interface IRatingComponent {
  rating: number
  children: React.ReactNode
}

const ratingColor = (rating?: number) => {
  switch (rating) {
    case 0:
      return 'bg-m-gray'
    case 5:
      return 'bg-m-red'
    case 10:
      return 'bg-m-blue'
  }
}

export const Rating = ({ rating, children }: Partial<IRatingComponent>) => (
  <div className={`${ratingColor(rating)} br-md`}>
    <TextLg>{children}</TextLg>
  </div>
)
