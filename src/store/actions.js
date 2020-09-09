import { ADD_COUNT, ADD_TO_CART } from "./mutation_type"

export default {

    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {
                // oldProduct.count++
                context.commit(ADD_COUNT, oldProduct)
            } else {
                //state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)

            }
            resolve('已添加到购物车')
        })
    },
    deleteAllItem(context) {
        context.state.cartList = [];
    },
    deleteOne(context, productIid) {
        context.state.cartList = context.state.cartList.filter(item => item.iid != productIid)
    }

}