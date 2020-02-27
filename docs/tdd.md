# What is Test-Driven Development?
Test-driven development is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the code is improved so that the tests pass

## The test-driven development cycle consists of the following parts.

Step 1: Write documentation for your API endpoints, describing how the user will interact with them (what are the inputs/outputs?). 

This is similar to the process of making wireframes in a non API project.

Step 2: Write your data models according to what data you will be storing.

Step 3: Write a route for each of your API endpoints, according to the following steps:

    1. Write a unit test for the endpoint that tests whether it gives the desired response. Run the test to see that it fails. 
        (If it succeeds, you did something wrong!)
    2. Write the code for the endpoint, and re-run the test.
    3. Revise the test until it passes. Make sure you are testing that the route gives the correct data!
    4. Write more unit tests for errors or edge cases.
    5. Manually test your code with Postman to see if everything works from the user’s perspective.
    6. Repeat!


## My Approach For This Project
1. First test for indexing
2. Implement base index rendering
3. Test for authentication
    - log in without account
    - sign up
    - log in
    - log out
4. Test and Create User model
5. Implement routes for authentication
6. Test and Crete Quiz model
7. Test routing for quiz `CREATE`, `READ`, `UPDATE`, and `DELETE`
8. Implement quiz routes
9. Test routing for quiz/question `CREATE`, `READ`, `UPDATE`, and `DELETE`
10. Implement question routing
11. Associate users to quizzes taken and test



### [20 Benefits of Test-Driven Development](https://dzone.com/articles/20-benefits-of-test-driven-development)
1. Writing the tests first requires you to really consider what do you want from the code.
2. You receive fast feedback.
3. TDD creates a detailed specification.
4. TDD reduces time spent on rework.
5. You spend less time in the debugger.
6. You are able to identify the errors and problems quickly.
7. TDD tells you whether your last change (or refactoring) broke previously working code.
8. TDD allows the design to evolve and adapt to your changing understanding of the problem.
9. TDD forces the radical simplification of the code. You will only write code in response to the requirements of the tests.
10. You're forced to write small classes focused on one thing.
11. TDD creates SOLID code.
12. TDD supports a clean interface.
13. TDD creates code that is maintainable, flexible, and easily extensible.
14. The resulting unit tests are simple and act as documentation for the code. Since TDD use cases are written as tests, other programmers can view the tests as usage examples of how the code is intended to work.
15. The development time to market is shorter.
16. The programmer’s productivity is increased.
17. Development costs are cut.
18. Quality is improved.
19. Bugs are reduced.
20. TDD gives programmers the confidence to change the larger architecture of an application when adding new functionalities. Without the flexibility of TDD, developers frequently add new functionality by virtually bolting it to the existing application without true integration, which can cause problems down the road.