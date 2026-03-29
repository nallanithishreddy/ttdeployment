package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Student;
import com.example.demo.repo.StudentRepo;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    // ADD STUDENT
    public Student addStudent(Student student) {
        return studentRepo.save(student);
    }

    // GET ALL STUDENTS
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    // GET STUDENT BY ID
    public Student getStudentById(Long id){
        return studentRepo.findById(id).orElse(null);
    }

    // SEARCH STUDENT BY NAME
    public List<Student> searchStudents(String name){
        return studentRepo.findByStudentNameContainingIgnoreCase(name);
    }

    // GET STUDENTS BY SUBJECT
    public List<Student> getStudentsBySubject(String subjectName) {
        return studentRepo.findBySubjectNameIgnoreCase(subjectName);
    }
}