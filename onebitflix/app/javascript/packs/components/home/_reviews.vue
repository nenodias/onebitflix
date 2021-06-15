<template>
  <v-layout row wrap>
    <v-flex md5 offset-md1 xs10 offset-xs1 mb-3 mt-2>
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card>
            <v-list three-line class="review - box" dark subheader>
              <template v-for="(review, index) in reviews">
                <v-list-item :key="index" ripple>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{
                      review.description
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-icon
                        v-for="r in review.avaliation"
                        :key="r"
                        color="red"
                        >favorite</v-icon
                      >
                      <v-icon
                        v-for="r in 5 - review.avaliation"
                        :key="review.avaliation + r"
                        color="white"
                        >favorite</v-icon
                      >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index + 1 < reviews.length"
                  :key="`divider-${index}`"
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md4 xs10 mb-3 mt-2 offset-xs1>
      <v-card color="grey darken-3">
        <v-card-text>
          <h2 class="title">Deixe sua opinião</h2>
          <v-container fluid>
            <v-layout row wrap>
              <heart-rating
                rating-selected="rating = $event"
                :rating="rating"
                :item-size="20"
                :show-rating="false"
                active-color="#f44336"
                inactive-color="#fff"
                border-color="#424242"
              ></heart-rating>

              <v-flex md12>
                <v-text-field
                  name="input-1"
                  label="Descreva o que achou em pelo menos
180 caracters..."
                  textarea
                  dark
                  color="red"
                  rows="2"
                ></v-text-field>
              </v-flex>

              <v-flex xs8 md3>
                <v-btn dark large> <v-icon left>send</v-icon>Enviar </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
 
<script>
const reviews_mock = [
  {
    description:
      "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
    avaliation: 3,
  },
  {
    description:
      "Wish I could come, but I'm out of town this weekend. I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
    avaliation: 3,
  },
  {
    description: "Do you have Paris recommendations? Have you ever been?",
    avaliation: 1,
  },
  {
    description:
      "Have any ideas about what we should get Heidi for her birthday?",
    avaliation: 3,
  },
  {
    description:
      "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
    avaliation: 5,
  },
  {
    description:
      "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
    avaliation: 3,
  },
  {
    description: "Wish I could come, but I'm out of town this weekend.",
    avaliation: 3,
  },
  {
    description: "Do you have Paris recommendations? Have you ever been?",
    avaliation: 3,
  },
  {
    description:
      "Have any ideas about what we should get Heidi for her birthday?",
    avaliation: 3,
  },
  {
    description:
      "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
    avaliation: 3,
  },
];

import { HeartRating } from "vue-rate-it";

export default {
  props: {
    watchable: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reviews: reviews_mock,
      rating: 2,
    };
  },
  components: {
    HeartRating,
  },
};
</script>
 
<style scoped>
.title {
  font-weight: 600;
  font-size: 26px !important;
  font-family: "Source Sans Pro";
  color: white;
  margin-left: 12px;
}
.review-box {
  overflow: auto;
  max-height: 300px;
}
.btn {
  margin-left: 0;
}
</style>