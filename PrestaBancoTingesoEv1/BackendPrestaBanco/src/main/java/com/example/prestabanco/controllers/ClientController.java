package com.example.prestabanco.controllers;

import com.example.prestabanco.entities.ClientEntity;
import com.example.prestabanco.repositories.ClientRepository;
import com.example.prestabanco.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> registerClient(@RequestBody ClientEntity client) {
        try {
            ClientEntity newClient = clientService.registerClient(client);
            return ResponseEntity.ok(newClient);
        } catch (RuntimeException e) {
            // Si el RUT ya está registrado, devolver un error 400 con un mensaje claro
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // Para otros errores inesperados, devolver un error 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

}
