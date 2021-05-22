const ShowTime = require('../../models/ShowTime/ShowTime');

ShowTime.getByID = async function(id) {
    return ShowTime.findByPk(id);
}

ShowTime.getAll = async function() {
    return ShowTime.findAll();
}

ShowTime.add = async function(new_showTime) {
    const newShowTime = await ShowTime.create({
            startTime: new_showTime.email,
            endTime: new_showTime.password,
            price: new_showTime.displayName,
        });
    await newShowTime.save();
    return newShowTime;
}

ShowTime.delete = async function(showTime_id_delete) {
    await ShowTime.destroy({
        where: {uuid: showTime_id_delete}
    })
}

// ShowTime.update = async function(uuid_to_update, startTime_update, endTime_update, price_update) {
//     await ShowTime.update({
//             startTime: startTime_update, 
//             endTime: endTime_update, 
//             price: price_update},
//         {
//             where: {uuid: uuid_to_update}
//     });
// };

module.exports = ShowTime;