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
    private Long id; // This is the primary key

    @Column(name = "client_id", nullable = false) // This is a foreign key
    private int clientId;

    @Column(name = "loan_type", nullable = false) // This is a foreign key
    private int loanType;

    @Column(name = "property_value", nullable = false)
    private BigDecimal propertyValue;// Valor total propiedad

    @Column(name = "loan_amount", nullable = false)
    private BigDecimal loanAmount; // Monto del préstamo

    @Column(name = "annual_interest_rate")
    private float annualInterestRate; // Tasa de interés anual

    @Column(name = "years", nullable = false)
    private int years; // Plazo en años

    @Column(name = "number_of_payments")
    private int numberOfPayments; // Número total de pagos

    @Column(name = "monthly_payment")
    private BigDecimal monthlyPayment; // Pago mensual

    @Column(name = "percentage")
    private float percentage; // Porcentaje del valor de la propiedad

    @Column(name = "final_amount")
    private BigDecimal finalAmount; // Monto final a pagar

}
