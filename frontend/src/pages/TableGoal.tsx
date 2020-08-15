import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router'

import { TableGoalViewComponent } from '../components/TableGoalViewComponent'
import { $ } from '../components/ui'

const TableGoal: React.FC = () => {
  const { name } = useParams<{ name: string }>()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TableGoalViewComponent></TableGoalViewComponent>
      </IonContent>
    </IonPage>
  )
}

export default TableGoal
