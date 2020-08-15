import { IonModal } from '@ionic/react'
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

// TODO : RatingBlockModal에 데이터를 어떻게 바인딩할까?
// props? store??

export const RatingBlockForm = ({ rating, isShow }: Partial<IRatingBlock> & { isShow: boolean }) => (
  <IonModal isOpen={isShow} cssClass='my-custom-class'>
    <p>This is modal content</p>
    {/* <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton> */}
  </IonModal>
)
