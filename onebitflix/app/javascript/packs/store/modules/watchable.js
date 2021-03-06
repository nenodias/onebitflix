import Api from '../../api';

const Watchable = {
    namespaced: true,
    state: {
        featured: null,
        keepWatching: null,
        categories: [],
        watchable: null
    },
    mutations: {
        setFeatured(state, watchable) {
            let featured = null;
            if (watchable && watchable.data && watchable.data.attributes) {
                featured = watchable.data.attributes;
            }
            state.featured = featured;
        },
        setKeepWatching(state, watchables) {
            let keepWatching = null;
            if (watchables && watchables.data) {
                keepWatching = watchables.data;
            }
            state.keepWatching = keepWatching;
        },
        setCategories(state, categories) {
            state.categories = categories.data;
        },
        setWatchable(state, watchable) {
            state.watchable = watchable.data;
        }
    },
    actions: {
        getFeatured(context) {
            Api.Watchable.getFeatured()
                .then(response => response.data)
                .then(watchable => {
                    context.commit('setFeatured', watchable)
                }).catch(function (error) {
                    console.log(error);
                });
        }, getKeepWatching(context) {
            Api.Watchable.getKeepWatching()
                .then(response => response.data)
                .then(watchables => {
                    context.commit('setKeepWatching', watchables)
                }).catch(function (error) {
                    console.log(error);
                });
        },
        getCategories(context) {
            Api.Watchable.getCategories()
                .then(response => response.data)
                .then(categories => {
                    context.commit('setCategories', categories)
                }).catch(function (error) {
                    console.log(error);
                });
        },
        getWatchable(context, { id, type }) {
            Api.Watchable.getWatchable(id, type)
                .then(response => response.data)
                .then(watchable => {
                    context.commit('setWatchable', watchable)
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }
};

export default Watchable;