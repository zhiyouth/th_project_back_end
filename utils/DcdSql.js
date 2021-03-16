const config = require('../controllers/defaultConfig');
var mysql = require('mysql');
const formatSqlData = require('./formateSqlData').formateSqlData;
const prefix = config.database.PREFIX
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

class DcdSql {
    add(options) {
        const {} = options;
    }
    delete() {

    }
    set(options) {
        const {} = options;
    }
    async get({
        str = '',
        chartName = '',
        values,
    }) {
        if (!chartName) {
            throw Error('查询表的名字不能为空, chartName cannot be empty');
        }
        if (!str) {
            throw Error('查询内容不得为空, str cannot be empty');
        }
        const sql = 'select ' + str + ' from ' + prefix + chartName + ';'
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
        
                        if (err) {
                            console.log('err err', err);
                            reject(err)
                        } else {
                            console.log('success success', rows);
                            const result = formatSqlData(rows);
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    }
}
module.exports = DcdSql;