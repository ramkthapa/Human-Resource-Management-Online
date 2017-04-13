/**
 * Created by RAM on 1/2/14.
 */

module.exports = function(db) {
    var Users = db.define('empLeave', {
        id: Number,
        empid:String,
        leaveType: String,
        leaveStart: String,
        leaveEnd: String,
        description: String,
        status:Number,
        read: Number
        // email: { type: String, index: true },
    });
    return Users;
}