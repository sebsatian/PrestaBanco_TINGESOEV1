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
public class BusinessRequestEntity extends RequestEntity {

    @Lob
    @Column(name = "credit_history")
    private byte[] creditHistory;

    @Lob
    @Column(name = "finantial_statement")
    private byte[] finantialStatement;

    @Lob
    @Column(name = "business_plan")
    private byte[] businessPlan;
}
