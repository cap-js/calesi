using from '@capire/incidents';

annotate ProcessorService.Incidents with @changelog.keys: [customer.name, createdAt] {
  customer @changelog: [ customer.name ];
  title  @changelog;
  status @changelog;
}

annotate ProcessorService.Conversations with @changelog.keys: [author, timestamp] {
  message  @changelog;
}
