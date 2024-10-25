package com.example.prestabanco.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "business_request")
public class BusinessReqEntity extends RequestEntity {

    @Lob
    @Column(name = "finantial_statement", columnDefinition = "BYTEA")
    private byte[] finantialStatement;

    @Lob
    @Column(name = "business_plan", columnDefinition = "BYTEA")
    private byte[] businessPlan;

    public void setFinancialStatement(byte[] financialStatement) {
        this.finantialStatement = financialStatement;
    }
}
