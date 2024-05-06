import Product from "../entities/product.js"

export default class Cart {
    constructor({ products }) {        
        this.products = this.removeUndefinedProps(products)
        
    }

    removeUndefinedProps(products) {
        const result = []

        for(const product of products){
            const keys = Reflect.ownKeys(product)
            if (!keys.length) continue;
            
            //1
            keys.forEach(key => product[key] || Reflect.deleteProperty(product, key))
            result.push(product)
            
            //2
            // let newObject = {}
            // keys.forEach(key => {
            //     if (!keys[key]) return;
            //     newObject[key] = keys[key]
            // })
            // result.push(product)
        }
                
        return result;
    }
}