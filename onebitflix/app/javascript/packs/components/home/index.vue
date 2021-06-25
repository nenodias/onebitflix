<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <Featured v-if="featuredMovie" :movie="featuredMovie" />
      <MovieList
        v-if="keepWatching"
        name="Continue assistindo"
        :movies="keepWatching"
      />
      <MovieList
        v-for="(category, index) in categories"
        :key="index"
        :name="category.attributes.name"
        :movies="getMovies(category)"
      />
    </v-flex>
  </v-layout>
</template>
 
<script>
import Featured from "./_featured";
import MovieList from "./_movie_list";
import { mapState } from "vuex";

export default {
  components: {
    Featured,
    MovieList,
  },
  methods:{
    getMovies(category){
      return [
        ...category.attributes.movies.data,
        ...category.attributes.series.data,
      ];
    }
  },
  computed: mapState({
    featuredMovie: (state) => state.Watchable.featured,
    keepWatching: (state) => state.Watchable.keepWatching,
    categories: (state) => state.Watchable.categories,
  }),
  mounted: function () {
    this.$store.dispatch("Watchable/getFeatured");
    this.$store.dispatch("Watchable/getKeepWatching");
    this.$store.dispatch("Watchable/getCategories");
  },
};
</script>
 
<style scoped>
</style>