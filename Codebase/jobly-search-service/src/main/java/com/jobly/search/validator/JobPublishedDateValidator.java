package com.jobly.search.validator;

import com.jobly.search.metadata.JobPublishedDate;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class JobPublishedDateValidator implements ConstraintValidator<JobPublishedDate, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Adjust the pattern as needed
            LocalDate inputDate = LocalDate.parse(value, formatter);
            LocalDate today = LocalDate.now();
            return inputDate.isAfter(today);
        } catch (Exception e) {
            // Handle parsing errors (invalid date format, etc.)
            return false;
        }

    }
}