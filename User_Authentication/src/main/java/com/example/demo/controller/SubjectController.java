package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Subject;
import com.example.demo.service.SubjectService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private SubjectService service;

    // Add subject
    @PostMapping("/add")
    public Subject addSubject(@RequestBody Subject subject){
        return service.addSubject(subject);
    }

    // Get all subjects
    @GetMapping("/all")
    public List<Subject> getSubjects(){
        return service.getAllSubjects();
    }

    // Search subject
    @GetMapping("/search/{name}")
    public List<Subject> searchSubject(@PathVariable String name){
        return service.searchSubject(name);
    }

    // Delete subject
    @DeleteMapping("/delete/{id}")
    public void deleteSubject(@PathVariable Long id){
        service.deleteSubject(id);
    }
}