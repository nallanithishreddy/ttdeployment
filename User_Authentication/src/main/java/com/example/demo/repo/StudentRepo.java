package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {

    List<Student> findBySubjectNameIgnoreCase(String subjectName);

    List<Student> findByStudentNameContainingIgnoreCase(String studentName);

    // ✅ REQUIRED FOR STUDENT DASHBOARD
    Student findByStudentName(String studentName);
}