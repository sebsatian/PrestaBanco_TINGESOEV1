package com.example.prestabanco.services;

import com.example.prestabanco.entities.ClientEntity;
import com.example.prestabanco.entities.SimulationEntity;
import com.example.prestabanco.repositories.ClientRepository;
import com.example.prestabanco.repositories.LoanTypeRepository;
import com.example.prestabanco.repositories.SimulationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class SimulationService {

    @Autowired
    SimulationRepository simulationRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private LoanTypeRepository loanTypeRepository;


    public SimulationEntity getSimulationByClientId(Long clientId) {
        Optional<SimulationEntity> simulationOpt = simulationRepository.findByClientId(clientId);
        if (simulationOpt.isPresent()) {
            return simulationOpt.get();
        } else {
            throw new IllegalArgumentException("Simulation not found for client with ID: " + clientId);
        }
    }


    // Create a new simulation
    public SimulationEntity createSimulation(String rut, int propertyValue, Long loanType, int years, float percentage) {


        // Obtain the client ID by RUT
        ClientEntity client = clientRepository.findClientByRut(rut);
        if (client == null) {
            System.out.println("Client not found with the provided RUT");
            throw new IllegalArgumentException("Client not found with the provided RUT");
        }
        // Convert the percentage of the property value to decimal
        percentage = percentage / 100;

        // Obtain the annual interest rate from the loan type
        double annualInterestRate = loanTypeRepository.getInterestRateById(loanType);


        // Calculate the monthly interest rate
        double monthlyInterestRate = (annualInterestRate / 100) / 12;

        // Calculate the total number of payments
        int numberOfPayments = years * 12;

        // Calculate the loan amount
        double loanAmount = propertyValue * percentage;

        // Calculate the monthly payment using the correct formula
        double aux1PlusR = monthlyInterestRate + 1;
        double monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(aux1PlusR, numberOfPayments)) / (Math.pow(aux1PlusR, numberOfPayments) - 1);

        // Calculate the final amount to pay
        double finalAmount = monthlyPayment * numberOfPayments;

        Long id = client.getId(); // Extract the ID from the client

        int clientId = id.intValue();
        percentage = percentage * 100;
        // Convert values to BigDecimal where necessary to maintain precision
        BigDecimal propertyValueBD = BigDecimal.valueOf(propertyValue);
        BigDecimal loanAmountBD = BigDecimal.valueOf(loanAmount);
        BigDecimal monthlyPaymentBD = BigDecimal.valueOf(monthlyPayment);
        BigDecimal finalAmountBD = BigDecimal.valueOf(finalAmount);

        // Create a new instance of SimulationEntity
        SimulationEntity newSimulation = new SimulationEntity();
        newSimulation.setClientId(clientId);
        newSimulation.setLoanType(loanType.intValue());
        newSimulation.setPropertyValue(propertyValueBD);
        newSimulation.setLoanAmount(loanAmountBD);
        newSimulation.setAnnualInterestRate((float) annualInterestRate);
        newSimulation.setYears(years);
        newSimulation.setNumberOfPayments(numberOfPayments);
        newSimulation.setMonthlyPayment(monthlyPaymentBD);
        newSimulation.setPercentage(percentage);
        newSimulation.setFinalAmount(finalAmountBD);

        // Save the new simulation
        simulationRepository.save(newSimulation);

        return newSimulation;
    }

    public SimulationEntity updateSimulation(SimulationEntity existingSimulation, SimulationEntity updatedSimulation) {
        // Actualizar los campos relevantes de la simulación
        existingSimulation.setPropertyValue(updatedSimulation.getPropertyValue());
        existingSimulation.setLoanType(updatedSimulation.getLoanType());
        existingSimulation.setYears(updatedSimulation.getYears());
        existingSimulation.setPercentage(updatedSimulation.getPercentage());

        // Obtener el RUT del cliente asociado con la simulación existente
        String rut = clientRepository.findById((long) existingSimulation.getClientId())
                .orElseThrow(() -> new IllegalArgumentException("Client not found for the provided simulation"))
                .getRut();

        // Recalcular los valores restantes usando la lógica de `createSimulation`
        // pero sin cambiar la instancia, de modo que se mantenga la misma ID
        SimulationEntity recalculatedSimulation = createSimulation(rut,
                updatedSimulation.getPropertyValue().intValue(),
                (long) updatedSimulation.getLoanType(),
                updatedSimulation.getYears(),
                updatedSimulation.getPercentage());

        // Mantener el ID de la simulación existente
        existingSimulation.setLoanAmount(recalculatedSimulation.getLoanAmount());
        existingSimulation.setAnnualInterestRate(recalculatedSimulation.getAnnualInterestRate());
        existingSimulation.setMonthlyPayment(recalculatedSimulation.getMonthlyPayment());
        existingSimulation.setNumberOfPayments(recalculatedSimulation.getNumberOfPayments());
        existingSimulation.setFinalAmount(recalculatedSimulation.getFinalAmount());

        // Guardar la simulación actualizada
        simulationRepository.save(existingSimulation);

        return existingSimulation;
    }


}
