# User Instructions

When working with this API developers shall have the ability to `CREATE`, `READ`, `UPDATE`, and `DELETE`, Topics, Quizzes, Questions with answers.

This will allow their users to the endpoints: `GET` & `POST` and the developers to `PUT` & `DELETE`.

This form will send its data to a path that resolves to the /quizzes/create action. The path for this link will follow the standard nested RESTful convention 
```
/<<PARENT RESOURCE PLURAL>>/<<PARENT ID>>/<<MIDDLE RESOURCE PLURAL>>/<<MIDDLE ID>>/<<CHILD PLURAL>>/<<CHILD ID>>
i.e topics/:Cities/quizzes/:San-Francisco/questions/:1-10
```










# Default Endpoints

## Get Index Page
Send a request to `/` to render the index and get the following response:

    Welcome to my Custom API for Quizzes
        This is just the index


## Get About Page
Send a request to `/about` to get the following response:

```json
{
  message: 'This was design to be a functioning Quiz API!'
}
```










# Topic Endpoints

## Get All Topics

Send a GET request to `/topics/` to get a list of all topics. The data should look like:

```json
[
  {
    _id: 5e5ae438df263c3123996d59,
    title: 'Cities',
    quizzes: [],
  }
  {
    _id: ,
    title: 'Board-Games',
    quizzes: [],
  }
]
```

## Get a Single topic

Send a GET request to `/topics/:title` to get the details of a specific topic. The data should look like:

```json
{
    _id: 5e5ae438df263c3123996d59,
    title: 'Cities',
    quizzes: [],
}
```

## Create a New Topic

Send a POST request to `/topics/new` with the following information:

```
title: string,
```

## Update a Topic

Send a PUT request to `/topics/` with the following information:

```
title: string,
```

## Delete a Topic

Send a DELETE request to `/topics/:title`










# Quiz Endpoints

## Get All Quizzes

Send a GET request to `/quizzes/` to get a list of all quizzes. The data should look like:

```json
[
  {
    _id: 5e5b0205410f30432c22e257,
    name: 'San-Francisco',
    questions: ['How Many Boroughs Does SF Have?', 'What State is SF in?'],
  }
  {
    _id: ,
    name: 'Monopoly',
    questions: [],
  }
]
```

## Get a Single Quiz

Send a GET request to `/quizzes/:name` to get the details of a specific quiz. The data should look like:

```json
{
    _id: 5e5b0205410f30432c22e257,
    name: 'San-Francisco',
    questions: ['How Many Boroughs Does SF Have?', 'What State is SF in?'],
}
```

## Create a New Quiz

Send a POST request to `/quizzes/new` with the following information:

```
name: string,
```

## Update a Quiz

Send a PUT request to `/quizzes/:name` with the following information:

```
name: string,
```

## Delete a Quiz

Send a DELETE request to `/quizzes/:name`










# Questions Endpoints

## Get All Questions

Send a GET request to `/questions/` to get a list of all quizzes. The data should look like:

```json
[
  {
    myid: 1
    question: 'How Many Boroughs Does SF Have?',
    answers: [5, 7, 30, 37],
    answers_given: [],
    corrects: [37],
  }
  {
    myid: 1
    question: 'What State is SF in?',
    answers: ['Washington', 'California', 'New York'],
    answers_given: [],
    corrects: ['California'],
  }
  {
    myid: 3,
    title: 'How Many Properties Does The Monopoly Game Have?',
    answers: [2, 4, 22, 28, 40],
    answers_given: [],
    corrects: [28],
  }
]
```

## Get a Single Question

Send a GET request to `/questions/ID_GOES_HERE` to get the details of a specific quiz. The data should look like:

```json
{
    myid: 1
    question: 'How Many Boroughs Does SF Have?',
    answers: [5, 7, 30, 37],
    answers_given: [],
    corrects: [37],
}
```

## Create a New Question

Send a POST request to `/questions/` with the following information:

```
question: string,
answers: [],
corrects: [],
```

## Update a Question

Send a PUT request to `/questions/ID_GOES_HERE`` with the following information:

```
question: string,
answers: [],
corrects: [],
```

## Delete a Question

Send a DELETE request to `/questions/ID_GOES_HERE`
