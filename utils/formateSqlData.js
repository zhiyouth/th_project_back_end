module.exports = {
    formateSqlData (sqlData) {
        return JSON.parse(JSON.stringify(sqlData));
    }
}