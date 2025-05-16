package com.example.backendSFG.Repositories;

import com.example.backendSFG.Entities.User;
import com.example.backendSFG.Entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    List<User> findByApprovedFalseAndRoleIn(List<UserRole> roles);
}