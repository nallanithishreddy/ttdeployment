package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Announcement;
import com.example.demo.repo.AnnouncementRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementRepository repo;

    // Add announcement
    @PostMapping
    public Announcement addAnnouncement(@RequestBody Announcement announcement){
        return repo.save(announcement);
    }

    // Get all announcements
    @GetMapping
    public List<Announcement> getAnnouncements(){
        return repo.findAll();
    }

}