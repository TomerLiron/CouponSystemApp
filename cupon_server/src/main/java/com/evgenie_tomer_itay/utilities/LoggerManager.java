package com.evgenie_tomer_itay.utilities;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.Date;

// https://www.baeldung.com/logback
// https://mkyong.com/logging/logback-xml-example/
// https://stackoverflow.com/questions/2488558/logback-to-log-different-messages-to-two-files

public class LoggerManager
{
	private final static Logger loggerErrors = LoggerFactory.getLogger("errors");
	private final static Logger loggerWarnings = LoggerFactory.getLogger("warnings");
	private final static Logger loggerInfo = LoggerFactory.getLogger("info");
	
	/*
	 	Copy the below code to class that starts first
	  
	 	String desktopPath = System.getProperty("user.home") + File.separator + "Desktop";
		String fileName = desktopPath+"\\CouponSystemSpringBootLog";
		System.setProperty("log.name",fileName);
	 */
  
	private static String getCurrentDateAsString()
	{
		SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		Date date = new Date(System.currentTimeMillis());
			
		return formatter.format(date);
	}
	
	public static void addLogInfo(String log)
	{
		LoggerManager.loggerInfo.info(log);
	}
	
	public static void addLogWarnings(String log)
	{
		LoggerManager.loggerWarnings.warn(log);
		LoggerManager.loggerInfo.warn("WARNING: "+log);
	}
	
	public static void addLogErrors(String log)
	{
		LoggerManager.loggerErrors.error(log);
		LoggerManager.loggerInfo.error("ERROR: "+log);
	}
}
