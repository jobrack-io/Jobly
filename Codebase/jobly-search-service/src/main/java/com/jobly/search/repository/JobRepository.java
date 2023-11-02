package com.jobly.search.repository;

import com.jobly.search.model.Job;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobRepository extends ElasticsearchRepository<Job, String> {

    Optional<Job> findByTitle(String title);

    Optional<Job> findByRole(String role);
}