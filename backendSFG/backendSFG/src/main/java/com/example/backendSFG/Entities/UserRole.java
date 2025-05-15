package com.example.backendSFG.Entities;

public enum UserRole {
    ADMIN("ROLE_ADMIN"),
    LECTURER("ROLE_LECTURER"),
    STUDENT("ROLE_STUDENT");

    private final String authority;

    UserRole(String authority) {
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }

    // Convert from string to enum
    public static UserRole fromString(String role) {
        for (UserRole userRole : UserRole.values()) {
            if (userRole.name().equalsIgnoreCase(role) || 
                userRole.getAuthority().equalsIgnoreCase(role)) {
                return userRole;
            }
        }
        throw new IllegalArgumentException("No enum constant with role: " + role);
    }

    // Check if a string is a valid role
    public static boolean isValidRole(String role) {
        for (UserRole userRole : UserRole.values()) {
            if (userRole.name().equalsIgnoreCase(role) || 
                userRole.getAuthority().equalsIgnoreCase(role)) {
                return true;
            }
        }
        return false;
    }
}
