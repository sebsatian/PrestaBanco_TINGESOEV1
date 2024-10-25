package com.example.prestabanco.repositories;

import com.example.prestabanco.entities.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, Long> {
    Optional<ClientEntity> findByRut(String rut);
    ClientEntity findClientByRut(@Param("rut") String rut);
    String getClientRutById(Long id);
}
