package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Marks;
import com.example.demo.service.PerformanceService;

@RestController
@RequestMapping("/api/performance")
@CrossOrigin("*")
public class PerformanceController {

    @Autowired
    private PerformanceService performanceService;

    @GetMapping("/{studentId}")
    public List<Marks> getStudentPerformance(@PathVariable Long studentId) {
        return performanceService.getStudentPerformance(studentId);
    }
}