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
@Table(name = "first_home_request")
public class FirstHomeRequestEntity extends RequestEntity {

    @Lob
    @Column(name = "credit_history")
    private byte[] creditHistory;
}
