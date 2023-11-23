import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
import Person from './../src/person.js'


describe('Person', () =>{
    it('should return a person instance from a string', ()=>{
        const person = Person.generateInstanceFromString('1 Bike,Car 20000 2023-12-01 2023-12-31')

        const expect = {
            from: '2023-12-01',
            to: '2023-12-31',
            vehicles:['Bike', 'Car'],
            kmTraveled: "20000",
            id: "1"
        }

        chai.expect(person).to.be.deep.equal(expect)
    })

    it('should format value', ()=>{

        const person = new Person({
            from: '2023-12-01',
            to: '2023-12-31',
            vehicles:['Bike', 'Car'],
            kmTraveled: "20000",
            id: "1"
        })
        const result = person.formatted();        
        const expect = {
            id: 1,
            vehicles: 'Bike and Car',
            kmTraveled: '20,000 km',
            from: 'December 01, 2023',
            to: '12/31/2023'
          }

          chai.expect(result).to.be.deep.equal(expect)
    })
})

