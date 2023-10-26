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
      await alert.notify({
        recipients: ["alice@wonderland.org"], priority: "HIGH",
        title: `New incident created by ${customer}`,
        description: incident.title
      })
    })

    /**
     * Send a notification using a pre-defined template when an incident is resolved.
     */
    this.after ('UPDATE', Incidents, async (incident, req) => {
      if (incident.status_code === 'C') {
        await alert.notify({
          recipients: [ "alice@wonderland.org" ],
          type: 'IncidentResolved',
          data: {
            customer: await customer4 (incident),
            title: incident.title,
            user: req.user.id,
          }
        })
        // // Alternatively doing the same using the low-level API like that:
        // 0 && await alert.notify({
        //   // REVISIT: Please let's rather use the simple API for that as well.
        //   // Otherwise we create the misconception that you always have to use
        //   // this API when using templates.
        //   Recipients: [{ RecipientId: "alice@wonderland.org" }],
        //   Priority: 'NEUTRAL',
        //   NotificationTypeKey: 'IncidentResolved',
        //   NotificationTypeVersion: '1',
        //   Properties: [
        //     {
        //       Key: 'title',
        //       IsSensitive: false,
        //       Language: 'en',
        //       Value: incident.title,
        //       Type: 'String'
        //     },
        //     {
        //       Key: 'customer',
        //       IsSensitive: false,
        //       Language: 'en',
        //       Value: customer,
        //       Type: 'String'
        //     },
        //     {
        //       Key: 'user',
        //       IsSensitive: false,
        //       Language: 'en',
        //       Value: req.user.id,
        //       Type: 'String'
        //     }
        //   ],
        // })
      }
    })


    const { Customers } = cds.entities
    const customer4 = async incident => {
      let customer = await SELECT.from (Customers, incident.customer_ID, c => {
        c.firstName, c.lastName, c.email
      })
      return `${customer.firstName} ${customer.lastName} (${customer.email})`
    }

    // return super.init()
  }
}