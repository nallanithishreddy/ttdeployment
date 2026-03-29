package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Attendance;
import com.example.demo.entity.Marks;
import com.example.demo.service.AttendanceService;
import com.example.demo.service.MarksService;

@RestController
@RequestMapping("/api/student-dashboard")
@CrossOrigin("*")
public class StudentDashboardController {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private MarksService marksService;

    // GET STUDENT ATTENDANCE
    @GetMapping("/attendance/{studentName}")
    public List<Attendance> getStudentAttendance(@PathVariable String studentName){
        return attendanceService.getAttendanceByStudent(studentName);
    }

    // GET STUDENT MARKS
    @GetMapping("/marks/{studentId}")
    public List<Marks> getStudentMarks(@PathVariable Long studentId){
        return marksService.getMarksByStudent(studentId);
    }

}