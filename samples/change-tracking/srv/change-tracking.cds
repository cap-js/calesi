using from '@capire/incidents';

annotate ProcessorsService.Incidents with @changelog {
  customer @changelog: [ customer.name ];
  title  @changelog;
  status @changelog;
}

annotate ProcessorsService.Conversations with @changelog {
  message  @changelog;
}
