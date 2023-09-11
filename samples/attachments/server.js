const cds = require('@sap/cds')

cds.on('served', async () => {
    // Upload avatar images into store
    //const { ObjectStoreService } = cds.services
    //await ObjectStoreService.uploadBulk()

    // Add url to show customer avatars in table
    registerHandler(readHandler)
    async function readHandler(req, next) {
        const data = await next()
        const origin = req.http.req.headers.origin
        const ref = getEntityRef() //req.target.projection.from.ref[0];

        if (data.length && ref) {
            data.map((d, i) => {
                if (d && d.customer && ref) {
                    const file = `${ref}-${d.customer.ID}.png`
                    Object.assign(d.customer, {
                        avatar: `${origin}/media/?file=${file}`
                    })
                }
            })
        }
        return data
    }
})

function registerHandler(readHandler) {
    Object.values(cds.services)
        .forEach(s => {
            Object.values(s.entities).forEach(e => {
                const elements = e.elements;
                Object.entries(elements).forEach(([k, v]) => {
                    if (v['@Core.IsURL'] && !s.kind) {
                        console.log(`> Registering on READ handler @${e.name}.${k}`)
                        s.prepend(() => s.on('READ', readHandler))
                    }
                })
            })
        })
}

function getEntityRef() {
    let ref = []
    Object.values(cds.entities).filter(e => e.compositions).forEach(c => {
        const elements = c.elements;
        Object.entries(elements).forEach(([k, v]) => {
            if (v['@Core.IsURL'] && !c.projection) {
                ref.push(`${c.name}`)
            }
        })
    })
    return ref[0]
}
