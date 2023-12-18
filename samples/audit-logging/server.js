const cds = require('@sap/cds')

cds.on('served', services => {
  // add custom handlers here
})

module.exports = cds.server
