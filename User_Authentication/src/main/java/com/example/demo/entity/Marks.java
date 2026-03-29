package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "marks")
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private Long subjectId;

    private int marks;

    private String examType;

    public Marks(){}

    public Long getId(){
        return id;
    }

    public Long getStudentId(){
        return studentId;
    }

    public void setStudentId(Long studentId){
        this.studentId = studentId;
    }

    public Long getSubjectId(){
        return subjectId;
    }

    public void setSubjectId(Long subjectId){
        this.subjectId = subjectId;
    }

    public int getMarks(){
        return marks;
    }

    public void setMarks(int marks){
        this.marks = marks;
    }

    public String getExamType(){
        return examType;
    }

    public void setExamType(String examType){
        this.examType = examType;
    }

}