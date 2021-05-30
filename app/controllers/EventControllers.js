const Events = require('../models/Events');
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
        res.status(500).send('Not ok').json({msg:"somting went worng, please try again later"})
    })
}
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
module.exports.update = (req, res) => {}
module.exports.delete = (req, res) => {}