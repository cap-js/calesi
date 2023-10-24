const path = require('path')
const fs = require('fs')
const cds = require('@sap/cds')

cds.on('served', async() => {

    // Add sample data for Customer avatar images
    await UPSERT.into('ProcessorService.Customers').entries(
        {
            ID: '8fc8231b-f6d7-43d1-a7e1-725c8e988d18',
            avatar_content: fs.readFileSync(path.join(__dirname, 'assets', 'Daniel Watts.png')),
            avatar_type: 'image/png'
        },
        {
            ID: 'feb04eac-f84f-4232-bd4f-80a178f24a17',
            avatar_content: fs.readFileSync(path.join(__dirname, 'assets', 'Stormy Weathers.png')),
            avatar_type: 'image/png'
        },
        {
            ID: '2b87f6ca-28a2-41d6-8c69-ccf16aa6389d',
            avatar_content: fs.readFileSync(path.join(__dirname, 'assets', 'Sunny Sunshine.png')),
            avatar_type: 'image/png'
        }
    )
})
