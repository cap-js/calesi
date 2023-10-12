using { ProcessorService as my } from '@capire/incidents';

annotate my.Incidents with @changelog: [ customer.name, createdAt ] {
  customer @changelog: [ customer.name ];
  title  @changelog;
  status @changelog;
}

annotate my.Conversations with @changelog: [ author, timestamp ] {
  message  @changelog;
}
