# Sample Application with Notification plugin

Sample app based on incident management [`@capire/incidents`](https://github.com/cap-js/incidents-app) for demoing the usage of notification plugin [`@cap-js/notifications`](https://www.npmjs.com/package/@cap-js/notifications)

You can simulate publishing the notifications by:

1. Running the extended incidents-app with `cds w samples/notifications`
2. On creating a new incident, you can see the corresponding notification logged in the console.
3. On setting the status of the incident created in previous step to `Closed`, notification with `Incident resolved` is logged in the console as well!
