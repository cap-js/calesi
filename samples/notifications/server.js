const cds = require("@sap/cds");
let status = {
  N: "New",
  A: "Assigned",
  I: "In Process",
  H: "On Hold",
  R: "Resolved",
  C: "Closed",
};

let urgency = {
  H: "high",
  M: "medium",
  L: "low",
};

let alert;

cds.once("served", (services) => {
  const recipients = ["sidakdeep.singh@sap.com"];

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
        alert.notify(recipients, "HIGH", "Incident Created");

        /*
          This will send a notification of default notification type with both title and description.
        */
        // alert.notify(recipients, "HIGH", "Incident Created", `New Incident Created by: ${customerDetails}`);


        /*
          To create a notification of your own notification type, just pass the complete notification object to alert.notify() function.
        */

        const notificaiton = {
          NotificationTypeKey: 'NewIncidentReported',
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
              Key: 'customer_name',
              IsSensitive: false,
              Language: 'en',
              Value: customerDetails,
              Type: 'String'
            },
            {
              Key: 'count_total',
              IsSensitive: false,
              Language: 'en',
              Value: "1",
              Type: 'String'
            },
            {
              Key: 'status',
              IsSensitive: false,
              Language: 'en',
              Value: status[entry.status_code],
              Type: 'String'
            },
            {
              Key: 'urgency',
              IsSensitive: false,
              Language: 'en',
              Value: urgency[entry.urgency_code],
              Type: 'String'
            }
          ],
          Recipients: recipients.map((recipient) => ({ RecipientId: recipient }))
        }

        // alert.notify(notificaiton);
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
