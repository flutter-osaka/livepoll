<template>
  <div class="container">
    <div class="w-full">
      <div
        v-for="(answer, index) in question.answers"
        :key="answer"
        :style="{
          borderRadius: '4px',
          backgroundColor: selectedValue === index ? '#007bc7' : '#fff',
          color: selectedValue === index ? '#fff' : '#000'
        }"
        class="p-8 mt-4 mw-4 border border-solid border-primary border-radius cursor-pointer"
        @click="() => (selectedValue = index)"
      >
        {{ answer }}
      </div>
    </div>
    <div class="w-full">
      <div
        :style="
          $cookie.get(`livepoll-osaka-${questionId}-cookie`) !== undefined
            ? { opacity: 0.25, borderRadius: '4px' }
            : { borderRadius: '4px' }
        "
        class="p-8 mt-4 mw-4 border border-solid border-primary border-radius cursor-pointer"
        @click="handleAddVote(questionId)"
      >
        投票する
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import Vue from 'vue'

import { addVote, fetchQuestionById } from '~/services/questionService'

export default Vue.extend({
  async asyncData({ params }: Context) {
    const question = await fetchQuestionById(params.id)
    return {
      question: question,
      questionId: params.id
    }
  },
  data() {
    return {
      selectedValue: null as number | null
    }
  },
  methods: {
    async handleAddVote(questionId: string): Promise<void> {
      await addVote({
        questionId: questionId,
        answerId: this.selectedValue
      })
      this.$cookie.set(`livepoll-osaka-${questionId}-cookie`, true)
      this.selectedValue = null
    }
  }
})
</script>
