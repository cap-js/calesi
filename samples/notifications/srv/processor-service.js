/**
 * Here we adds handlers to the incidents app's ProcessorService
 * programatically send alert notifications.
 */
module.exports = class ProcessorService extends cds.ApplicationService {
  async init() {

    const alert = await cds.connect.to('notifications');
    const { Incidents } = this.entities
    const { Customers } = cds.entities

    /**
     * Send an ad-hoc notification when a new incident is created.
     */
    this.after ('CREATE', Incidents, async incident => {
      let customer = await customer4 (incident)
      await alert.notify({
        recipients: ["alice@wonderland.org"], priority: "HIGH",
        title: `New incident created by ${customer.firstName} ${customer.lastName} (${customer.email})`,
        description: incident.title
      })
    })

    /**
     * Send a notification using a pre-defined template when an incident is resolved.
     */
    this.after ('UPDATE', Incidents, async (incident) => {
      if (incident.status_code === 'C') {
        let customer = await customer4 (incident)
        await alert.notify({
          // REVISIT: Please let's rather use the simple API for that as well.
          // Otherwise we create the misconception that you always have to use
          // this API when using templates.
          Recipients: [{ RecipientId: "alice@wonderland.org" }],
          Priority: 'NEUTRAL',
          NotificationTypeKey: 'IncidentResolved',
          NotificationTypeVersion: '1',
          Properties: [
            {
              Key: 'name',
              IsSensitive: false,
              Language: 'en',
              Value: incident.title,
              Type: 'String'
            },
            {
              Key: 'customer',
              IsSensitive: false,
              Language: 'en',
              Value: `${customer.firstName} ${customer.lastName} (${customer.email})`,
              Type: 'String'
            }
          ],
        })
      }
    })


    const customer4 = incident => SELECT.from (Customers, incident.customer_ID, c => {
      c.firstName, c.lastName, c.email
    })

    // return super.init()
  }
}