

This applications fetches, process and stores data from an endpoint. It was done with Node(Express), Typescript, TypeOrm and MySQL. This applications uses a scheduler to fetch new events after every 1 minute and then process it before saving it in a particular format. It also uses an event emitter that listens whenever there is a bulk insert into the db before it processes listings/tokens.

Use `npm install` to install packages
use `tsc` to compile the Typescript code to Javascript
use `npm start` to start/run the application
to use the database, execk the '.env.sample' file, and put in required information


# Additional Challenges

- Scalability

1. Implement horizontal scaling by deploying multiple instances of the application across different servers or containers.
Use a load balancer to distribute incoming traffic evenly across these instances.
As the load increases, you can dynamically add or remove instances to handle varying levels of traffic.

2. Messaging queues can be used to queue events that should be published

3.