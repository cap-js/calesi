const cds = require('@sap/cds')

class ProcessorService extends cds.ApplicationService {
  /** Registering custom event handlers */
  async init() {
    this.before("UPDATE", "Incidents", (req) => this.onUpdate(req));
    this.before("CREATE", "Incidents", (req) => this.changeUrgencyDueToSubject(req.data));
    this.on('READ', 'Customers', (req) => this.onCustomerRead(req));
    this.on(['CREATE','UPDATE'], 'Incidents', (req, next) => this.onCustomerCache(req, next));
    this.S4bupa = await cds.connect.to('API_BUSINESS_PARTNER');
    return super.init();
  }

  async onCustomerCache(req, next) {
    const { Customers } = this.entities;
    const newCustomerId = req.data.customer_ID;
    const result = await next();
    const { BusinessPartner } = this.entities;
    if (newCustomerId && (newCustomerId !== "") && ((req.event == "CREATE") || (req.event == "UPDATE"))) {
      console.log('>> CREATE or UPDATE customer!');
      const customer = await this.S4bupa.run(SELECT.one(BusinessPartner, bp => {
        bp('*'),
          bp.addresses(address => {
            address('*'),
              address.email(emails => {
                emails('*')
              }),
              address.phoneNumber(phoneNumber => {
                phoneNumber('*')
              })
          })
      }).where({ ID: newCustomerId }));
      if(customer) {
        customer.email = customer.addresses[0]?.email[0]?.email;
        customer.phone = customer.addresses[0]?.phoneNumber[0]?.phone;
        delete customer.addresses;
        delete customer.name;
        await UPSERT.into(Customers).entries(customer);
      }
    }
    return result;
  }


  async onCustomerRead(req) {
    console.log('>> delegating to S4 service...', req.query);
    const top = parseInt(req._queryOptions?.$top) || 100;
    const skip = parseInt(req._queryOptions?.$skip) || 0;
  
    const { BusinessPartner } = this.entities;
  
    const result = await this.S4bupa.run(SELECT.from(BusinessPartner, bp => {
      bp('*'),
        bp.addresses(address => {
          address('*'),
            address.email(emails => {
              emails('*');
            });
        })
    })
    .limit(top, skip))
    .map((bp) => ({
      ID: bp.ID,
      name: bp.name,
      email: bp.addresses[0]?.email[0]?.email
    }));
  
    // This looks weird - assigning properties to an array? Why?
    result.$count = 1000;
    console.log("after result", result);
    return result;
  }
  

  changeUrgencyDueToSubject(data) {
    if (data) {
      const incidents = Array.isArray(data) ? data : [data];
      incidents.forEach((incident) => {
        if (incident.title?.toLowerCase().includes("urgent")) {
          incident.urgency = { code: "H", descr: "High" };
        }
      });
    }
  }

  /** Custom Validation */
  async onUpdate (req) {
    const { status_code } = await SELECT.one(req.subject, i => i.status_code).where({ID: req.data.ID});
    if (status_code === 'C')
      return req.reject(`Can't modify a closed incident`);
  }
}
module.exports = ProcessorService;
