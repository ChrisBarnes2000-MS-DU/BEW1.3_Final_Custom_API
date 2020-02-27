# Proposal

[Back](../)

While working on other projects, I have found I want to have a fun quiz aspect I can have my users go through to earn different things associated to that project.

For this reason and unable to figure out how to implement it solely into my other projects I figure I can make an api for it to be able to import/utilize it in multiple projects or locations.

This will be stored as nested routes, as topic/:name/quiz/:id/question/:id
    
    i.e topic/:Cities/quiz/:San-Francisco/question/:1-10

When working with this API developers shall have the ability to `CREATE`, `READ`, `UPDATE`, and `DELETE` a quiz in from the API. Allowing their users to the endpoints: `GET` & `POST` and the developers to `PUT` & `DELETE`.


## Schedule

* **Day 1**: Brainstorm ideas for your API.
    Quiz API
* **Day 2**: Write API proposal.
    Your looking at it
* **Day 5**: Write [API tests](../test).
* **Day 6**: Continue writing API tests.
* **Day 8**: Write Authentication and Authorization tests.
* **Day 10**: Implement API.
* **Day 13**: Implement API.
* **Day 15**: Documentation and deployment.


### Phases and Deadlines

- **Phase 0** Assignment Day - Class Date Wed, Feb 5, 2020

- **Phase 1**: Proposal - **Due Date Wed, Feb 12 @ 11:59pm**.
    * **Deliverables**:
        * Public GitHub Repository Link
        * `README.md` in the repo with proposal.
    * **Approval**: Instructor will approve projects by **start of class on Wed, Feb 19**.
- **Phase 2**: Test First Approach - **Due Date Mon, Feb 24 @ 11:59pm**.
    * **Deliverables**:
        * `/tests/` folder in repo containing TDD code and strategy.
    * **Code Review 1**: Instructor will review TDD strategy and make notes in each student repo. This will be complete by the **start of class on Mon, Mar 2**.
- **Phase 3**: Final Deliverable - **Due Date Wed, Mar 4 @ 11:59pm**.
    * **Deliverables**:
        * Link to deployed API brochure site.
    * **Code Review 2**: Students receive after class.
