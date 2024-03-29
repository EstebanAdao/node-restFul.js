const test = require('ava')

const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })

const create = () => users.save('adao1669@hotmail.com', '123456')

// test.beforeEach(t => {
// 	connection.query('TRUNCATE TABLE users')
// })
// test.after.always(t => {
// 	connection.query('TRUNCATE TABLE users')
// })

test('Lista de Usuarios', async t => {
	await create()
	const list = await users.all()
	// t.is(list.users.length, 4)
	t.is(list.users[0].id, 1)
	t.is(list.users[0].email, 'adao1669@hotmail.com')
})


test('Criação de Usuario', async t => {
	const result = await create()
	t.is(result.user.email, 'adao1669@hotmail.com')
})

test('Atualização de Usuarios', async t => {
	await create()
	const update = await users.update(1, '123456789')
	t.is(update.affectedRows, 1)
})

test('Remoção de Usuarios', async t => {
	await create()
	const remove = await users.del(1)
	t.is(remove.affectedRows, 1)
})