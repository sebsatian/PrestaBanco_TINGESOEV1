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
@Table(name = "remodeling_request")
public class RemodelingRequestEntity extends RequestEntity {

    @Lob
    @Column(name = "remodeling_budget", columnDefinition = "BYTEA")
    private byte[] remodelingBudget;
}
