package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Subject;
import com.example.demo.repo.SubjectRepo;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepo repo;

    public Subject addSubject(Subject subject) {
        return repo.save(subject);
    }

    public List<Subject> getAllSubjects() {
        return repo.findAll();
    }

    public List<Subject> searchSubject(String name) {
        return repo.findBySubjectNameContainingIgnoreCase(name);
    }

    public void deleteSubject(Long id) {
        repo.deleteById(id);
    }
}