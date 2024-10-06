package com.example.prestabanco.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "simulation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimulationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id", nullable = false)
    private int clientId;

    @Column(name = "loan_type", nullable = false)
    private int loanType;

    @Column(name = "property_value", nullable = false)
    private BigDecimal propertyValue;

    @Column(name = "loan_amount", nullable = false)
    private BigDecimal loanAmount;

    @Column(name = "annual_interest_rate")
    private float annualInterestRate;

    @Column(name = "years", nullable = false)
    private int years;

    @Column(name = "number_of_payments")
    private int numberOfPayments;

    @Column(name = "monthly_payment")
    private BigDecimal monthlyPayment;
}
