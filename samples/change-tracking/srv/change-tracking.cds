using { ProcessorService } from './processor-service';

annotate ProcessorService.Incidents {
  customer @changelog: [customer.name];
  title    @changelog;
  status   @changelog;
}

annotate ProcessorService.Conversations with @changelog: [author, timestamp] {
  message  @changelog @Common.Label: 'Message';
}

// REVISIT: That should go into @capire/incidents base models
annotate ProcessorService.Incidents with @title: '{i18n>Incidents}';
annotate ProcessorService.Conversations with @title: '{i18n>Conversations}';
annotate ProcessorService.Customers with @title: '{i18n>Customers}';
