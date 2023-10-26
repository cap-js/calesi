# Sample App for AMS

Sample app based on the [Incident Management reference sample application](https://github.com/cap-js/incidents-app) for showcasing `@sap/ams`.

### Troubleshooting

During `cds w samples/ams`, `@sap/ams-dev` generates DCL from `@restrict`/ `@requires` in *.cds into folder `samples/ams/ams`.
If this doesn't happen, your cds-dk may be in a location that `@sap/ams` doesn't expect.
In the repo root, execute `npm i --no-save @sap/cds-dk` and run the sample via `npx cds w samples/ams`.
