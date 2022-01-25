import Customer from "./Customer";

export default function CustomerList(props) {
  const { searchState, setCurrentCustomer, customers, setCustomerFormState, changeDeleteCustomerConfirmModalVisibility} = props;

  if (!searchState && customers.length > 0) 
  {
    return customers.map((customer) => (
        <Customer        
          customer={customer}
          setCustomerFormState = {setCustomerFormState}
          setCurrentCustomer={setCurrentCustomer}
          changeDeleteCustomerConfirmModalVisibility={changeDeleteCustomerConfirmModalVisibility}
          key={customer.id.toString()}        
        />
    ));
  } 

  else if (!searchState)
  {
    return <p>Loading or no customers</p>;
  }
}
