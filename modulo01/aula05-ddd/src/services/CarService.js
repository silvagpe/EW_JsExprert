const BaseRepository = require('../repository/base/baseRepository')
const CarCategory = require('../entities/carCategory')
const Tax = require('../entities/tax')
const Transaction = require('../entities/transaction')

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars })
        this.taxesBasedOnAge = Tax.taxesBasedOnAge
        this.currencyFormat = new Intl.NumberFormat('pr-br', {
            style: 'currency',
            currency: 'BRL'
        })

    }

    /**
     * Retorna uma posição randomica do array
     * @param {Array} list 
     */
    getRandomPositionFromArray(list) {
        const listLength = list.length
        return Math.floor(
            Math.random() * listLength
        )
    }

    /**
     * 
     * @param {CarCategory} carCategory 
     */
    chooseRandomCar(carCategory) {

        const randomCarIndex = this.getRandomPositionFromArray(carCategory.cardIds)
        const carId = carCategory.cardIds[randomCarIndex]

        return carId
    }

    /**
     * 
     * @param {CarCategory} carCategory 
     */
    async getAvaliableCar(carCategory) {
        const carId = this.chooseRandomCar(carCategory)
        const car = await this.carRepository.find(carId)

        return car
    }

    calculateFinalPrice(customer, carCategory, numberOfDays) {
        const { age } = customer
        const price = carCategory.price

        const { then: tax } = this.taxesBasedOnAge
            .find(tax => age >= tax.from && age <= tax.to)

        const finalPrice = ((tax * price) * numberOfDays)
        const formattedPrice = this.currencyFormat.format(finalPrice);
        
        return formattedPrice
    }

    async rent(customer, carCategorty, numberOfDays){

        const car = await this.getAvaliableCar(carCategorty);
        const finalPrice = await this.calculateFinalPrice(customer, carCategorty, numberOfDays)

        const today = new Date()
        today.setDate(today.getDate() + numberOfDays)

        const options = {year: "numeric", month: "long", day:"numeric"}
        const dueDate = today.toLocaleDateString("pt-br", options)

        const transaction = new Transaction({
            customer,
            dueDate,
            car,
            amount: finalPrice
        })

        return transaction
    }


}
module.exports = CarService