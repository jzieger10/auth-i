
exports.up = function(knex, Promise) {
    return knex.schema.table("users", tbl => {
		tbl.boolean("admin").notNullable().defaultTo(false);
	});
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', tbl => {
        tbl.dropColumn("role");
    })
};
