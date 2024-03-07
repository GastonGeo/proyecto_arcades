const pool = require('./bd');

async function getListado() {
    const query = "select * from listado";
    const rows = await pool.query(query);
    return rows;
}

async function deleteNovedadById(id) {
    const query = "delete from listado where id = ? ";
    const rows = await pool.query(query, [id]);
    return rows;
}

module.exports = { getListado, deleteNovedadById }