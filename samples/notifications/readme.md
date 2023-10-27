# Sample Application with Notification plugin

Sample app based on incident management [`@capire/incidents`](https://github.com/cap-js/incidents-app) for demoing the usage of notification plugin [`@cap-js/notifications`](https://www.npmjs.com/package/@cap-js/notifications)

## Content

It contains:

1. Addition of the plugin package as an npm dependency in `package.json`:

   ```json
   "dependencies": {
      "@capire/incidents": "*",
      "@cap-js/notifications": "*", // <-- added by npm add
      "@sap/cds": "*",
      "express": "^4"
   },
   ```

2. Samples for sending notifications from your CAP service's event handlers in `srv/processor-service.js`, for example:

   ```js
   await alert.notify ('IncidentResolved', {
      recipients: [ customer.id ],
      data: {
         customer: customer.info,
         title: incident.title,
         user: cds.context.user.id,
      }
   })
   ```

3. Examplary Notification Type Definitions in `srv/notification-types.json`

## Test-drive Locally

The sample is ready to run locally, using the usual `cds watch` command as follows:

1. Run the enhanced incidents-app:
   ```sh
   cds w samples/notifications
   ```
2. Open http://localhost:4004 in your browser, and ...

3. Create a new incident (don't forget to Save)

> → see corresponding notification logged in the console.

4. Edit the incident setting status to `Closed`

> → see notification with `Incident resolved` logged in the console as well!
