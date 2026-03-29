package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Attendance;
import com.example.demo.repo.AttendanceRepo;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepo repo;

    public Attendance addAttendance(Attendance attendance){
        return repo.save(attendance);
    }

    public List<Attendance> saveAll(List<Attendance> list){
        return repo.saveAll(list);
    }

    public List<Attendance> getAllAttendance(){
        return repo.findAll();
    }

    public List<Attendance> getBySubject(String subject){
        return repo.findBySubjectName(subject);
    }

    public List<Attendance> getAttendanceByStudent(String studentName){
        return repo.findByStudentNameIgnoreCase(studentName);
    }

    public void deleteAttendance(Long id){
        repo.deleteById(id);
    }
}