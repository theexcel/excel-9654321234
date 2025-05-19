

This applications fetches, processes and stores data from an endpoint. It was done with Node(Express), Typescript, TypeOrm and MySQL. This applications uses a scheduler to fetch new events after every 1 minute and then process it before saving it in a particular format. It also uses an event emitter that listens whenever there is a bulk insert into the db before it processes listings/tokens.

Use `npm install` to install packages. Use `tsc` to compile the Typescript code to Javascript. Use `npm start` to start/run the application. To set up database, check the '.env.sample' file, and put in required information


# Additional Challenges

- Scalability

1.  implement horizontal Scaling: deploy multiple instance of the application behind a load balancer to distribute incoming requests evenly

2. Implement distributed processing: event-driven processing with frameworks like Apache Kafka or Rabbitmq can enable asynchronour processing across different nodes.

3. implement caching: technologies like Redis and Memcached can cache frequently accessed data, reducing database load and response times.

- Efficiency Optimization

1. connection polling : connection pooling can be used to manage database connections effectively.

2. Database schemas should be properly designed to support optimal query performance


- Error Handling

1. implement error handling mechanisms using try-catch blocks and error middleware. API failures or data inconsistencies can be handled  gracefully to prevent application crashes.

2. Logging libraries like Winston and Bunyan can be used to log errors, warnings and other information.
