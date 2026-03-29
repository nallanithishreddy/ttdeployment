package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Attendance;
import com.example.demo.service.AttendanceService;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin("*")
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @PostMapping("/add")
    public Attendance addAttendance(@RequestBody Attendance attendance){
        return service.addAttendance(attendance);
    }

    @PostMapping("/addAll")
    public List<Attendance> addAll(@RequestBody List<Attendance> list){
        return service.saveAll(list);
    }

    @GetMapping("/all")
    public List<Attendance> getAll(){
        return service.getAllAttendance();
    }

    @GetMapping("/subject/{name}")
    public List<Attendance> getBySubject(@PathVariable String name){
        return service.getBySubject(name);
    }

    // ✅ Already supports username
    @GetMapping("/student/{studentName}")
    public List<Attendance> getAttendanceByStudent(@PathVariable String studentName){
        return service.getAttendanceByStudent(studentName);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.deleteAttendance(id);
    }
}