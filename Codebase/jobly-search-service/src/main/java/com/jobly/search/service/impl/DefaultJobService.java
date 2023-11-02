package com.jobly.search.service.impl;

import static co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders.match;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.stereotype.Service;

import com.jobly.search.model.Job;
import com.jobly.search.repository.JobRepository;
import com.jobly.search.service.JobService;
import com.jobly.search.service.exception.JobNotFoundException;
import com.jobly.search.service.exception.DuplicateJobException;

import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;

@Service
public class DefaultJobService implements JobService {

    private final JobRepository jobRepository;

    private final ElasticsearchTemplate elasticsearchTemplate;

    public DefaultJobService(JobRepository jobRepository, ElasticsearchTemplate elasticsearchTemplate) {
        this.jobRepository = jobRepository;
        this.elasticsearchTemplate = elasticsearchTemplate;
    }


    public Optional<Job> findByRole(String role) {
        return jobRepository.findByRole(role);
    }

    @Override
    public Optional<Job> getByTile(String title) {
        return jobRepository.findByTitle(title);
    }

    @Override
    public List<Job> getAll() {
        List<Job> jobs = new ArrayList<>();
        jobRepository.findAll()
            .forEach(jobs::add);
        return jobs;
    }



    @Override
    public List<Job> findByTags(String tag) {
        var criteria = QueryBuilders.bool(builder -> builder.must(
            match(queryTitle -> queryTitle.field("tag").query(tag))
        ));

        return elasticsearchTemplate.search(NativeQuery.builder().withQuery(criteria).build(), Job.class)
            .stream().map(SearchHit::getContent).toList();
    }

    @Override
    public Job create(Job job) throws DuplicateJobException {
            return jobRepository.save(job);
    }

    @Override
    public void deleteById(String id) {
        jobRepository.deleteById(id);
    }

    @Override
    public Job update(String id, Job job) throws JobNotFoundException {
        Job oldJob = jobRepository.findById(id)
            .orElseThrow(() -> new JobNotFoundException("There is not book associated with the given id"));
        oldJob.setTitle(job.getTitle());
        oldJob.setLocation(job.getLocation());
        oldJob.setPublishDate(job.getPublishDate());
        oldJob.setTitle(job.getTitle());
        return jobRepository.save(oldJob);
    }
}
