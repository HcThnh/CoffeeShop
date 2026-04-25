package com.example.database;

import javax.sql.DataSource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

@SpringBootApplication
public class DatabaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(DatabaseApplication.class, args);
	}

	@Bean
	public CommandLineRunner initAdmin(DataSource dataSource, PasswordEncoder passwordEncoder) {
		return args -> {
			JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
			String adminUsername = "admin";
			// Kiểm tra xem tài khoản admin đã tồn tại chưa
			if (!manager.userExists(adminUsername)) {
				UserDetails adminUser = User.withUsername(adminUsername)
						.password(passwordEncoder.encode("admin123"))
						.roles("MANAGER")
						.build();
				manager.createUser(adminUser);
				System.out.println("====== ADMIN ACCOUNT AUTO-CREATED ======");
				System.out.println("Username: " + adminUsername);
				System.out.println("Password: admin123");
				System.out.println("========================================");
			}
		};
	}
}
