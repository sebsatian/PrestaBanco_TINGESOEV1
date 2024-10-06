package com.example.prestabanco.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "loan_type", nullable = false)
    private int loanType;

    @Column(name = "client_rut", nullable = false)
    private String clientRut;

    @Column(name = "current_status", nullable = false)
    private String currentStatus;

    @Column(name = "income_proof")
    private String incomeProof;

    @Column(name = "appraisal_certificate")
    private String appraisalCertificate;

    @Column(name = "first_home_deed")
    private String firstHomeDeed;

    @Column(name = "credit_history")
    private String creditHistory;

    @Column(name = "business_plan")
    private String businessPlan;

    @Column(name = "loan_amount", nullable = false)
    private BigDecimal loanAmount;

    @Column(name = "years", nullable = false)
    private int years;

    @Column(name = "annual_interest_rate", nullable = false)
    private float annualInterestRate;
}
