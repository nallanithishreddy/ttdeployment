package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.StudyMaterial;

public interface StudyMaterialRepo extends JpaRepository<StudyMaterial, Long>{

}