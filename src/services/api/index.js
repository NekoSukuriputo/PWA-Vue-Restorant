import foods from './foods'
import cart from './cart'
import order from './order'
import auth from './auth'

export default {
    ...foods,
    ...cart,
    ...order,
    ...auth
}