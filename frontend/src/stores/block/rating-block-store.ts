import axios from 'axios'
import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'

import { INews } from '../../models/example/news'
import { Task } from '../task'

const initState = {
  news: [],
  query: '',
}

export class News {
  @observable.shallow news: INews[] = initState.news
  @observable query = initState.query

  constructor() {}

  @task
  getNews = <Task>(async () => {
    await axios('https://api.hnpwa.com/v0/news/1.json').then(
      ({ data }: { data: INews[] }) => (this.news = data)
    )
  })

  @action
  setQuery = (_query: string) => {
    this.query = _query
  }

  @computed
  get filteredNews(): INews[] {
    return this.news.filter((v) => v.title.includes(this.query))
  }
}
