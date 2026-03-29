package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Course;

public interface CourseRepo extends JpaRepository<Course, Long>{

    List<Course> findByCourseNameContainingIgnoreCase(String courseName);

}