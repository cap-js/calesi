/**
 * Here we adds handlers to the incidents app's ProcessorService
 * programatically send alert notifications.
 */
module.exports = class ProcessorService extends cds.ApplicationService {
  async init() {

    const { Incidents } = this.entities

    this.on("confirmIncident", async(req) => {
      //Close Incident
      const srv = await cds.connect.to('ProcessorService')
      const { Incidents } = srv.entities
      for (let i=0; i<req.params.length; i++) {
          const id = req.params[i].ID
          await UPDATE(Incidents, id).with({ status_code: 'C' })
      } 
    })
    //Emit event on status changes
    this.prepend(() => {
      this.on('SAVE', Incidents, async (req, next) => {
        const title = req.data.title
        const diff = await req.diff()
        if (diff.status_code && diff._old?.status_code) {
            const newStatus = diff.status_code
            const oldStatus = diff._old.status_code
            if (newStatus!==oldStatus) {
              console.log('-----> Emitting Event statusChange:', 'statusChange', { title, oldStatus, newStatus })
              await this.emit('statusChange', { title, oldStatus, newStatus })
            }
        }
        return next();
      })
    })

    //Receive status change event
    this.on('statusChange', (msg) => {
        const { title, oldStatus, newStatus } = msg.data
        console.log('-----> Receiving Event statusChange: Incident=' + title + ' / oldStatus=' + oldStatus + ' / newStatus=' + newStatus);
    })   
  }
}