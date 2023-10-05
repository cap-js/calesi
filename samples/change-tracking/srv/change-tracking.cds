using { ProcessorService as my } from '@capire/incidents';

annotate my.Incidents with @changelog: {
  keys: [ customer.name, createdAt ]
 } {
  customer @changelog: [ customer.name ];
  title  @changelog;
  status @changelog;
}

annotate my.Conversations with @changelog: {
  keys: [ author, timestamp ]
 } {
  message  @changelog;
}
