package com.example.prestabanco.services;

import com.example.prestabanco.repositories.LoanTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoanTypeService {

    @Autowired
    private LoanTypeRepository loanTypeRepository;


}
