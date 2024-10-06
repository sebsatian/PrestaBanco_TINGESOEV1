package com.example.prestabanco.repositories;

import com.example.prestabanco.entities.LoanTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanTypeRepository extends JpaRepository<LoanTypeEntity, Long> {

}
