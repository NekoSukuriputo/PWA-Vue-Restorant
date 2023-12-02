import api from '../../common/api';

export default {
    getAllFoods: () => api.getApi('/products'),
    getFood: (id) => api.getApi(`/products/${id}`),
    updateFood: (id,payload) => api.updateApi(`/products/${id}`,payload),
    deleteFood: (id) => api.deleteApi(`/products`,id),
    getBestFood: () => api.getApi('/best-products'),
    getSearchFood: (query) => api.getApi(`/products?q=${query}`)
}