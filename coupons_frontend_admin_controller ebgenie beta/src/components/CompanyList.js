import Company from "./Company";

export default function CompanyList(props) {
  const { searchState, setCurrentCompany, companies, setCompanyFormState, changeDeleteCompanyConfirmModalVisibility} = props;

  if (!searchState && companies.length > 0) 
  {
    return companies.map((company) => (
        <Company        
          company={company}
          setCompanyFormState = {setCompanyFormState}
          setCurrentCompany={setCurrentCompany}
          changeDeleteCompanyConfirmModalVisibility={changeDeleteCompanyConfirmModalVisibility}
          key={company.id.toString()}        
        />
    ));
  } 

  else if (!searchState)
  {
    return <p>Loading or no companies</p>;
  }
}
