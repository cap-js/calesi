using {
  sap.capire.incidents as my,
  ProcessorService
} from './processor-service';

annotate my.Incidents with @title: 'Incidents';
annotate my.Conversations with @title: 'Conversations';

annotate ProcessorService.Incidents with @changelog: [customer.name, createdAt] {
  customer @changelog: [customer.name] @Common.Label: 'Customer';
  title    @changelog;
  status   @changelog;
}

annotate ProcessorService.Conversations with @changelog: [author, timestamp] {
  message  @changelog @Common.Label: 'Message';
}
