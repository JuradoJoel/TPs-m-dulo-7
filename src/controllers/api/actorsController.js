const db = require('../../database/models')

const throwError = (res, error) => {
    console.log(error);
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
            let actors = await db.Actor.findAll();

            let response = {
                meta: {
                    status: 200,
                    total: actors.length,
                    url: 'api/actors'
                },
                data: actors
            }

            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error);
        }
    },
    detail: async (req, res) => {
        try {
            if (isNaN(req.params.id)) {
                let error = new Error('Id incorrecto')
                error.status = 422;
                throw error
            }

            let actor = await db.Actor.findByPk(req.params.id);

            if (!actor) {
                let error = new Error('ID inexistente')
                error.status = 404;

                throw error;
            }

            let response = {
                meta: {
                    status: 200,
                    url: 'api/actors/' + req.params.id
                },
                data: actor
            }
            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error);
        }
    }
}