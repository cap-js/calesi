using { ProcessorService as my } from '@capire/incidents';

annotate my.Incidents @changelog: [ customer.name, createdAt ] {
  customer @changelog: [ customer.name ];
  title  @changelog;
  status @changelog;
}

annotate my.Conversations @changelog: [ author, timestamp ] {
  message  @changelog;
}
