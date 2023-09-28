using from '@capire/incidents';

annotate ProcessorService.Incidents with @changelog {
  customer @changelog: [ customer.name ];
  title  @changelog;
  status @changelog;
}

annotate ProcessorService.Conversations with @changelog {
  message  @changelog;
}