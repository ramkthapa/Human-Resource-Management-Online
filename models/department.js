/**
 * Created by Shrestha on 1/12/14.
 */
module.exports = function(db) {
    var Users = db.define('department', {
        id: Number,
        departmentName:String
    });
    return Users;
}