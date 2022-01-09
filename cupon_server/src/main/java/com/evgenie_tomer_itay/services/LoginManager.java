package com.evgenie_tomer_itay.services;/*
package com.evgenie_tomer_itay.CouponSystemSpringBoot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class LoginManager {
	@Autowired
	AdminServiceImplementation adminService;

	private ConfigurableApplicationContext ctx;

	public LoginManager() {
	}

	public LoginManager(ConfigurableApplicationContext ctx) {
		this.ctx = ctx;
	}

	public ClientService login(String email, String password, ClientType clientType) {

		if (clientType.equals(ClientType.ADMINISTRATOR) && adminService.login(email, password)) {
			return adminService;
		} else if (clientType.equals(ClientType.COMPANY)) {
			CompanyServiceImplementation companyService = ctx.getBean(CompanyServiceImplementation.class);
			companyService.login(email, password);
			return companyService;
		} else {
			CustomerServiceImplementation customerService = ctx.getBean(CustomerServiceImplementation.class);

			customerService.login(email, password);

			return customerService;
		}
	}

	public void setCtx(ConfigurableApplicationContext ctx) {
		this.ctx = ctx;
	}
}
*/
