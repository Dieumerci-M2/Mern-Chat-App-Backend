import User  from '../Model/UserModel.js'
import serverTest from '../app.js'
import request from ( 'supertest' )

let server;

describe( 'user', () => {
    beforeEach( () => {
        server = serverTest
    } )
    afterEach( () => {
        server.close()
        User.collection.deleteMany()
    } )
    it( 'it should return status 404 when Joi validation kicks', async () => {
        const response = await request( server )
            .post( '/api/user/' )
            .send( {} )
            .set({Accepte : 'Application/json'})
    })
})