package com.example.demo.services;

import com.example.prestabanco.entities.EvaluationEntity;
import com.example.prestabanco.entities.RequestEntity;
import com.example.prestabanco.entities.SavingCapacityEntity;
import com.example.prestabanco.repositories.RequestRepository;
import com.example.prestabanco.repositories.SavingCapacityRepository;
import com.example.prestabanco.services.SavingCapacityService;
import com.sun.istack.logging.Logger;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SavingCapacityServiceTest {

    @InjectMocks
    private SavingCapacityService savingCapacityService;

    @Mock
    private SavingCapacityRepository savingCapacityRepository;

    @Mock
    private RequestRepository requestRepository;

    @Test
    void whenEvaluatingSavingCapacity_thenCorrect() {
        // Given
        EvaluationEntity evaluation = new EvaluationEntity();
        evaluation.setRequestId(1);
        evaluation.setBalance(BigDecimal.valueOf(200000));
        evaluation.setBiggestWithdrawalLast12Months(BigDecimal.valueOf(50000));
        evaluation.setBalanceAfterBW12Months(BigDecimal.valueOf(150000));
        evaluation.setBalance12MonthsAgo(BigDecimal.valueOf(100000));
        evaluation.setNumDepositsFirst4Months(2);
        evaluation.setNumDepositsLast4Months(2);
        evaluation.setNumDepositsSecond4Months(2);
        evaluation.setSumAllDeposits(BigDecimal.valueOf(120000));
        evaluation.setMonthlySalary(BigDecimal.valueOf(50000));
        evaluation.setCreationSavingAccountDate(LocalDate.now().minusYears(3));
        evaluation.setBiggestWithdrawalLast6Months(BigDecimal.valueOf(30000));
        evaluation.setBalanceAfterBW6Months(BigDecimal.valueOf(170000));

        RequestEntity request = new RequestEntity();
        request.setLoanAmount(BigDecimal.valueOf(100000));
        request.setMonthlyIncome(BigDecimal.valueOf(50000));
        request.setMonthlyPayment(BigDecimal.valueOf(1000));

        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));

        SavingCapacityEntity expectedSavingCapacity = new SavingCapacityEntity();
        expectedSavingCapacity.setRequestId(1);
        expectedSavingCapacity.setMinAmount(true);
        expectedSavingCapacity.setConsistentHistory(false);
        expectedSavingCapacity.setPeriodicDeposits(true);
        expectedSavingCapacity.setRelationAmountYears(true);
        expectedSavingCapacity.setRecentWithdrawals(true);
        expectedSavingCapacity.setCapacityResult("moderada");

        when(savingCapacityRepository.save(expectedSavingCapacity)).thenReturn(expectedSavingCapacity);


        savingCapacityService.evaluateSavingCapacity(evaluation);


        assertThat(savingCapacityRepository.save(expectedSavingCapacity)).isEqualTo(expectedSavingCapacity);
    }

    @Test
    void whenMinAmountIsFalse_thenCorrect(){
        // Given
        EvaluationEntity evaluation = new EvaluationEntity();
        evaluation.setRequestId(1);
        evaluation.setCreationSavingAccountDate(LocalDate.ofEpochDay(2023-12-30));
        evaluation.setBalance(BigDecimal.valueOf(0));
        evaluation.setBiggestWithdrawalLast12Months(BigDecimal.valueOf(50000));
        evaluation.setBalanceAfterBW12Months(BigDecimal.valueOf(0));
        evaluation.setBalance12MonthsAgo(BigDecimal.valueOf(100000));
        evaluation.setNumDepositsFirst4Months(0);
        evaluation.setNumDepositsLast4Months(2);
        evaluation.setNumDepositsSecond4Months(2);
        evaluation.setSumAllDeposits(BigDecimal.valueOf(120000));
        evaluation.setMonthlySalary(BigDecimal.valueOf(50000));
        evaluation.setBiggestWithdrawalLast6Months(BigDecimal.valueOf(30000));
        evaluation.setBalanceAfterBW6Months(BigDecimal.valueOf(0));

        RequestEntity request = new RequestEntity();
        request.setLoanAmount(BigDecimal.valueOf(100000));
        request.setMonthlyIncome(BigDecimal.valueOf(50000));
        request.setMonthlyPayment(BigDecimal.valueOf(1000));
        request.setLoanAmount(BigDecimal.valueOf(100000));
        request.setId(1L);

        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));

        SavingCapacityEntity expectedSavingCapacity = new SavingCapacityEntity();
        expectedSavingCapacity.setRequestId(1);
        expectedSavingCapacity.setMinAmount(false);

        // Then
        savingCapacityService.evaluateSavingCapacity(evaluation);

    }

    @Test
    void whenAllisTrue_thenCorrect(){
        // Given
        SavingCapacityEntity savingCapacity = new SavingCapacityEntity();
        savingCapacity.setRequestId(1);
        savingCapacity.setMinAmount(true);
        savingCapacity.setConsistentHistory(true);
        savingCapacity.setPeriodicDeposits(true);
        savingCapacity.setRelationAmountYears(true);
        savingCapacity.setRecentWithdrawals(true);

        // Then
        savingCapacityService.setResults(savingCapacity);
    }
}