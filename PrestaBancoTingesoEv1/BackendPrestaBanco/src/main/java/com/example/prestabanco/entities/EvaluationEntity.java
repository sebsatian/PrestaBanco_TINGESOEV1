package com.example.prestabanco.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "evaluation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "request_id")
    private int requestId;

    @Column(name = "balance")
    private BigDecimal balance;

    @Column(name = "minimum_balance")
    private BigDecimal minimumBalance;

    @Column(name = "balance_12_months_ago")
    private BigDecimal balance12MonthsAgo;

    @Column(name = "num_deposits_first_4_months")
    private int numDepositsFirst4Months;

    @Column(name = "num_deposits_second_4_months")
    private int numDepositsSecond4Months;

    @Column(name = "num_deposits_last_4_months")
    private int numDepositsLast4Months;

    @Column(name = "sum_all_deposits")
    private BigDecimal sumAllDeposits;

    @Column(name = "monthly_salary")
    private BigDecimal monthlySalary;

    @Column(name = "biggest_withdrawal_last_12_months")
    private BigDecimal biggestWithdrawalLast12Months;

    @Column(name = "balance_after_bw_12_months")
    private BigDecimal balanceAfterBW12Months;

    @Column(name = "biggest_withdrawal_last_6_months")
    private BigDecimal biggestWithdrawalLast6Months;

    @Column(name = "balance_after_bw_6_months")
    private BigDecimal balanceAfterBW6Months;

    @Column(name = "sum_all_debts")
    private BigDecimal sumAllDebts;

    @Column(name = "cost_to_income_ratio")
    private boolean costToIncomeRatio;

    @Column(name = "credit_history")
    private boolean creditHistory;

    @Column(name = "job_status")
    private boolean jobStatus;

    @Column(name = "debt_to_income_ratio")
    private boolean debtToIncomeRatio;

    @Column(name = "in_age")
    private boolean inAge;
}
