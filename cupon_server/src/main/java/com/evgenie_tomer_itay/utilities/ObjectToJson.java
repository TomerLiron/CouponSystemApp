package com.evgenie_tomer_itay.utilities;

import com.evgenie_tomer_itay.entities.Company;
import com.evgenie_tomer_itay.entities.Customer;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class ObjectToJson 
{
	public static String toJson(Object object) throws JsonProcessingException 
	{
		ObjectMapper mapper = new ObjectMapper();
		
		mapper.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);
		
		ObjectWriter objectWriter = mapper.writer().withDefaultPrettyPrinter();
		String json = objectWriter.writeValueAsString(object);
		
		return json;
	}
}
