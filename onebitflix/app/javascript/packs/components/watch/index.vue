<template>
  <v-container mt-1>
    <v-layout row v-if="movie">
      <v-flex xs12 md10 offset-md1 center>
        <v-layout row>
          <v-flex xs12 md10>
            <h1 class="main_title" v-if="serie">
              {{ serie.attributes.title }}
            </h1>
            <h1 class="main_title" v-else>{{ movie.attributes.title }}</h1>
          </v-flex>
        </v-layout>

        <v-layout row pt-2 pb-2>
          <v-flex xs12 md12>
            <d-player
              :options="options"
              ref="player"
              @loadstart="setupPlayer"
              @ended="finishPlayer"
              @timeupdate="progressUpdate"
            >
            </d-player>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 md6 mt-1>
            <h1 class="secundary_title" v-if="serie">
              {{ movie.attributes.title }}
            </h1>
          </v-flex>

          <v-flex xs8 md3 class="text-lg-right" v-if="serie">
            <v-menu open-on-hover top offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text dark large v-bind="attrs" v-on="on">
                  <v-icon left>video_library</v-icon>Episódios
                </v-btn>
              </template>
              <v-list dark>
                <v-list-item
                  v-for="(episode, index) in serie.attributes.episodes"
                  :key="index"
                  :to="`/watch/${episode.id}`"
                >
                  <v-list-item-title>{{ episode.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-flex>

          <v-flex xs8 md3 class="text - lg - right">
            <v-btn dark large to="/watch/1">
              <v-icon left>skip_next</v-icon>Proximo
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
 
<script>
import VueDPlayer from "vue-dplayer";
import { mapActions } from "vuex";
import { mapState } from "vuex";

const dateToDouble = (date) => {
  date = date.replace("Z", "");
  const values = date.split("T")[1];
  const time = values.split(".")[0];
  const [hours, minutes, seconds] = time.split(":");
  return hours * 60 * 60 + minutes * 60 + seconds;
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

const doubleToDate = (double) => {
  if (double) {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (double > 3600) {
      hours = parseInt(double / 3600);
      double = double % 3600;
    }
    if (double > 60) {
      minutes = parseInt(double / 60);
      double = double % 60;
    }
    seconds = parseInt(double);
    return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
  }
  return "00:00:00";
};

export default {
  mounted() {
    const player = this.$refs.player.dp;
    player.seek(10);
  },
  data() {
    return {
      options: {
        screenshot: true,
        video: { url: "", pic: "" },
      },
      lastUpdateTime: 0,
      lastUpdateActive: false,
      loaded: false,
    };
  },
  components: {
    "d-player": VueDPlayer,
  },
  methods: {
    finishPlayer() {
      var currentdate = new Date();
      var datetime =
        currentdate.getFullYear() +
        "-" +
        zeroPad(currentdate.getMonth(), 2) +
        "-" +
        zeroPad(currentdate.getDate(),2) +
        "T" +
        zeroPad(currentdate.getHours(), 2) +
        ":" +
        zeroPad(currentdate.getMinutes(), 2) +
        ":" +
        zeroPad(currentdate.getSeconds(), 2) +
        ".000Z";

      this.updatePlayer({
        id: this.movie.id,
        elapsed_time: doubleToDate(this.$refs.player.dp.video.currentTime),
        end_date: datetime,
      });
    },
    ...mapActions({
      getPlayer: "Player/show",
      updatePlayer: "Player/update",
    }),
    setupPlayer() {
      if (this.player && this.player.elapsed_time != null) {
        this.$refs.player.dp.seek(dateToDouble(this.player.elapsed_time));
      }
    },
    progressUpdate() {
      if (this.$refs.player.dp.video.currentTime - this.lastUpdateTime > 5) {
        this.lastUpdateTime = this.$refs.player.dp.video.currentTime;
        console.log(this.$refs.player.dp.video.currentTime);
        if (this.lastUpdateActive == true) {
          this.updatePlayer({
            id: this.movie.id,
            elapsed_time: doubleToDate(this.$refs.player.dp.video.currentTime),
            end_date: null,
          });
        } else {
          this.lastUpdateActive = true;
        }
      }
    },
  },
  mounted() {
    this.getPlayer(this.$route.params.id);
  },
  computed: {
    ...mapState({
      player: (state) => state.Player.player,
      movie: (state) => state.Player.movie,
      serie: (state) => state.Player.serie,
    }),
  },
  watch: {
    movie: function () {
      this.options.video.url = this.movie.attributes.video_url;
      this.options.video.pic = this.movie.attributes.thumbnail_cover_url;
      this.loaded = true;
    },
  },
};
</script>
 
<style scoped>
.main_title {
  color: white;
  font-size: 24px !important;
  font-family: "Source Sans Pro";
  font-weight: 600;
}
.secundary_title {
  color: white;
  font-size: 20px !important;
  font-family: "Source Sans Pro";
  font-weight: 600;
}
.btn {
  margin-right: 0px;
}
</style>