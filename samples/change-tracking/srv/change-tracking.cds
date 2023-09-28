using from '@capire/incidents';

annotate ProcessorsService.Incidents with @changelog.keys: [customer.name, createdAt] {
  customer @changelog: [ customer.name ];
  title  @changelog;
  status @changelog;
}

annotate ProcessorsService.Conversations with @changelog.keys: [author, timestamp] {
  message  @changelog;
}
