import { useCallback, useEffect, useState, useContext } from "react";

import { httpAddCompany, httpUpdateCompany, httpGetCompanies, httpDeleteCompany} from "../services/api";

function useCompanies(props) 
{
  const [companies, saveCompanies] = useState([]);
  const [errorsCompany, setErrorsCompany] = useState("");

  const getCompanies = useCallback(async () => 
  {
    const fetchedCompanies = await httpGetCompanies();
    saveCompanies(fetchedCompanies);
  }, []);

  useEffect(() => 
  { 
    getCompanies();
  }
  , [getCompanies]
  );

  const addCompany = useCallback(async (e) => 
  {
      e.preventDefault();
      const data = new FormData(e.target);
      const name = data.get("name");
      const email = data.get("email");
      const password = data.get("password");

      const response = await httpAddCompany({
        name,
        email,
        password
      });

      if (response.ok) 
      {
        await getCompanies();
        setErrorsCompany("error");
      } 
      
      else 
      {
        setErrorsCompany("Something went wrong please try again leter");
      }
    },
    [getCompanies]
  );

  const updateCompany = useCallback(async (e) => 
  {
      e.preventDefault();
      const data = new FormData(e.target);
      const id = data.get("id");
      const name = data.get("name");
      const email = data.get("email");
      const password = data.get("password");

      const response = await httpUpdateCompany(id, {name, email, password});

      if (response.ok) 
      {
        await getCompanies();
        setErrorsCompany("error");
      } 
      
      else 
      {
        setErrorsCompany("Something went wrong please try again leter");
      }
  },
    [getCompanies]
  );

  const deleteCompany = useCallback(async (id) => 
  {
      const response = await httpDeleteCompany(id);

      if (response.ok) 
      {
        await getCompanies();

        setErrorsCompany("error");
      } 

      else 
      {
        setErrorsCompany("Something went wrong please try again leter");
      }
    },
  [getCompanies]
  );
  
  return {
    companies,
    errorsCompany,
    addCompany,
    deleteCompany,
    updateCompany
  };
}

export default useCompanies;
