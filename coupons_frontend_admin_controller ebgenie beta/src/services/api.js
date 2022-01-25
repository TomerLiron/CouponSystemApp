import React, { useState} from "react";

async function httpGetCompanies() 
{
    const response = await fetch("http://localhost:3000/admin/companies");
    return await response.json();
}
  
async function httpAddCompany(company) {
    try 
    {
      return await fetch("http://localhost:3000/admin/companies", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(company)
      });
    } 
    
    catch (e) 
    {
        console.log(e);
      return {
        ok: false
      };
    }
  }

  async function httpDeleteCompany(id) {

        const response = await fetch(`http://localhost:3000/admin/companies/${id}`, {
        method: "delete"
      });

      return await response;
  }
  
    async function httpUpdateCompany(id, company) {
    try 
    {
      return await fetch(`http://localhost:3000/admin/companies/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(company)
      });
    }

    catch (e) 
    {
        console.log(e);
      return 
      {
        //ok: false
      };
    }
  }

async function httpGetCustomers() 
{
    const response = await fetch("http://localhost:3000/admin/customers");
    return await response.json();
}

  async function httpAddCustomer(customer) {
    try 
    {
      return await fetch("http://localhost:3000/admin/customers", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      });
    } 
    
    catch (e) 
    {
        console.log(e);
      return {
        ok: false
      };
    }
  }

  async function httpDeleteCustomer(id) 
  {

    const response = await fetch(`http://localhost:3000/admin/customers/${id}`, {
    method: "delete"
    });

    return await response;
  }

  async function httpUpdateCustomer(id, customer) {
    try 
    {
      return await fetch(`http://localhost:3000/admin/customers/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      });
    }

    catch (e) 
    {
        console.log(e);
      return 
      {
        //ok: false
      };
    }
  }

  export { httpGetCompanies, httpAddCompany, httpDeleteCompany, httpUpdateCompany,
    httpGetCustomers, httpAddCustomer, httpDeleteCustomer, httpUpdateCustomer };

