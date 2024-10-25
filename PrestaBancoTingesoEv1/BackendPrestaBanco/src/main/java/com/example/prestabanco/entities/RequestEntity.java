package com.example.prestabanco.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class RequestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "loan_type", nullable = false)
    private int loanType;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @Column(name = "client_rut", nullable = false)
    private String clientRut;

    @Column(name = "current_status", nullable = false)
    private String currentStatus;

    @Lob
    @Column(name = "income_proof", columnDefinition = "BYTEA")
    private byte[] incomeProof;

    @Lob
    @Column(name = "appraisal_certificate", columnDefinition = "BYTEA")
    private byte[] appraisalCertificate;

    @Column(name = "loan_amount", nullable = false)
    private BigDecimal loanAmount;

    @Column(name = "years", nullable = false)
    private int years;

    @Column(name = "annual_interest_rate", nullable = false)
    private float annualInterestRate;

    @Column(name = "monthly_payment", nullable = false)
    private BigDecimal monthlyPayment;

    @Column(name = "monthly_income", nullable = false)
    private BigDecimal monthlyIncome;

}
