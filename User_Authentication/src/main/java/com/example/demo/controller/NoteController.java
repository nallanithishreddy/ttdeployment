package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Note;
import com.example.demo.service.NoteService;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin("*")
public class NoteController {

    @Autowired
    private NoteService noteService;

    // ADMIN SEND NOTE
    @PostMapping("/add")
    public Note addNote(@RequestBody Note note){
        return noteService.addNote(note);
    }

    // STUDENTS VIEW NOTES
    @GetMapping("/all")
    public List<Note> getNotes(){
        return noteService.getAllNotes();
    }

}