package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Marks;
import com.example.demo.repo.MarksRepo;

@Service
public class MarksService {

    @Autowired
    private MarksRepo repo;

    // ADD SINGLE
    public Marks addMarks(Marks marks){
        return repo.save(marks);
    }

    // ADD MULTIPLE
    public List<Marks> saveAll(List<Marks> marksList){
        return repo.saveAll(marksList);
    }

    // GET ALL
    public List<Marks> getAllMarks(){
        return repo.findAll();
    }

    // GET BY STUDENT
    public List<Marks> getMarksByStudent(Long studentId){
        return repo.findByStudentId(studentId);
    }

    // GET BY SUBJECT
    public List<Marks> getMarksBySubject(Long subjectId){
        return repo.findBySubjectId(subjectId);
    }
}