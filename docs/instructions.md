# User Instructions

When working with this API developers shall have the ability to `CREATE`, `READ`, `UPDATE`, and `DELETE`, Topics, Quizzes, Questions with answers.

This will allow their users to the endpoints: `GET` & `POST` and the developers to `PUT` & `DELETE`.

This will be stored as nested routes, as topic/:title/quiz/:name/question/:id
    
    i.e topic/:Cities/quiz/:San-Francisco/question/:1-10



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
    _id: 1,
    title: 'Cities',
    quizzes: [],
  }
  {
    _id: 2,
    title: 'Board-Games',
    quizzes: [],
  }
]
```

## Get a Single topic

Send a GET request to `/topics/ID_GOES_HERE` to get the details of a specific topic. The data should look like:

```json
{
    _id: 1
    title: 'Cities',
    quizzes: [],
}
```

## Create a New Topic

Send a POST request to `/topics/` with the following information:

```
title: string,
```

## Update a Topic

Send a PUT request to `/topics/` with the following information:

```
title: string,
```

## Delete a Topic

Send a DELETE request to `/topics/ID_GOES_HERE`



# Quiz Endpoints

## Get All Quizzes

Send a GET request to `/quizzes/` to get a list of all quizzes. The data should look like:

```json
[
  {
    _id: 1,
    name: 'San-Francisco',
    questions: ['How Many Boroughs Does SF Have?', 'What State is SF in?'],
  }
  {
    _id: 2,
    name: 'Monopoly',
    questions: [],
  }
]
```

## Get a Single Quiz

Send a GET request to `/quizzes/ID_GOES_HERE` to get the details of a specific quiz. The data should look like:

```json
{
    _id: 1
    name: 'San-Francisco',
    questions: ['How Many Boroughs Does SF Have?', 'What State is SF in?'],
}
```

## Create a New Quiz

Send a POST request to `/quizzes/` with the following information:

```
name: string,
```

## Update a Quiz

Send a PUT request to `/quizzes/` with the following information:

```
name: string,
```

## Delete a Quiz

Send a DELETE request to `/quizzes/ID_GOES_HERE`


# Questions Endpoints

## Get All Questions

Send a GET request to `/questions/` to get a list of all quizzes. The data should look like:

```json
[
  {
    _id: 1
    question: 'How Many Boroughs Does SF Have?',
    answers: [5, 7, 30, 37],
    corrects: [37],
  }
  {
    _id: 1
    question: 'What State is SF in?',
    answers: ['Washington', 'California', 'New York'],
    corrects: ['California'],
  }
  {
    _id: 3,
    title: 'How Many Properties Does The Monopoly Game Have?',
    answers: [2, 4, 22, 28, 40],
    corrects: [28],
  }
]
```

## Get a Single Question

Send a GET request to `/questions/ID_GOES_HERE` to get the details of a specific quiz. The data should look like:

```json
{
    _id: 1
    question: 'How Many Boroughs Does SF Have?',
    answers: [5, 7, 30, 37],
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

Send a PUT request to `/questions/` with the following information:

```
question: string,
answers: [],
corrects: [],
```

## Delete a Question

Send a DELETE request to `/questions/ID_GOES_HERE`
