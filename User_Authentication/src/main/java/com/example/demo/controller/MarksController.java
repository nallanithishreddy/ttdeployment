package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Marks;
import com.example.demo.entity.Student;
import com.example.demo.service.MarksService;
import com.example.demo.repo.StudentRepo;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin("*")
public class MarksController {

    @Autowired
    private MarksService service;

    @Autowired
    private StudentRepo studentRepo;

    // ================= ADD =================

    @PostMapping("/add")
    public Marks addMarks(@RequestBody Marks marks){
        return service.addMarks(marks);
    }

    @PostMapping("/addAll")
    public List<Marks> addAllMarks(@RequestBody List<Marks> marksList){
        return service.saveAll(marksList);
    }

    // ================= GET =================

    @GetMapping("/all")
    public List<Marks> getAll(){
        return service.getAllMarks();
    }

    @GetMapping("/student/{id}")
    public List<Marks> getByStudent(@PathVariable Long id){
        return service.getMarksByStudent(id);
    }

    @GetMapping("/subject/{id}")
    public List<Marks> getBySubject(@PathVariable Long id){
        return service.getMarksBySubject(id);
    }

    // ================= STUDENT DASHBOARD API =================

    @GetMapping("/student/username/{username}")
    public List<Marks> getMarksByUsername(@PathVariable String username){

        // 🔥 IMPORTANT: find correct student
        Student student = studentRepo.findByStudentName(username);

        if(student == null){
            return List.of();
        }

        // return only that student's marks
        return service.getMarksByStudent(student.getId());
    }
}