import { IonSpinner } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import { useStore } from '../../hooks/use-store'
import NewsItem from './NewsItem'

interface INewsList {}

const ExampleContainer: React.FC<INewsList> = () => {
  const { news } = useStore()

  useEffect(() => {
    news.getNews()
  }, [])

  return useObserver(() => (
    <>
      {news.getNews.match({
        pending: () => (
          <div className='height-150 flex-center'>
            <IonSpinner color='tertiary' name='crescent' />
          </div>
        ),
        resolved: () => (
          <ul className='pl-0 move-up'>
            {news.filteredNews.map((v, i) => (
              <NewsItem
                key={i}
                id={v.id}
                title={v.title}
                domain={v.domain}
                user={v.user}
                comments_count={v.comments_count}
                time_ago={v.time_ago}
              ></NewsItem>
            ))}
          </ul>
        ),
      })}
    </>
  ))
}

export default ExampleContainer
