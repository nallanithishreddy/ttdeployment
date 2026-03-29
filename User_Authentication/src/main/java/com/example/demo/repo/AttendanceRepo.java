package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Attendance;

public interface AttendanceRepo extends JpaRepository<Attendance, Long> {

// Find attendance records by subject
List<Attendance> findBySubjectName(String subjectName);

// Find attendance records by student name
List<Attendance> findByStudentNameIgnoreCase(String studentName);


}
