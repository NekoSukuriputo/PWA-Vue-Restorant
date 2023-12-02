import api from '../../common/api'

export default {
    getCart: () => api.getApi('/keranjangs'),
    addToCart: (payload) => api.postApi('/keranjangs',payload),
    updateCart: (id,payload) => api.updateApi(`/keranjangs/${id}`,payload),
    deleteCart: (id) => api.deleteApi('/keranjangs',id), 
}