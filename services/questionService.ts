import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

import { connectCollection } from '~/services/collectionService'

const PAGE_SIZE = 20

export const answers: Array<Answer> = [
  {
    text: '',
    placeholder: '答え'
  }
]

/**
 * 質問一覧を取得する
 */
export const fetchQuestions = async () => {
  let result: {
    item: Array<{
      id: string
      data: { [field: string]: any }
      page: number
    }>
  } = {
    item: []
  }

  await connectCollection('questions')
    .orderBy('time', 'desc')
    .get()
    .then((snapshot: any) => {
      let i = 1
      snapshot.forEach((doc: { id: string; data: any }) => {
        // console.log(doc.id + ' ' + doc.data())
        result.item.push({
          id: doc.id,
          data: doc.data(),
          page: Math.ceil(i / PAGE_SIZE)
        })
        i++
      })
    })

  return result
}

/**
 * 質問を取得する
 * @param id
 */
export const fetchQuestionById = async (id: string) => {
  let result: {
    [field: string]: any
  } = {}

  await connectCollection('questions')
    .where('id', '==', id)
    .get()
    .then((snapshot: any) => {
      snapshot.forEach((doc: { id: string; data: any }) => {
        // console.log(doc.id + ' ' + doc.data())
        result = doc.data()
      })
    })

  return result
}

/**
 * 投票結果を取得する
 */
export const fetchVotes = async () => {
  let result: {
    item: Array<{
      id: string
      data: { [field: string]: any }
      page: number
    }>
  } = {
    item: []
  }

  await connectCollection('votes')
    .orderBy('time', 'desc')
    .get()
    .then((snapshot: any) => {
      let i = 1
      snapshot.forEach((doc: { id: string; data: any }) => {
        // console.log(doc.id + ' ' + doc.data())
        result.item.push({
          id: doc.id,
          data: doc.data(),
          page: Math.ceil(i / PAGE_SIZE)
        })
        i++
      })
    })

  return result
}

/**
 * 質問を追加する
 * @param title
 * @param answers
 */
export const addQuestion = async ({ title, answers }: Tip) => {
  if (title === '') {
    return
  }

  const size: number = answers!.length
  if (size === 0) {
    return
  }

  let answerTexts: string[] = []
  for (let key = 0; key < size; key++) {
    answerTexts.push(answers![key].text)
  }

  await connectCollection('questions').add({
    id: uuidv4(),
    title: title,
    answers: answerTexts,
    time: dayjs().format()
  })
}

/**
 * 投票する
 * @param questionId
 * @param answerId
 */
export const addVote = async ({ questionId, answerId }: Tip) => {
  await connectCollection('votes').add({
    question: questionId,
    answer: answerId,
    time: dayjs().format()
  })
}

interface Tip {
  title?: string | ''
  answers?: Array<Answer> | []
  questionId?: string | number | null
  answerId?: string | number | null
}

interface Answer {
  text: string
  placeholder: string
}
