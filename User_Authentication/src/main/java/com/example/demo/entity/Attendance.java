package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;

    private String subjectName;

    private String date;

    private String status;

    // DEFAULT CONSTRUCTOR (REQUIRED)
    public Attendance() {
    }

    // PARAMETERIZED CONSTRUCTOR (OPTIONAL)
    public Attendance(String studentName, String subjectName, String date, String status) {
        this.studentName = studentName;
        this.subjectName = subjectName;
        this.date = date;
        this.status = status;
    }

    // GETTERS

    public Long getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public String getDate() {
        return date;
    }

    public String getStatus() {
        return status;
    }

    // SETTERS

    public void setId(Long id) {
        this.id = id;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}