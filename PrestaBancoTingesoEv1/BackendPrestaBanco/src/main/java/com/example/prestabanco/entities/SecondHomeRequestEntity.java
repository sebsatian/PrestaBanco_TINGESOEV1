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
@Table(name = "second_home_request")
public class SecondHomeRequestEntity extends RequestEntity {

    @Lob
    @Column(name = "first_home_deed", columnDefinition = "BYTEA")
    private byte[] firstHomeDeed;

    @Lob
    @Column(name = "credit_history", columnDefinition = "BYTEA")
    private byte[] creditHistory;
}
