import api from '../../common/api'

export default {
    getAllOrder : () => api.getApi('/pesanans'),
    getOrder: (id) => api.getApi(`/pesanans/${id}`),
    addOrder: (payload) => api.postApi('/pesanans',payload),
    updateOrder: (id,payload) => api.updateApi(`/pesanans/${id}`,payload),
    deleteOrder: (slug) => api.deleteApi('/pesanans',slug)
}