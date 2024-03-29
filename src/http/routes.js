const db = require('../services/mysql')

const routes = (server) => {
    server.post('/autenticacao', async (req, res, next) => {
        const { email, password } = req.params
        try {
            res.send(await db.auth().authenticate(email, password))
        } catch (error) {
            res.send(error)
        }
        next()
    })
    server.get('/categoria', async (req, res, next) => {
        try {
            // const categories = await db.categories().all()
            // const user = req.decoded
            // res.send({ categories, user })
            res.send(await db.categories().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })
    server.post('/categoria', async (req, res, next) => {
        const { name } = req.params
        try {
            res.send(await db.categories().save(name))
        } catch (error) {
            res.send(error)
        }
        next()
    })
    server.put('/categoria', async (req, res, next) => {
        const { id, name } = req.params
        try {
            res.send(await db.categories().update(id, name))
        } catch (error) {
            res.send(error)
        }
        next()
    })
    server.del('/categoria', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.categories().del(id))
        } catch (error) {
            res.send(error)
        }
        next()
    })
}


module.exports = routes