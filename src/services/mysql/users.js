const sha1 = require('sha1')

const users = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('SELECT id,email FROM users', (error, results) => {
                    if (error) {
                        errorHandler(error, "Falha ao listar os usuarios", reject)
                        return false
                    }
                    resolve({ users: results })
                })
            })
        },
        save: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('INSERT INTO users (email, password) VALUES(?,?)', [email, sha1(password)], (error, results) => {
                    ("results", results)
                    if (error) {
                        errorHandler(error, `Falha ao salvar o usuario ${email}`, reject)
                        return false
                    }
                    resolve({ user: { email, id: results.insertId } })
                })
            })
        },
        update: (id, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('UPDATE users SET password = ? WHERE id = ?', [sha1(password), id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao atualizar o password do usuario de id ${id}`, reject)
                        return false
                    }
                    resolve({ user: { id }, affectedRows: results.affectedRows })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao remover o usuario de id ${id}`, reject)
                        return false
                    }
                    resolve({ user: 'Usuario excluido com sucesso!', affectedRows: results.affectedRows })
                })
            })
        }
    }
}

module.exports = users

