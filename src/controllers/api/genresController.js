const db = require('../../database/models');

const throwError = (res, error) => {
    console.log(error)
    return res.status(error.status).json({
        meta: {
            status: error.status || 500
        },
        data: error.message
    })
}

module.exports = {
    list: async (req, res) => {
        try {
            let genres = await db.Genre.findAll();

            let response = {
                meta: {
                    status: 200,
                    total: genres.length,
                    link: 'api/genres'
                },
                data: genres
            }
            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error)
        }
    },
    detail: async (req, res) => {
        try {
            if (isNaN(req.params.id)) {
                let error = new Error('Id incorrecto')
                error.status = 422;
                throw error
            }

            let genre = await db.Genre.findByPk(req, params.id)
            if (!genre) {
                let error = new Error('ID inexistente')
                error.status = 404;
                throw error;
            }
            let response = {
                meta: {
                    status: 200,
                    link: 'api/genres/' + req.params.id
                },
                data: genre
            }
            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error)
        }
    }
}