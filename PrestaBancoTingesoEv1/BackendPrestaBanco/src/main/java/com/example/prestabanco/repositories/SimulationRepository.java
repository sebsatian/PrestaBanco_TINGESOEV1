package com.example.prestabanco.repositories;

import com.example.prestabanco.entities.SimulationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimulationRepository extends JpaRepository<SimulationEntity, Long> {

}
