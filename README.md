# TeraApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.


# About App

Project is about user Management Dashboard where you can rule users info. A user can have only two roles: User and Admin. 

For login as ADMIN please use - Emai: admin@admin Password:Admin123 

- The project includes an authorization/registration page that has its own validations and obligation to fill in mandatory fields. Angular reactive forms is used for user authentication/registration.

1) The data of the registered user goes to the JSON server, whose role is necessarily USER.
2) You usually use an email and a passcode for authorization.
3) After successful authentication, you will automatically go to the user list page where all users and their information are located.
4) Due to the size of the data, pagination is used, where a list of users of a particular page comes when you go to each page (Lazy http request)
5) Angular Router is used to navigate between pages.which is also loaded as a lazy load.
6) To manage asynchronous information, the RxJs library is used.
7) Guards are also used. which ensures user rights. For example if you don't have admin assigned you won't be able to delete or edit a user.
8) It is not possible to create a user with the role of admin through registration. For this, the admin email and password are prepared in advance. Email: admin@admin and Password: Admin123
9) Angular HttpClient is used to interact with the back server. (JSON Server)
10) For every successful or unsuccessful operation, a corresponding note is displayed, so that the customer can understand whether he made a mistake or not, or vice versa.




## Install App 

1) To install Angular application, please run the following command: npm i
2) To install Jason Server please run the following command: npm i json-server



## Running App

1) To Run Angular application, please run the following command: ng s
2) To Run Jason Server please run the following command: $ npx json-server --watch db.json



