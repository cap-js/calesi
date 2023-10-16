using {
  sap.capire.incidents as my,
  ProcessorService
} from './processor-service';

annotate my.Incidents with @title: 'Incidents';
annotate my.Conversations with @title: 'Conversations';

annotate my.Incidents @changelog: [ customer.name, createdAt ] {
  customer @changelog: [ customer.name ] @title: 'Customer';
  title  @changelog;
  status @changelog;
}

annotate my.Conversations @changelog: [ author, timestamp ] {
  message  @changelog @title: 'Message';
}
