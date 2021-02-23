<template>
  <div class="container">
    <div class="w-full">
      <j-input
        :text="title"
        placeholder="タイトル"
        class="mt-4 w-full"
        @handleInput="(val) => (title = val)"
      />
      <j-input
        v-for="(answer, index) in answers"
        :key="index"
        :text="answer.text"
        :placeholder="answer.placeholder"
        class="mt-4 w-full"
        @handleInput="(val) => (answer.text = val)"
      />
      <j-button
        text="答えを追加する"
        :disabled="answers.length >= 4"
        class="mt-4"
        @handleClick="answers.push({ text: '', placeholder: '答え' })"
      />
      <j-button
        text="質問を追加する"
        :disabled="answers.length < 2"
        class="mt-4"
        @handleClick="handleAddQuestion"
      />
    </div>

    <div class="w-full mw-4 flex flex-col justify-center">
      <a
        v-for="question in questions.item"
        :key="question.id"
        :href="`/poll/${question.data.id}`"
        :style="{ borderRadius: '4px' }"
        class="p-8 mt-4 mw-4 border border-solid border-primary"
      >
        {{ question.data.title }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import {
  fetchQuestions,
  fetchVotes,
  addQuestion,
  answers
} from '~/services/questionService'

export default Vue.extend({
  async asyncData() {
    const questions = await fetchQuestions()
    const votes = await fetchVotes()
    return { questions, votes }
  },
  data() {
    return {
      title: '' as string,
      answers: answers
    }
  },
  methods: {
    async handleAddQuestion(): Promise<void> {
      await addQuestion({
        title: this.title,
        answers: this.answers
      })
      this.title = ''
      this.answers = answers
    }
  }
})
</script>
