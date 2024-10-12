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

    // Obtener todos los clientes
    public ArrayList<ClientEntity> getAllClients() {
        return (ArrayList<ClientEntity>) clientRepository.findAll();
    }

    // Obtener un cliente por ID con manejo de "no encontrado"
    public Optional<ClientEntity> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public ClientEntity registerClient(ClientEntity client) {
        // Verificar si el RUT ya está registrado
        Optional<ClientEntity> existingClient = clientRepository.findByRut(client.getRut());
        if (existingClient.isPresent()) {
            throw new RuntimeException("El RUT ya está registrado");
        }

        // Guardar el nuevo cliente en la base de datos
        return clientRepository.save(client);
    }

}
