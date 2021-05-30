const Events = require('../models/Events');
//create Event
module.exports.create = (req, res) => {
    const params={
        Event_name:req.body.Event_name,
        Event_studentcoordinator:req.body.Event_studentcoordinator,
        Event_description:req.body.Event_description,
        Event_date:req.body.Event_date,
        Event_poster:req.body.Event_poster
    }
    const event = new Events(params)
    event.save().then((response) => {
        res.status(200).send('ok').json({msg:`${req.body.Event_name}. event has been successfully added`})
    })
    .catch(err=>{
        res.status(500).send('Not ok').json({msg:"something went worng, please try again later"})
    })
}
//Display Event
module.exports.read = (req, res) => {
    const Event_name = req.body.Event_name;
        User.findOne({"Event_name":Event_name})
        .then(e=>{
            res.status(200).json(e);
        })
        .catch(err=>{
            res.status(500).json({msg:"somting went worng, please try again later"})
        })
}
//update Event
module.exports.update = (req, res) => {

}
//Delete Event
module.exports.delete = (req, res) => {
  const Event_name = req.params.Event_name;
  Events.findByIdAndDelete(Event_name)
    .then(result => {
      res.status(200).send('ok').json({msg:`${req.body.Event_name}. event has been successfully Deleted`})
      res.json({ redirect: '/Events' });
    })
    .catch(err => {
      console.log(err);
    });
}