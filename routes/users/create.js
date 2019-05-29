const User = require('../../models/user.model');

module.exports = (req, res) => {
 const user = new User(req.body);
 user.save()
   .then(user => {
     res.json(
      {
        status : "success",
        data : {
          "user" : user
        }
      })
    })
   .catch(err => {
     res.status(400).send("unable to save to database");
   });
}