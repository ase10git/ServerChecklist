package com.ase.serverckecklist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class ServerckecklistApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerckecklistApplication.class, args);
	}

}
