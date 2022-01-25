import CompanyForm from './components/CompanyForm';
import CustomerForm from './components/CustomerForm';
import {useState, createContext, useReducer, useEffect} from 'react';
import React from 'react';
import ReactDom from 'react-dom';
import CompanyList from './components/CompanyList';
import CustomerList from './components/CustomerList';
import CompanyModal from './components/DeleteCompanyConfirmModal';
import CustomerModal from './components/DeleteCustomerConfirmModal';
import useCompanies from './hooks/useCompanies';
import useCustomers from './hooks/useCustomers';
import './App.css';

function App() 
{
  const {companies, errorsCompany, addCompany, updateCompany, deleteCompany} = useCompanies();

  const {customers, errorsCustomer, addCustomer, updateCustomer, deleteCustomer} = useCustomers();

  const [searchState, setSearchState] = useState(false);

  const [filterCompanies, setFilterCompanies] = useState([]);

  const [filterCustomers, setFilterCustomers] = useState([]);

  const [isDeleteCompanyConfirmModalVisible, setDeleteCompanyConfirmModalVisible] = useState(false);

  const [isDeleteCustomerConfirmModalVisible, setDeleteCustomerConfirmModalVisible] = useState(false);

  const [currentCompany, setCurrentCompany] = useState({});

  const [currentCustomer, setCurrentCustomer] = useState({});

  const [companyFormState, setCompanyFormState] = useState("new");

  const [customerFormState, setCustomerFormState] = useState("new");

  function changeDeleteCompanyConfirmModalVisibility()
  {
    setDeleteCompanyConfirmModalVisible(!isDeleteCompanyConfirmModalVisible);
  }

  function changeDeleteCustomerConfirmModalVisibility()
  {
    setDeleteCustomerConfirmModalVisible(!isDeleteCustomerConfirmModalVisible);
  }

  return (
      <div className="App">
          <h1>Admin Home</h1>

          <h3>Companies</h3>          
          
          <CompanyForm
            addCompany={addCompany} updateCompany={updateCompany} currentCompany={currentCompany}
            companyFormState = {companyFormState} setCompanyFormState={setCompanyFormState} companies={companies}
          />

        <CompanyList companies={companies} searchState={searchState}
          setCurrentCompany={setCurrentCompany} errors={errorsCompany} setCompanyFormState = {setCompanyFormState}
          changeDeleteCompanyConfirmModalVisibility={changeDeleteCompanyConfirmModalVisibility}
        />

        <h3>Customers</h3>

          <CustomerForm
            addCustomer={addCustomer} updateCustomer={updateCustomer} currentCustomer={currentCustomer}
            customerFormState = {customerFormState} setCustomerFormState={setCustomerFormState} customers={customers}
          />

          <CustomerList customers={customers} searchState={searchState}
            setCurrentCustomer={setCurrentCustomer} errors={errorsCustomer} setCustomerFormState = {setCustomerFormState}
            changeDeleteCustomerConfirmModalVisibility={changeDeleteCustomerConfirmModalVisibility}
          />

        {isDeleteCompanyConfirmModalVisible ?
        ReactDom.createPortal(
        <CompanyModal deleteCompany={deleteCompany}
        setCompanyFormState={setCompanyFormState}
        currentCompany={currentCompany}
        changeDeleteCompanyConfirmModalVisibility={changeDeleteCompanyConfirmModalVisibility}
        />,
        document.querySelector("body")
        )
        : null} 

        {isDeleteCustomerConfirmModalVisible ?
        ReactDom.createPortal(
        <CustomerModal deleteCustomer={deleteCustomer}
        setCustomerFormState={setCustomerFormState}
        currentCustomer={currentCustomer}
        changeDeleteCustomerConfirmModalVisibility={changeDeleteCustomerConfirmModalVisibility}
        />,
        document.querySelector("body")
        )
        : null}  
      </div>
  );
}

export default App;
