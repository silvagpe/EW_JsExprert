import Product from "./product.js"
import { randomUUID as uuid } from "crypto"

export default class Cart {
    constructor({ at, products }) {
        this.id = uuid()
        this.at = at
        this.products = this.removeUndefinedProps(products)
        this.total = this.getCartPrice()
    }

    removeUndefinedProps(products) {
        const productsEntities = products
            .filter(product => !!Reflect.ownKeys(product).length)
            .map(product => new Product(product))

        return JSON.parse(JSON.stringify(productsEntities))
    }

    getCartPrice() {
        return this.products
            .map(product => product.price)
            .reduce((prev, current) => prev + current, 0)
    }
}