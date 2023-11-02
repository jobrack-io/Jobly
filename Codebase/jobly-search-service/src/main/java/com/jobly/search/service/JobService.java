package com.jobly.search.service;

import com.jobly.search.model.Job;
import com.jobly.search.service.exception.JobNotFoundException;
import com.jobly.search.service.exception.DuplicateJobException;

import java.util.List;
import java.util.Optional;

public interface JobService {

    Optional<Job> getByTile(String title);

    List<Job> getAll();

    Optional<Job> findByRole(String role);

    List<Job> findByTags(String tag);

    Job create(Job job) throws DuplicateJobException;

    void deleteById(String id);

    Job update(String id, Job job) throws JobNotFoundException;
}
