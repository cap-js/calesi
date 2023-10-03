const cds = require("@sap/cds");

let recipients = ["abc@abc.com"]

let alert;

cds.once("served", (services) => {

  let publishNewIncidentAlert = async (data) => {
    alert = alert || await cds.connect.to('notifications');
    const query = data.req ? data.req.query : data.query;
    if (query.INSERT && query.INSERT.entries.length > 0) {
      for (const entry of query.INSERT.entries) {
        var customer = await SELECT.one.from`sap.capire.incidents.Customers`
          .columns`firstName, lastName, email`.where({ ID: entry.customer_ID });

        const customerDetails = `${customer.firstName} ${customer.lastName} (${customer.email})`;
        
        /*
          This will send a notification of default notification type with just title. This notification type is created by cap-js/alert-notification plugin.
        */
        alert.notify(recipients, "HIGH", `New incident created by ${customerDetails}`);

        setTimeout(async () => {
          /*
            This will send a notification of default notification type with both title and description.
          */
          alert.notify(recipients, "HIGH", "Incident Assigned", `Incident ${entry.title} assigned to Jarvis.`);

          /*
            To create a notification of your own notification type, just pass the complete notification object to alert.notify() function.
          */
          const notificaiton = {
            NotificationTypeKey: 'IncidentResolved',
            NotificationTypeVersion: '1',
            Priority: 'NEUTRAL',
            Properties: [
              {
                Key: 'name',
                IsSensitive: false,
                Language: 'en',
                Value: entry.title,
                Type: 'String'
              },
              {
                Key: 'customer',
                IsSensitive: false,
                Language: 'en',
                Value: customerDetails,
                Type: 'String'
              }
            ],
            Recipients: recipients.map((recipient) => ({ RecipientId: recipient }))
          }

          await UPDATE `sap.capire.incidents.Incidents`.set `status.code = 'C'`.where `ID=${entry.ID}`;
          setTimeout(() => {
            alert.notify(notificaiton);
          }, 1000 * 15);
        }, 1000 * 5);
      }
    }
  };

  for (const service of services) {
    if (!(service instanceof cds.ApplicationService)) continue;

    for (const entity of service.entities) {
      if (entity.name === "ProcessorsService.Incidents") {
        cds.db.after("CREATE", entity, publishNewIncidentAlert);
      }
    }
  }
});
