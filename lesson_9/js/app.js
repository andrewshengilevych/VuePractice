Vue.component('film', {
  template: '#film-template',
  props: ['film', 'index', 'films'],
  methods: {
    toggleEditMode () {
      this.film.edit = !this.film.edit
    },
    update () {
      axios.patch(`/api/movies/${this.film.id}`, this.film)
      .then((response) => {
        this.film.edit = false
      })
      .catch(function (error) {
        console.error(error);
      })
    },
    create () {
      axios.post(`/api/movies/`, this.film)
      .then((response) => {
        this.film.edit = false
        this.film.id = response.data.id
      })
      .catch(function (error) {
        console.error(error);
      })
    },
    remove () {
      axios.delete(`/api/movies/${this.film.id}`)
      .then((response) => {
        let index = this.films.indexOf(this.film)
        this.films.splice(index, 1)
      })
      .catch(function (error) {
        console.error(error);
      })
    }
  }
})

new Vue({
  el: '#app',
  data: {
    films: []
  },
  mounted () {
    this.getFilms()
  },
  methods: {
    getFilms () {
      axios.get(`/api/movies`)
        .then((response) => {
          let films = response.data.map((film) => {
            film.edit = false
            return film
          })
          Vue.set(this, 'films', response.data)
        })
        .catch(function (error) {
          console.error(error);
        })
    },
    addItem () {
      let newItem = {
        id: null,
        title: '',
        director: '',
        edit: true
      }
      this.films.push(newItem)
    }
  }
})
