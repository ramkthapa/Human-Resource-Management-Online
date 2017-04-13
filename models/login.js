/**
 * Created by Shrestha on 12/9/13.
 */

module.exports = function(db) {

    //return "aaa";

    Users = db.define('person', {
        id: String,
        Name: String,
        password: String,
        access:Number
       // email: { type: String, index: true },
       // first_name: String,
       // last_name: String
    });

    return Users;

}

