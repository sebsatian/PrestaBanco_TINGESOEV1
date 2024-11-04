package com.example.prestabanco.services;

import com.example.prestabanco.entities.ClientEntity;
import com.example.prestabanco.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    // Obtain all clients
    public ArrayList<ClientEntity> getAllClients() {
        return (ArrayList<ClientEntity>) clientRepository.findAll();
    }

    // Obtain a client by its ID
    public Optional<ClientEntity> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public ClientEntity registerClient(ClientEntity client) {
        // Verify that the client does not already exist
        Optional<ClientEntity> existingClient = Optional.ofNullable(clientRepository.findClientByRut(client.getRut()));
        if (existingClient.isPresent()) {
            throw new RuntimeException("El RUT ya está registrado");
        }

        // Save the client
        return clientRepository.save(client);
    }


}
