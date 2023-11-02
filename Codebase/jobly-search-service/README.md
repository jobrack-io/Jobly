# Jobly Search Services for the Job 

## Introduction

This service is use for the creating the job in the elastic search and retrive the job from the Elasticsearch

We created a Job controller that allows doing the following operations with Elasticsearch:

- Get the list of all Jobs
- Create a jobs
- Update a jobs by Id
- Delete a job by Id
- Search for a job by Job title, job role and company
- Fuzzy search for role, title and description

## How to run

The first thing to do is to start Elasticsearch. For that, you can use the `docker-compose` file in this project  and run it like this:

```bash
$ docker-compose -f docker-compose up -d
``` 


It brings Elasticsearch up on a single node cluster with the cluster name `elasticsearch` also bring the kibana dashboard 
to access the kibana and validate the ES use the below url 
http://localhost:5601/app/home#/

Then you can run the application like below:

```bash
$ ./mvnw spring-boot:run
```

If your Elasticsearch URI is not `localhost` is different simply override the following environment variable:

- `ES_URI`

Once everything is up and running open the browser and go to [http://localhost:8080](http://localhost:8080). You should see Swagger to interact with.

## Run Testcontainers tests

The integration tests are written relying on [Testcontainers](https://www.testcontainers.org/) to spin up Elasticsearch on the spot and run tests against it.
To know more about container testing read this tutorial: [Integration test with Testcontainers in Java](https://www.geekyhacker.com/integration-test-with-testcontainers-in-java/)

To run the integration test (using Testcontainers) just run the below command:

```bash
$ mvn clean verify
```

Make sure you have your docker running.