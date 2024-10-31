package com.example.prestabanco.controllers;

import com.example.prestabanco.entities.RequestEntity;
import com.example.prestabanco.repositories.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@CrossOrigin("*")
public class RequestController {
    @Autowired
    private RequestRepository requestRepository;

    @GetMapping("/all")
    public List<RequestEntity> getAllRequests() {
        return requestRepository.findAll();
    }

    @GetMapping("/{id}")
    public RequestEntity getRequestById(@PathVariable Long id) {
        return requestRepository.findById(id).orElse(null);
    }

    @GetMapping("/{id}/appraisalCertificate")
    public byte[] getAppraisalCertificate(@PathVariable Long id) {
        RequestEntity request = requestRepository.findById(id).orElse(null);
        if (request != null && request.getAppraisalCertificate() != null) {
            return request.getAppraisalCertificate();
        }
        return new byte[0];
    }

    @GetMapping("/rut/{rut}")
    public List<RequestEntity> getRequestsByRut(@PathVariable String rut) {
        return requestRepository.findByClientRut(rut);
    }
}