package com.jobly.search.service.impl;

import com.jobly.search.service.JobService;
import com.jobly.search.service.exception.JobNotFoundException;
import com.jobly.search.service.exception.DuplicateJobException;
import com.jobly.JobElasticsearchContainer;
import com.jobly.search.model.Job;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.testcontainers.elasticsearch.ElasticsearchContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@Testcontainers
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DefaultJobServiceIT {

    @Autowired
    private JobService JobService;

    @Autowired
    private ElasticsearchTemplate template;

    @Container
    private static final ElasticsearchContainer elasticsearchContainer = new JobElasticsearchContainer();

    @BeforeAll
    static void setUp() {
        elasticsearchContainer.start();
    }

    @BeforeEach
    void testIsContainerRunning() {
        assertTrue(elasticsearchContainer.isRunning());
        recreateIndex();
    }

    @Test
    void testGetBookByTitle() throws DuplicateJobException {
        JobService.create(createJob("12 rules for life", "Jordan Peterson", "2018", "978-0345816023"));
        Optional<Job> result = JobService.getByTile("978-0345816023");
        assertTrue(result.isPresent());
        Job createdJob = result.get();
        assertNotNull(createdJob);
        assertEquals("12 rules for life", createdJob.getTitle());
        assertEquals("Jordan Peterson", createdJob.getLocation());
        assertEquals(2018, createdJob.getPublishDate());
        assertEquals("978-0345816023", createdJob.getRole());
    }

    @Test
    void testGetAllBooks() throws DuplicateJobException {
        JobService.create(createJob("12 rules for life", "Jordan Peterson", "2018", "978-0345816023"));
        JobService.create(createJob("The Cathedral and the Bazaar", "Eric Raymond", "2018", "9780596106386"));
        List<Job> books = JobService.getAll();

        assertNotNull(books);
        assertEquals(2, books.size());
    }

    @Test
    void testFindByAuthor() throws DuplicateJobException {
        JobService.create(createJob("12 rules for life", "Jordan Peterson", "2018", "978-0345816023"));
        JobService.create(createJob("Maps of Meaning", "Jordan Peterson", "2018", "9781280407253"));

        Optional<Job> jobs = JobService.findByRole("Jordan Peterson");

        assertNotNull(jobs);
    }

    @Test
    void testFindByTitleAndAuthor() throws DuplicateJobException {
        JobService.create(createJob("12 rules for life", "Jordan Peterson", "2018", "978-0345816023"));
        JobService.create(createJob("Rules or not rules?", "Jordan Miller", "2018", "978128000000"));
        JobService.create(createJob("Poor economy", "Jordan Miller", "2018", "9781280789000"));
        JobService.create(createJob("The Cathedral and the Bazaar", "Eric Raymond", "2018", "9780596106386"));

        Optional<Job> books = JobService.findByRole("jordan");

        assertNotNull(books);
    }

    @Test
    void testCreateBook() throws DuplicateJobException {
        Job createdJob = JobService.create(createJob("12 rules for life", "Jordan Peterson", "2018", "978-0345816023"));
        assertNotNull(createdJob);
        assertNotNull(createdJob.getId());
        assertEquals("12 rules for life", createdJob.getTitle());
        assertEquals("Jordan Peterson", createdJob.getLocation());
        assertEquals(2018, createdJob.getPublishDate());
        assertEquals("978-0345816023", createdJob.getRole());
    }

    @Test
    void testCreateBookWithDuplicateISBNThrowsException() throws DuplicateJobException {
        Job createdBook = JobService.create(createJob("12 rules for life", "Jordan Peterson", "2018", "978-0345816023"));
        assertNotNull(createdBook);
        assertThrows(DuplicateJobException.class, () -> {
            JobService.create(createJob("Test title", "Test author", "2018", "978-0345816023"));
        });
    }

    @Test
    void testDeleteBookById() throws DuplicateJobException {
        Job createdBook = JobService.create(createJob("12 rules for life", "Jordan Peterson", "2018", "978-0345816023"));

        assertNotNull(createdBook);
        assertNotNull(createdBook.getId());

        JobService.deleteById(createdBook.getId());
        Optional<Job> books = JobService.findByRole("Jordan Peterson");

        assertTrue(books.isEmpty());
    }

    @Test
    void testUpdateBook() throws DuplicateJobException, JobNotFoundException {
        Job JobToUpdate = JobService.create(createJob("12 rules for life", "Jordan Peterson", "2000", "978-0345816023"));

        assertNotNull(JobToUpdate);
        assertNotNull(JobToUpdate.getId());

        JobToUpdate.setPublishDate("2018");
        Job updatedJob = JobService.update(JobToUpdate.getId(), JobToUpdate);

        assertNotNull(updatedJob);
        assertNotNull(updatedJob.getId());
        assertEquals("12 rules for life", updatedJob.getTitle());
        assertEquals("Jordan Peterson", updatedJob.getRole());
        assertEquals("2018", updatedJob.getPublishDate());
        assertEquals("978-0345816023", updatedJob.getLocation());
    }

    @Test
    void testUpdateBookThrowsExceptionIfCannotFindBook() {
        Job updatedBook = createJob("12 rules for life", "Jordan Peterson", "2000", "978-0345816023");

        assertThrows(JobNotFoundException.class, () -> {
            JobService.update("1A2B3C", updatedBook);
        });
    }

    private Job createJob(String title, String location, String publishedDate, String role) {
        Job book = new Job();
        book.setTitle(title);
        book.setLocation(location);
        book.setPublishDate(publishedDate);
        book.setRole(role);
        return book;
    }

    private void recreateIndex() {
        if (template.indexOps(Job.class).exists()) {
            template.indexOps(Job.class).delete();
            template.indexOps(Job.class).create();
        }
    }

    @AfterAll
    static void destroy() {
        elasticsearchContainer.stop();
    }
}
