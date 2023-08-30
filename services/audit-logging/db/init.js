const cds = require('@sap/cds')
let { Customers } = cds.entities('sap.capire.incidents')

// Fill in some random pseudo credit card numbers to customers
cds.once('served', () => cds.run (async ()=>{
  let customers = await SELECT.from (Customers, c => c.ID)
  await cds.run (customers.map (({ID}) => UPDATE(Customers,ID).set({
    creditCardNo: (''+Math.random()).slice(2,18)
  })))
}))
