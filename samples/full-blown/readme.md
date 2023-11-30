# Full-Blown Incidents

This app demonstrates an enhanced version of the incidents app.

**WARNING!!!** The full-blown plugin is only working with the incidents app.

```
npm i
cds w samples/full-blown
```

Features:

* New Confirm Button: ***Done***  
  The new button "Confirmation" appears on the list and detail view. By clicking the status of the selected incidents will be changed to "Closed"
* Authorizations...: ***Done***  
  New user Tom can only view, change and delete incidents created by himself.
* Eventing: Conversation => Status Changes & Console Output: ***Done***  
  * An event is triggered, in case the status of an incident is changed. This event will be received by a new handler and the changed status is shown in the console.
* Multitenancy ***Done***  
  * ``cds w samples/full-blown --profile with-mtx``
  * ``cds subscribe t1 --to http://localhost:4005 -u cust1:``
  * ``cds subscribe t2 --to http://localhost:4005 -u cust2:``
  * Testing with cust1:
    * Open browser incognito window with http://localhost:4005/incidents and login as cust1
    * Create cust1 specific incidents
    * Close browser
  * Testing with cust2:
    * Open browser incognito window with http://localhost:4005/incidents and login as cust2
    * Create cust2 specific incidents
    * Close browser
  * Whenever you login again with one of the customers, you will only see the related incidents 
* Freestyle UI5: Pre shown UI5 page for login name ***Open***
  * https://cap.cloud.sap/docs/node.js/authentication#custom

## Calesi Modifications

* Folder samples/full-blown added
* Workspace "samples/full-blown" added to calesi root package.json

## Calesi Modifications

* Folder samples/full-blown added
* Workspace "samples/full-blown" added to calesi root package.json

## Calesi Modifications

* Folder samples/full-blown added
* Workspace "samples/full-blown" added to calesi root package.json

## Manual Tasks

None