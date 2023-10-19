# Running the application : So currently there are 4 services

# # # jobly-service-registry
# # # jobly-gateway
# # # jobly-identity-service
# # # jobly-userProfile-service


**Step 1 **:  Start the jobly-service-registry services so all the microservices can register on Jobly service registry 

Run below command from jobly-service-registry folder

# # mvn clean install
# # java -jar java -jar target/jobly-service-registry-0.0.1-SNAPSHOT.jar


After that Access the service Register http://localhost:8761/


**Step 2 **:  Start the jobly-gateway so it will redirect all the request according the URL to different different services

Run below command from jobly-gateway folder

# # mvn clean install

# # java -jar java -jar target/jobly-gateway-0.0.1-SNAPSHOT.jar


Now check in registry wether service got registered

http://localhost:8761/



**Step 3 **:  Start the jobly-identity-service it will use to register the new user and get the token


Inside this application you need to add your database entries so create a DB with name jobly and change the  src/main/resources/application.properties

spring.datasource.url =  jdbc:mysql://localhost:3306/jobly
spring.datasource.username = root
spring.datasource.password = Welcome12!


then run below command from jobly-identity-service folder

# # mvn clean install

# # java -jar target/jobly-identity-service-0.0.1-SNAPSHOT.jar

Validate that wether that service is running properly or not using the service registery

http://localhost:8761/



**Step 4 **:  Start the jobly-userProfile-service to the user profile home page pass authentication token

Run below command from jobly-identity-service folder

# # mvn clean install

# # java -jar target/jobly-userProfile-service-0.0.1-SNAPSHOT.jar

Validate that wether that service is running properly or not using the service registery

http://localhost:8761/



Added Jobly.postman_collection.json file so you can import the in your postman and make the request 




