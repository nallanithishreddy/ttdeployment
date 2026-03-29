package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Marks;

@Repository
public interface MarksRepo extends JpaRepository<Marks, Long>{

    List<Marks> findByStudentId(Long studentId);

    List<Marks> findBySubjectId(Long subjectId);
}