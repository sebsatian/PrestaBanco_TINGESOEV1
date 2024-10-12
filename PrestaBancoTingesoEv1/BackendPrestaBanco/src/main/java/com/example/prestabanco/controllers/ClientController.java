package com.example.prestabanco.controllers;

import com.example.prestabanco.entities.ClientEntity;
import com.example.prestabanco.repositories.ClientRepository;
import com.example.prestabanco.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
@CrossOrigin("*")
public class ClientController {

    @Autowired
    ClientService clientService;

    // Endpoint para registrar un cliente
    @PostMapping("/register")
    public ResponseEntity<ClientEntity> registerClient(@RequestBody ClientEntity client) {
        ClientEntity newClient = clientService.registerClient(client);
        return ResponseEntity.ok(newClient);
    }
}
