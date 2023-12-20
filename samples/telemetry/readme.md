# Sample App for `@cap-js/telemetry`

Sample app based on the [Incident Management reference sample application](https://github.com/cap-js/incidents-app) for showcasing `@cap-js/telemetry`.

## How-to

1. `git clone --recursive https://github.com/cap-js/calesi.git`
1. `cd calesi`
1. `npm i`
1. `cds w samples/telemetry`
1. execute example request in `test.http` and find a trace printed to the console

## Deploy to BTP CF

1. `cf l` to target landscape
1. create Dynatrace instance as described [here](https://pages.github.tools.sap/apm/docs/environment/btp-cockpit)
1. in `mta.yaml`, replace `calesi-telemetry-dynatrace` with the name of your Dynatrace instance
1. check additional prerequisites described [here](https://github.com/cap-js/telemetry?tab=readme-ov-file#telemetry-to-dyntrace)
1. `npm run deploy`
1. execute example request in `test.http` and check Dynatrace's Distributed Traces

## Troubleshooting

In case you get warning "Package '@sap/cds' was loaded from different installations" (e.g., if you have the cap/dev setup on your machine), run `npm run rm:cds`.
