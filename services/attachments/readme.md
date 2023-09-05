# attachments-sample

Sample app based on incident management (`@capire/incidents`) for developing `@cap-js/attachments`

## About

The `@cap-js/attachments` plugin provides a new annotation for elements of type `Image`. When used in a CDS model, the data for this field is streamed from the [SAP BTP Object Store](https://discovery-center.cloud.sap/serviceCatalog/object-store?region=all).

```cds
using { Image } from '@cap-js/attachments';

entity Customers {
  avatar: Image;
}
```

## Demo

We demonstrate its use by **extending the Customer entity** of the reference app with the property `avatar`.
To be able to access the avatar image data for this demo, make sure you follow the steps from the [setup](#setup) below
to connect to our environment with the prepared object store for the demo.

### Setup

1. Log in to Cloud Foundry:

    ```sh
    cf login -a https://api.cf.eu12.hana.ondemand.com -o cap-enablement-team -s samples
    ```

2.  In this directory (_services/attachments/_), prepare your *hybrid* profile by running:

    ```sh
    cds bind @cap-js/attachments -2 attachments-sample:attachments-sample-key
    ```

3. Run the application with the *hybrid* profile:

    ```sh
    cds watch --profile hybrid
    ```

4. Verify that your setup was successful by checking for the following in your output:

    ```
    resolving cloud service bindings...
    bound @cap-js/attachments to Cloud Foundry managed service attachments-sample:attachments-sample-key
    ```

5. Navigate to http://localhost:4004/incidents to see the images displayed in the **Avatar** column.