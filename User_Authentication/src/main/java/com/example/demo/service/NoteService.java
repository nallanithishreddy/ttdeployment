package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Note;
import com.example.demo.repo.NoteRepo;

@Service
public class NoteService {

    @Autowired
    private NoteRepo noteRepo;

    public Note addNote(Note note){
        return noteRepo.save(note);
    }

    public List<Note> getAllNotes(){
        return noteRepo.findAll();
    }

}