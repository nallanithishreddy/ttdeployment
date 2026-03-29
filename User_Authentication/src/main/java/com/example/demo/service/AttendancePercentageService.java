package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Attendance;
import com.example.demo.repo.AttendanceRepo;

@Service
public class AttendancePercentageService {

    @Autowired
    private AttendanceRepo attendanceRepo;

    public double calculateAttendancePercentage(String studentName) {

        List<Attendance> records = attendanceRepo.findAll()
                .stream()
                .filter(a -> studentName.equalsIgnoreCase(a.getStudentName()))
                .collect(Collectors.toList());

        int totalClasses = records.size();
        int presentCount = 0;

        for (Attendance attendance : records) {
            if ("Present".equalsIgnoreCase(attendance.getStatus())) {
                presentCount++;
            }
        }

        if (totalClasses == 0) {
            return 0.0;
        }

        return (presentCount * 100.0) / totalClasses;
    }
}