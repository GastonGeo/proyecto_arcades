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

async function insertNovedad(obj) {
    try {
        const query = "insert into listado set ?";
        const rows = await pool.query(query, [obj])
        return rows; 

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getNovedadById(id) {
    const query = "select * from listado where id=? ";
    const rows = await pool.query(query,[id]);
    return rows[0];
}

async function modificarNovedadById(obj, id) {
    try {
        const query = "update listado set ? where id=? ";
        const rows = await pool.query(query,[obj, id]);
    return rows;
    } catch (error) {
        throw error;
    }
    
}

async function buscarNovedades(busqueda) {
    var query = "select * from listado where titulo like ? OR subtitulo like ? OR cuerpo like ? ";
    var rows = await pool.query(query,['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}





module.exports = { getListado, deleteNovedadById, insertNovedad, getNovedadById, modificarNovedadById, buscarNovedades }