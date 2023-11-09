const BaseRepository = require('../repository/base/baseRepository')
const CarCategory = require('../entities/carCategory')

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars })
    }

    /**
     * Retorna uma posição randomica do array
     * @param {Array} list 
     */
    getRandomPositionFromArray(list){
        const listLength = list.length
        return Math.floor(
            Math.random() * listLength
        )
    }

    /**
     * 
     * @param {CarCategory} carCategory 
     */
    chooseRandomCar(carCategory){
        
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.cardIds)
        const carId = carCategory.cardIds[randomCarIndex]

        return carId
    }

    /**
     * 
     * @param {CarCategory} carCategory 
     */
    async getAvaliableCar(carCategory){
        const carId = this.chooseRandomCar(carCategory)
        const car = await this.carRepository.find(carId)
        
        return car
    }


}
module.exports = CarService