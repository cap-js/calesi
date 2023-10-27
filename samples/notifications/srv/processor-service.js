/**
 * Here we adds handlers to the incidents app's ProcessorService
 * programatically send alert notifications.
 */
module.exports = class ProcessorService extends cds.ApplicationService {
  async init() {

    const alert = await cds.connect.to('notifications')
    const { Incidents } = this.entities

    /**
     * Send an ad-hoc notification when a new incident is created.
     */
    this.after ('CREATE', Incidents, async incident => {
      let customer = await customer4 (incident)
      await alert.notify ({
        recipients: supporters(),
        title: `New incident created by ${customer.info}`,
        description: incident.title,
        priority: incident.urgency === 'H' ? "HIGH" : incident.urgency === 'L' ? "LOW" : "NEUTRAL",
      })
    })

    /**
     * Send a notification using a pre-defined template when an incident is resolved.
     */
    this.after ('UPDATE', Incidents, async (incident, req) => {
      if (incident.status_code === 'C') {
        let customer = await customer4 (incident)
        await alert.notify ('IncidentResolved', {
          recipients: [ customer.id ],
          data: {
            customer: customer.info,
            title: incident.title,
            user: req.user.id,
          }
        })
      }
    })


    const { Customers } = cds.entities
    const customer4 = async incident => {
      let customer = await SELECT.from (Customers, incident.customer_ID, c => {
        c.firstName, c.lastName, c.email
      })
      customer.info = `${customer.firstName} ${customer.lastName} (${customer.email})`
      customer.id = cds.context.user.id // for demo purposes only
      return customer
    }

    const supporters = () => [ cds.context.user.id ] // for demo purposes only

    // return super.init()
  }
}