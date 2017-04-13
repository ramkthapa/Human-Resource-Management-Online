/**
 * Created by Shrestha on 12/29/13.
 */

module.exports = function(db) {
    var Users = db.define('notice', {
        title: String,
        type: Number,
        notice: String,
        date: String
        // email: { type: String, index: true },
    });
    return Users;
}