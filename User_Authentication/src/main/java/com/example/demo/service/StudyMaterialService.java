package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.StudyMaterial;
import com.example.demo.repo.StudyMaterialRepo;

@Service
public class StudyMaterialService {

    @Autowired
    private StudyMaterialRepo repo;

    public void save(StudyMaterial material) {
        repo.save(material);
    }

    public List<StudyMaterial> getAll() {
        return repo.findAll();
    }

    public StudyMaterial getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

}