using {
  sap.capire.incidents as my,
  ProcessorService
} from '@capire/incidents';

annotate my.Incidents with @title: '{i18n>Incidents}';
annotate my.Conversations with @title: '{i18n>Conversations}';
annotate my.Customers with @title: '{i18n>Customers}';

annotate ProcessorService.Incidents {
  customer @changelog: [customer.name];
  title    @changelog;
  status   @changelog;
}

annotate ProcessorService.Conversations with @changelog: [author, timestamp] {
  message  @changelog @Common.Label: 'Message';
}
