const Institution = require('../../models/institution.model');

module.exports = (req, res) => {
 const institution = new Institution(req.body);
 institution.save()
   .then(institution => {
     res.json(
      {
        status : "success",
        data : {
          "institution" : institution
        }
      })
    })
   .catch(err => {
     res.status(400).send("unable to save to database");
   });
}