function generateRandomId() {
  return Math.ceil(Math.random() * 1000000);
}

var users = {};

var sitesByUserId = {};

module.exports = {

  createUser: function(email, password, done) {
    var userId = generateRandomId();

    var user = {
      id: userId,
      email: email,
      password: password
    };

    users[userId] = user;
    done(user);
  },

  validateLogin: function(email, password, success, failure) {
    for (var key in users) {
      var user = users[key];
      if (user.email === email && user.password === password) {
        success(user);
      }
      else {
        failure();
      }
    }
  },

  getUserById: function(id, done) {
    done(users[id]);
  },


}
