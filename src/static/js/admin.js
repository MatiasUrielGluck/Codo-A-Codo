if (document.getElementById("app")) {
    const app = new Vue({
        el: "#app",
        data: {
            pianos: [],
            errored: false,
            loading: true
        },
        created() {
            var url = 'https://gluck-pianos.herokuapp.com/pianos'
            this.fetchData(url)
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.pianos = data;
                        this.loading = false;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            },
            eliminar(piano) {
                const url = 'https://gluck-pianos.herokuapp.com/piano/' + piano;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            }
        }
    })
}
