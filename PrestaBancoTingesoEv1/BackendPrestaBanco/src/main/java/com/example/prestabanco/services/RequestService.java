package com.example.prestabanco.services;

import com.example.prestabanco.entities.RequestEntity;
import com.example.prestabanco.entities.SimulationEntity;
import com.example.prestabanco.repositories.ClientRepository;
import com.example.prestabanco.repositories.LoanTypeRepository;
import com.example.prestabanco.repositories.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private LoanTypeRepository loanTypeRepository;

    public RequestEntity registerRequest(SimulationEntity simulation, String incomeProof, String appraisalCertificate, String creditHistory, String finantialStatement, String plusDocument) {

        // Obtain the client ID from the simulation
        int clientId = simulation.getClientId();

        // Obtain the client RUT from their ID
        String clientRut = clientRepository.findRutById(clientId);

        // Obtain the loan type from the simulation
        int loanTypeId = simulation.getLoanType();

        // Obtain the years from the simulation
        int years = simulation.getYears();

        // Obtain the loan amount from the simulation
        BigDecimal loanAmount = simulation.getLoanAmount();

        // New Long variable to search the annual interest rate by loan type
        Long loanTypeIdLong = Long.valueOf(loanTypeId);

        // Obtain the annual interest rate from the database
        double annualInterestRate = loanTypeRepository.getInterestRateById(loanTypeIdLong);

        // Create a new RequestEntity object
        RequestEntity request = new RequestEntity();

        // If the loan type is 1, the client didn't provide a plus document
        if (loanTypeId == 1) {
            // Assign the credit history to the request
            request.setCreditHistory(creditHistory);
            // Nullify the documents that are not needed
            request.setBusinessPlan(null);
            request.setFirstHomeDeed(null);
            request.setFinantialStatement(null);
            request.setRemodelingBudget(null);
        } else if (loanTypeId == 2) {
            // Assign the plus document to the first home deed and credit history to the request
            request.setCreditHistory(creditHistory);
            request.setFirstHomeDeed(plusDocument);
            // Nullify the documents that are not needed
            request.setBusinessPlan(null);
            request.setFinantialStatement(null);
            request.setRemodelingBudget(null);
        } else if (loanTypeId == 3) {
            // Assign the corresponding documents to the request
            request.setFinantialStatement(finantialStatement);
            request.setBusinessPlan(plusDocument);
            // Nullify the documents that are not needed
            request.setFirstHomeDeed(null);
            request.setRemodelingBudget(null);
        } else if (loanTypeId == 4) {
            // Assign the plus document to the remodeling budget
            request.setRemodelingBudget(plusDocument);
            // Nullify the documents that are not needed
            request.setFirstHomeDeed(null);
            request.setFinantialStatement(null);
            request.setBusinessPlan(null);
        }

        // Assign the default values to the request
        request.setLoanType(loanTypeId);
        request.setClientRut(clientRut);
        request.setCurrentStatus("En Revisión Inicial");
        request.setIncomeProof(incomeProof);
        request.setAppraisalCertificate(appraisalCertificate);
        request.setLoanAmount(loanAmount);
        request.setYears(years);
        request.setAnnualInterestRate((float) annualInterestRate);

        // Save the request to the database
        return requestRepository.save(request);
    }

}
