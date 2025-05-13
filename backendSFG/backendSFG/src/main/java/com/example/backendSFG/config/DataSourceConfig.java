package com.example.backendSFG.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl("jdbc:postgresql://localhost:5433/smartCampusServicedb");
        dataSource.setUsername("user");
        dataSource.setPassword("admin");

        // Disable auto-commit
        try {
            Connection connection = dataSource.getConnection();
            connection.setAutoCommit(false);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return dataSource;
    }

    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
