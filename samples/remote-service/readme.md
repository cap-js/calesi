# Eventing/Messaging - Sample

Sample app based on [Incident Management](https://github.com/cap-js/incidents-app) for showcasing how to consume events in a CAP application emitted from a remoted service.
> This tutorial is built on top of remote service sample. For the convinience of the developers we had duplicated the files in both the remote service sample and also here.

## Business Use Case

In this tutorial, we will integrate SAP S/4 HANA Cloud Business Partner API to the Incident Management Application.

When a new incident is created by the processor, he/she had to assign the incident to a customer on behalf of whom they are receiving the phone call. This option to choose customer will be given as a value help and the list of customers in the value help will be fetched from SAP S/4HANA Cloud system. We will be using S/4HANA Business Partner API for the same.
Whenever the email address of the corresponding Business Partner changes in SAP S4HANA Cloud System, an event gets triggered and consumed by the Incident Mangagement application. The modified data is then persisted in the SAP HANA database.

### Setup

1. Clone the calesi repository

    ```sh
    git clone https://github.com/cap-js/calesi.git --recursive
    ```

2. Run the below command to copy files from messaging sample to the incident management application.

    ```sh
    cp -r ./db ./srv ./app ./tests package.json ../../incidents-app
    ```

3. Navigate to incidents-app and open package.json file.

4. Change the name in package.json file to `incident-management`

### Deploy and Run the application

    [Run a developer test with Mock Data]()
    [Prepare the app for Production]()
    [Option 1 - Deploy to CF]()
        [Deploy the application with the SAP S/4HANA Cloud system]()
        [Deploy the Application with Mock Server - optional]()
    [Option 2 - Deploy to Kyma]()
        [Deploy the application with the SAP S/4HANA Cloud system]()
        [Deploy the Application with Mock Server - optional]()
    [Test the end to end flow]()

   