# Sample App for Audit Logging

Sample app based on the [Incident Management reference sample application](https://github.com/cap-js/incidents-app) for showcasing `@cap-js/audit-logging`.

## Contents

### db/schema.cds

Proxy to the base app's model to have `srv/data-privacy.cds` work in both this extension app as well as when copied to incidents-app.

### srv/data-privacy.cds

Adds all necessary `@PersonalData` annotations to the data model.

### test.http

Example OData requests for:

- `ProcessorService`: reading sensitive data and, more importantly, how to avoid it
- `AdminService`: modifying personal data
