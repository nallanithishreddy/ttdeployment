package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.AttendancePercentageService;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin("*")
public class AttendancePercentageController {

    @Autowired
    private AttendancePercentageService attendancePercentageService;

    @GetMapping("/percentage/{studentName}")
    public double getAttendancePercentage(@PathVariable String studentName) {
        return attendancePercentageService.calculateAttendancePercentage(studentName);
    }
}