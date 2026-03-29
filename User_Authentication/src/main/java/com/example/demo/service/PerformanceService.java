package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Marks;
import com.example.demo.repo.MarksRepo;

@Service
public class PerformanceService {

    @Autowired
    private MarksRepo marksRepo;

    public List<Marks> getStudentPerformance(Long studentId) {
        return marksRepo.findByStudentId(studentId);
    }

}