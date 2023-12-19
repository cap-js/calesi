# Sample App for OpenTelemetry Instrumentation

Sample app based on the [Incident Management reference sample application](https://github.com/cap-js/incidents-app) for showcasing `@cap-js/telemetry`.

## How-to

1. `git clone --recursive https://github.com/cap-js/calesi.git`
1. `cd calesi`
1. `npm i`
1. `cds w samples/telemetry`
1. execute example request in `test.http` and find a trace printed to the console

## Troubleshooting

In case you get warning "Package '@sap/cds' was loaded from different installations" (e.g., if you have the cap/dev setup on your machine), run `npm run rm:cds`.
