package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.entity.Student;          // ✅ NEW
import com.example.demo.repo.UserRepo;
import com.example.demo.repo.StudentRepo;        // ✅ NEW

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private StudentRepo studentRepo;             // ✅ NEW

    // ================= REGISTER =================
    public User register(User user) {

        // Check duplicate email
        if (repo.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        // Default role
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("STUDENT");
        }

        // ✅ STEP 1: SAVE USER
        User savedUser = repo.save(user);

        // ✅ STEP 2: SAFE INSERT INTO STUDENT TABLE
        if (savedUser.getRole().equalsIgnoreCase("STUDENT")) {
            try {
                Student student = new Student();
                student.setStudentName(savedUser.getUsername());
                student.setEmail(savedUser.getEmail());
                student.setSubjectName("General"); // safe default

                studentRepo.save(student);

            } catch (Exception e) {
                // ❗ VERY IMPORTANT: do NOT break registration
                System.out.println("Student insert failed: " + e.getMessage());
            }
        }

        return savedUser;
    }

    // ================= LOGIN =================
    public User login(String email, String password) {

        User user = repo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}