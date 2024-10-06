package com.example.prestabanco.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "loan_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "maximum_term")
    private int maximumTerm;

    @Column(name = "max_finance")
    private float maxFinance;

    @Column(name = "min_interest_rate")
    private float minInterestRate;

    @Column(name = "max_interest_rate")
    private float maxInterestRate;

    @Column(name = "annual_interest_rate")
    private float annualInterestRate;
}
