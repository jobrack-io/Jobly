package com.jobly.search.controller;

import com.jobly.search.model.Job;
import com.jobly.search.service.JobService;
import com.jobly.search.service.exception.DuplicateJobException;
import com.jobly.search.service.exception.JobNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/job")
public class JobController {

    private final JobService jobService;

    public JobController(JobService bookService) {
        this.jobService = bookService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAll();
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping
    public Job createJob(@Valid @RequestBody JobDto job) throws DuplicateJobException {
        return jobService.create(JobDto.transform(job));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value = "/{title}")
    public Job getJobByTile(@PathVariable String location) throws JobNotFoundException {
        return jobService.getByTile(location).orElseThrow(() -> new JobNotFoundException("The given location is invalid"));
    }


    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value = "/{location}")
    public Job getJobByLocation(@PathVariable String location) throws JobNotFoundException {
        return jobService.getByTile(location).orElseThrow(() -> new JobNotFoundException("The given location is invalid"));
    }
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value = "/query")
    public List<Job> getJobByCompanyAndTitle(@RequestParam(value = "tags") String tags) {
        return jobService.findByTags(tags);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping(value = "/{id}")
    public Job updateJob(@PathVariable String id, @RequestBody JobDto job) throws JobNotFoundException {
        return jobService.update(id, JobDto.transform(job));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(value = "/{id}")
    public void deleteJob(@PathVariable String id) {
        jobService.deleteById(id);
    }

    public static class JobDto {
        @NotBlank
        private String title;

        //@Positive
       // @PublicationYear
        private String publishDate;

        @NotBlank
        private String location;

        @NotBlank
        private String role;

        static Job transform(JobDto jobDto) {
            Job job = new Job();
            job.setTitle(jobDto.title);
            job.setLocation(jobDto.location);
            job.setPublishDate(jobDto.role);
            job.setPublishDate(jobDto.publishDate);
            return job;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPublishDate() {
            return publishDate;
        }

        public void setPublishDate(String publishDate) {
            this.publishDate = publishDate;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
