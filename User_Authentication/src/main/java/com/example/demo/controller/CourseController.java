package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Course;
import com.example.demo.service.CourseService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService service;

    // Add course
    @PostMapping("/add")
    public Course addCourse(@RequestBody Course course){
        return service.addCourse(course);
    }

    // Get all courses
    @GetMapping("/all")
    public List<Course> getAllCourses(){
        return service.getAllCourses();
    }

    // Search course
    @GetMapping("/search/{name}")
    public List<Course> searchCourse(@PathVariable String name){
        return service.searchCourse(name);
    }

    // Delete course
    @DeleteMapping("/delete/{id}")
    public void deleteCourse(@PathVariable Long id){
        service.deleteCourse(id);
    }
}