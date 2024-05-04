const pg = require('../config/db')


exports.getOrCreate = (zone_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dateOfShipment = new Date()
            dateOfShipment.setDate(dateOfShipment.getDate() + 1);
            console.log(new Intl.DateTimeFormat(['ban', 'id']).format(dateOfShipment))
            const paid = await pg.query('INSERT INTO shipment (shipment_date, zone_id) VALUES ($1, $2)  ON CONFLICT (shipment_date, zone_id) DO UPDATE SET shipment_date = $1, zone_id = $2 RETURNING *;',
                [new Intl.DateTimeFormat(['ban', 'id']).format(dateOfShipment), zone_id])
            console.log(paid.rows)
            resolve(paid.rows[0]);
        } catch (err) {
            console.log(err.message)
            reject(err)
        }

    })
}