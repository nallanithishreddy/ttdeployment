package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.StudyMaterial;
import com.example.demo.service.StudyMaterialService;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin("*")
public class StudyMaterialController {

    @Autowired
    private StudyMaterialService service;

    // SAVE FILES IN uploads/pdf FOLDER
    private final String folderPath = System.getProperty("user.dir") + "/uploads/pdf/";



    // ================= UPLOAD MATERIAL =================

    @PostMapping("/upload")
    public String uploadMaterial(
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file) throws IOException {

        File folder = new File(folderPath);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        // Prevent file overwrite
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        File saveFile = new File(folderPath + fileName);

        file.transferTo(saveFile);

        StudyMaterial material = new StudyMaterial();
        material.setTitle(title);
        material.setFileName(fileName);

        service.save(material);

        return "Material uploaded successfully";
    }



    // ================= GET ALL MATERIALS =================

    @GetMapping("/all")
    public List<StudyMaterial> getMaterials() {
        return service.getAll();
    }



    // ================= VIEW MATERIAL =================

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewMaterial(@PathVariable String fileName) throws Exception {

        File file = new File(folderPath + fileName);

        if(!file.exists()){
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(file.toURI());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + file.getName() + "\"")
                .header(HttpHeaders.CONTENT_TYPE,"application/pdf")
                .body(resource);
    }



    // ================= DELETE MATERIAL =================

    @DeleteMapping("/delete/{id}")
    public String deleteMaterial(@PathVariable Long id) {

        StudyMaterial material = service.getById(id);

        if(material == null){
            return "Material not found";
        }

        File file = new File(folderPath + material.getFileName());

        if(file.exists()){
            file.delete();
        }

        service.delete(id);

        return "Material deleted successfully";
    }

}