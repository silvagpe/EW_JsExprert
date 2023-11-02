const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

describe('API Suite test', ()=>{
    let app
    
    before((done) =>{
        app = require('./api')
        app.once('listening', done)
    })

    after((done) => app.close(done))

    describe('/contact:get', ()=>{
        it('should request the contact route and returno HTTP status 200', async () =>{
            
            const response = await supertest(app)
                .get('/contact')
                .expect(200)
            assert.strictEqual(response.text,'contact us page')
        })

    })

    describe('/login:post', ()=>{

        it('should request the login page and return HTTP status 200', async () =>{

            const response = await supertest(app)
                .post('/login')
                .send({username:'rafaeldasilva', password:'123'})
                .expect(200)

            assert.strictEqual(response.text, 'Log in succeeded!')
        })

        it('should request the login page with invalid password and return HTTP status 401', async () =>{

            const response = await supertest(app)
                .post('/login')
                .send({username:'rafaeldasilva', password:'23'})
                .expect(401)

            assert.strictEqual(response.text, 'Log in failed!')
        })
    })

    describe('/hi:get - Not Found', ()=>{
        it('should request for an unexist page and return HTTP status 404', async () =>{
            const response = await supertest(app)
                .get('/hi')
                .expect(404)

            assert.strictEqual(response.text, 'not found!');
        })
    })

})