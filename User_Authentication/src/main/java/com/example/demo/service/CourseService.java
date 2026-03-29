package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Course;
import com.example.demo.repo.CourseRepo;

@Service
public class CourseService {

    @Autowired
    private CourseRepo repo;

    public Course addCourse(Course course) {
        return repo.save(course);
    }

    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    public List<Course> searchCourse(String name) {
        return repo.findByCourseNameContainingIgnoreCase(name);
    }

    public void deleteCourse(Long id) {
        repo.deleteById(id);
    }
}