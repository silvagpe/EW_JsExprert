const { describe, it, before, beforeEach, afterEach } = require('mocha')
const CarService = require('../../src/services/carService')
const Transaction = require('./../../src/entities/transaction')

const { join } = require('path')
const { expect } = require('chai')
const sinon = require('sinon')
const { SinonSandbox } = require('sinon')

const carsDatabase = join(__dirname, './../../database', 'cars.json')

const mocks = {
    validCarCategory: require('./../mocks/valid-carCategory.json'),
    validCar: require('./../mocks/valid-car.json'),
    validCustomer: require('./../mocks/valid-customer.json'),
}

describe('CarService Suit Test', () => {

    /**
     * @type CarService 
     */
    let carService = {}
    /** @type SinonSandbox */
    let sandBox = {}
    before(() => {
        carService = new CarService({ cars: carsDatabase })
    })
    
    beforeEach(() => {
        sandBox = sinon.createSandbox()

    }),

    afterEach(() => {
        sandBox.restore()
    }),
    
    it('should retrieve a random position from an array', () => {
        const data = [0, 1, 2, 3, 4]
        const result = carService.getRandomPositionFromArray(data)

        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    it('should choose the first id from cardIds in carCategory', () => {

        const carCategory = mocks.validCarCategory
        const carIdIndex = 0

        sandBox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIdIndex)

        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.cardIds[carIdIndex]

        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok

        expect(result).to.be.equal(expected)
    })

    it('given a carCategory it should return an avaliable car', async () => {

        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.cardIds = [car.id]

        sandBox
            .stub(
                carService.carRepository,
                carService.carRepository.find.name
            )
            .resolves(car)

        sandBox.spy(
            carService,
            carService.chooseRandomCar.name
        )

        const result = await carService.getAvaliableCar(carCategory)
        const expected = car

        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)
    })

    it('given a carCategory, customer and numberOfDays it should calculate final amount in real', async ()=>{
        const customer = Object.create(mocks.validCustomer)
        customer.age = 50

        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.price = 37.6

        const numberOfDays = 5

        //age: 50  -> 1.3 off (30%) - categoryPrice = 37.6
        // 37.6 * 1.3 = 48.88 * 5 days = 244.40
        sandBox.stub(
            carService,
            "taxesBasedOnAge"
        ).get(() => [{ from: 40, to: 50, then: 1.3 }])

        const expected = carService.currencyFormat.format(244.40)
        const result = carService.calculateFinalPrice(
            customer,
            carCategory,
            numberOfDays
        )

        expect(result).to.be.deep.equal(expected)
    })

    it('given a customer and a car category it should return a transaction invoice', async ()=>{

        const car = mocks.validCar
        const carCategorty = {
            ...mocks.validCarCategory,
            price: 37.6,
            cardIds: [car.id]
        }

        const customer = Object.create(mocks.validCustomer)
        customer.age = 20

        const numberOfDays = 5
        const dueDate = "10 de novembro de 2023"

        const now = new Date(2023, 10, 5)
        //Força volta um valor pré definido
        sandBox.useFakeTimers(now.getTime())

        sandBox
            .stub(
                carService.carRepository,
                carService.carRepository.find.name
            )
            .resolves(car)

        const expectedAmount = carService.currencyFormat.format(206.80)
        const result = await carService.rent(
            customer, carCategorty, numberOfDays
        )

        const expected = new Transaction({
            customer, 
            car,
            dueDate,
            amount: expectedAmount
        })
        
        expect(result).to.be.deep.equal(expected)
    })
})