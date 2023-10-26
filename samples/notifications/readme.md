# notification-sample

Sample app based on incident management [`@capire/incidents`](https://github.com/cap-js/incidents-app) for demoing the usage of notification plugin [`@cap-js/notifications`](https://www.npmjs.com/package/@cap-js/notifications)

## About

The `@cap-js/notifications` plugin allows you to send notifications to applications deployed on SAP BTP Platform using [SAP Alert Notification Service](https://help.sap.com/docs/alert-notification?locale=en-US).

## Demo

We demonstrate its use by **extending** the [reference app](https://github.com/cap-js/incidents-app) and sending a notification when an incident is created using `@cap-js/notifications` plugin.

### Local Testing

1. Execute the following command: `npm i --prefix samples/notifications`

2. Change directory to `samples/notifications` folder.

3. Execute the following command to add `notifications` configuration: `cds add notifications`

4. The above command creates a file `notificationtypes.json` in the root directory of the project. This file will contain the notification types which we want to use in our application. In our demo we will create a notification whenever a new incident is created. Paste the following code in the `notificationtypes.json` file to add the Notification Type.

    ```json
    [
      {
        "NotificationTypeKey": "IncidentResolved",
        "NotificationTypeVersion": "1",
        "Templates": [
          {
            "Language": "en",
            "TemplatePublic": "Incident Resolved",
            "TemplateSensitive": "Incident '{{name}}' Resolved",
            "TemplateGrouped": "Incident Status Update",
            "TemplateLanguage": "mustache",
            "Subtitle": "Incident '{{name}}' from '{{customer}}' resolved by Jarvis."
          }
        ]
      }
    ]
    ```

5. Open server.js and update `recipients` array on Line #3 with your email.

6. In `server.js` we are sending notifications using three different ways:

    - Example to send a notification of `default notification type with title only`. The default notification type is created by the `cap-js/notifications` plugin.
      ```js
      alert.notify({
        recipients: ["admin1@test.com","admin2@test.com"],
        priority: "HIGH",
        title: "New incident is reported!"
      });
      ```
    - Example to send a notification of `default notification type with both title and description`.
      ```js
      alert.notify({
        recipients: ["supportuser1@test.com"],
        priority: "HIGH",
        title: "New high priority incident is assigned to you!",
        description: "Incident titled 'Engine overheating' created by 'customer X' with priority high is assigned to you!"
      });
      ```
    - Example to create a notification of your custom notification type, just pass the complete notification object to this function.
      ```js
      alert.notify({
        NotificationTypeKey: 'IncidentCreated',
        NotificationTypeVersion: '1',
        Priority: 'NEUTRAL',
        Properties: [
          {
            Key: 'name',
            IsSensitive: false,
            Language: 'en',
            Value: 'Engine overheating',
            Type: 'String'
          },
          {
            Key: 'customer',
            IsSensitive: false,
            Language: 'en',
            Value: 'John',
            Type: 'String'
          }
        ],
        Recipients: ["admin1@test.com","admin2@test.com"]
      });
      ```

In our demo, we are using the first method to send a notification when an incident is created. We use the second method to send a notification to inform that the incident is assigned to a processor. The third method is used to send a notification when the incident is closed by the processor.

7. To test in local:

    - Start in local: `cds watch`
    - Go to `http://localhost:4004/incidents/`
    - Create a new incident and check for notification in the console logs.

### Deployment

#### Prerequisite

1. BTP Subaccount with the following entitlements: 
    - SAP HANA Cloud (tools and hana plan)
    - SAP HANA Schemas & HDI Containers (hdi-shared)
    - SAP Build Work Zone, standard edition (standard)
    - Destination Service (lite)
    - HTML5 Application Repository Service (app-host)
    - Authorization and Trust Management Service (application)

2. [Enable Notifications for Custom Apps on SAP BTP Cloud Foundry](https://help.sap.com/docs/build-work-zone-standard-edition/sap-build-work-zone-standard-edition/enabling-notifications-for-custom-apps-on-sap-btp-cloud-foundry?locale=en-US)

#### Deploy to Cloud Foundry

1. Make the following changes in the file `incidents-app/app/incidents/webapp/manifest.json`:

    ```diff
    {
      "_version": "1.49.0",
      "sap.app": {
          ...
          "dataSources": {
              "mainService": {
    -              "uri": "/odata/v4/processors/",
    +              "uri": "odata/v4/processors/",
                  "type": "OData",
                  "settings": {
    -                 "localUri": "localService/metadata.xml",
                      "odataVersion": "4.0"
                  }
              }
          }
      },
      ... 
    +  "sap.cloud": {
    +      "public": true,
    +      "service": "incidents.mgmt"
    +  }
    }
    ```

2. Make the following changes in the file `incidents-app/app/incidents/webapp/xs-app.json`:

    ```diff
    {
    +  "welcomeFile": "/index.html",
      "authenticationMethod": "route",
    -  "logout": {
    -    "logoutEndpoint": "/do/logout"
    -  },
      "routes": [
    +    {
    +      "source": "^/odata/(.*)$",
    +      "target": "/odata/$1",
    +      "destination": "incidents-srv",
    +      "authenticationType": "xsuaa",
    +      "csrfProtection": false
    +    },
        {
          "source": "^(.*)$",
          "target": "$1",
          "service": "html5-apps-repo-rt",
          "authenticationType": "xsuaa"
        }
      ]
    }
    ```

3. Change directory to `samples/notifications` folder.
4. Execute the following command to build the project: `mbt build`.
5. Deploy the project to CF using `cf deploy mta_archives/capire.incidents_1.0.0.mtar`.

#### Test the deployment

1. Go to Role Collections. Create a Role Collection with the name `incident-management`. Add `support` role and your user to the role collection.
1. In your subaccount, go to `Instances and Subscriptions` > Click on `SAP Build Work Zone, standard edition` in `Application` Table.
2. Go to `Channel Manager` and sync `HTML5 Apps`.
3. Go to `Content Manager` and click on `Content Explorer`. Click on HTML5 Apps and add the `Incident-Management` application.
4. In `Content Manager` create a new role, catalog and a group. Add `Incident-Management` HTML5 application to them.
5. Go to Site Directory and click on `Create Site`.
6. Click on `Edit` inside the site you just created and add the role you created in step 4. Also enable `Show Notifications`.
7. Visit the site. Create a new Incident. A new notification should show up.
