const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf',
        ]);

        res.header('X-Total-Count', count['count(*)']);
    
        return res.json(incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        const { authorization: ong_id } = req.headers;

        const [ id ] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({id: id});
    },

    async delete(req, res) {
        const { id } = req.params;
        const { authorization: ong_id } = req.headers;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first(); // retorna apenas um resultado

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operação não permitida' });
        }

        await connection('incidents')
        .where('id', id)
        .delete();

        res.status(204).send();
    }
}