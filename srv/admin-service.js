// Requiring the module
const reader = require('xlsx')

module.exports = (srv) => {

    srv.after('READ', 'EMPLOYEE', async (req) => {
        // Reading our text file
        const file = reader.readFile('./text.xlsx')

        let data = []

        const sheets = file.SheetNames

        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])

            temp.forEach((res) => {
                data.push(res)
            })

        }

        const insertQuery = INSERT.into('EMPLOYEE').entries(data);

        let srv2 = await cds.connect.to('ZMM_EMP_DEMO_SRV');
        //console.log('SRV2: ', srv2);
        //const insertResult = await srv2.run(insertQuery);
        //console.log('inRes: ', insertResult);
        //let query = SELECT.from(entity);
        //console.log('Query', query);
        //await srv2.run(query);
        //return insertResult;

        /*if (dat) {
            const responseCall = await CallEntity(entity, data);
            if (responseCall == -1)
                reject(req.error(400, JSON.stringify(data)));
            else {
                resolve(req.notify({
                    message: 'Upload Successful',
                    status: 200
                }));
            }
        }*/

        // Printing data
        console.log(data)

        //const tx = cds.transaction(req);
        //console.log(tx);
    })
};

async function CallEntity(entity, data) {
    if (entity === Students) {
        //If any custom handling required for a particular entity
    }

    const insertQuery = INSERT.into(entity).entries(data);

    let srv = await cds.connect.to('EMPLOYEE');
    const insertResult = await srv.run(insertQuery);
    let query = SELECT.from(entity);
    await srv.run(query);
    return insertResult;

}
