# README

# Requirements

Inorder to use this app you need to make sure you have the requirements installed from the
requirements folder. Furthermore, if needed, use pip and npm commands:

```
pip install -r requirements.txt
```

```
npm install
```

Inorder to run the app use this command in the terminal

```
python app.py
```

1. Follow this link https://github.com/newcastleuniversity-computing/CSC2033_Team36_23-24 download the file by clicking **_code_** and **_download zip_**.
2. Make sure all the requirements are installed.
3. Use the terminal to input the arguments in the command line arguments section.
4. depending on which version of python you're using, write `python` for python version 2 or `python3`
   for python version 3 at the beginning of the command line arguments.

   [Section done by Aaron Cunningham]

## Python:

Variable Names: camelCase
File names: camelCase
Object Names: camelCase
Constant Names: ALLCAPS
Environment Variable Names: SCREAMING_SNAKE_CASE
Function Names: snake_case

Indentation: Tabs
Space after Commas: 1
Spacing Between Empty Blocks: 1 line before and after.
Spacing Between Functions/Classes: 2
Line Max. Character Length: 79
Function Comments: Comments at beginning of a function stating its purpose.
Binary Operator Line Break: Before

Imports: Each import statement is on a separate line, excluding “from” imports
Import Level: Import at the lowest level available.

Quotes Used: “””Double”””
Compound Statements: Put each statement on a separate line.

Comment Etiquette: Each comment should be a complete sentence, including capitals.
In-line Comments: Put after line if short, Put before line if the line would exceed 79 chars.

Please refer to the official PEP 8 style guide for further clarification.

[Section done by James Whitley, Igor Palka, Aaron Cunningham, Felix Wong, Lauren Harbige]

## Code of Conduct:

Online, use channels of communication such as the WhatsApp group or email.
If you cannot make it to a session, please let the group know.
Don’t violate the law.
Check inbox/WhatsApp at minimum once per day. Aim to respond within 24 hours if invited to.
You may use appropriate emoticons, such as thumbs up, to indicate your awareness and agreement to a message.
Be polite and trustworthy.
Give a notice of 12 hours if you are unable to come. If you are ill, this does not apply.
If you do not arrive within approximately 15 minutes of the start date of a session, communicate via online means to give an estimate of your arrival.
Maintain security within the program, including security keys used for encryption.
If team members have ideas for further guidelines or wish to change pre-existing guidelines, this may be changed within team meetings through group discussion.
develop on the branch dedicated to the feature you are implementing NOT the main branch.
DO NOT push any code to the main branch of the project if it does not run.

[Section done by James Whitley, Igor Palka, Aaron Cunningham, Felix Wong, Lauren Harbige]

## Testing Documentation:

To properly test each feature of our program we created a series of unit tests to check if functions in our code worked as we expected. As our code uses both JavaScript and python we used both the PyTest and Jest frameworks to ensure both parts of our program were properly tested. These tests are run automatically in our continuous integration pipeline using Github actions to ensure our development team can quickly find any errors when commiting code.

Most of our unit tests are used to ensure a function returns a correct for a given input, For example 'test_most_eco_friendly_result' in the PyTest table checks if the function returns the correct emissions values for 3 hardcoded users. We also include tests to check if an item is displayed within our UI properly such as 'test toggleEmissions function' in the Jest table which checks if the emissions graph is currently displayed.

Finally we include tests for boundary data to ensure our edge cases work correctly such as in 'test calculateTrainCo2 return boundary' and  erroneous data to check if the correct error messages are displayed for example in 'test calculateTrainCo2 negative length' to ensure that our program does not have unexpected behaviour and breaks when given invalid data.

[Section done by James Whitley]

### Unit Testing (PyTest)

|Test Name|Test Type|Test Description|Test Results|
|---|---|---|---|
|test_user_has_no_id|Erroneous|This is a test to see if the user's id is null, as this is allocated by SQLAlchemy|Success|
|test_user_has_allocated_attributes|Normal|This is a test to see that the init works.|Success|
|test_user_ban_status|Boundary|This is a test to see the user's status at the start.|Success|
|test_user_is_banned|Normal|A test to see if the banning function works.|Success|
|test_user_password_is_changed|Normal|A test to see that the password is changed in the database by the function|Success|
|test_add_user_to_database|Normal|This test checks if a user can be dirctly added to the mysql database|Success|
|test_add_journey_to_database|Normal|This test checks if a journey can be dirctly added to the mysql database|Success|
|test_total_mode_of_transport_emissions|Normal|This test checks if the 'total_mode_of_transport_emmisions' function  returns a correct list of emissions values for each mode of transport a user has used|Success|
|test_total_consumption_result|Normal|This test checks if the 'total_consumption_result' function calculates correct values for the total emmisions for 3 diffferent users|Success|
|test_total_emissions_by_month|Normal & Boundary|This test checks if the 'total_emissions_by_month' function calculates a list of correct values a user has in each month of the year|Success|
|test_calc_total_emissions|Normal|This test checks if the 'calc_total_emissions' function calculates and adds a users total emissions for this month to the database|Success|
|test_leaderboard|Normal|This test checks if the 'leaderboard' function calculates and returns an ordered list of dictionaries containing the top 3 users with the lowest emissions this month |Success|
|test_most_eco_friendly_result|Normal|This test checks if the 'most_eco_friendly_result' function returns the journey with the lowest emissions for 3 different users|Success|
|test_least_eco_friendly_result|Normal|This test checks if the 'least_eco_friendly_result' function returns the journey with the highest emissions for 3 different users|Success|

[Section done by James Whitley]


### Unit Testing (Jest)

|Test Name|Test Type|Test Description|Test Results|
|---|---|---|---|
| test calculateTrainCo2 return normal|normal|This test checks if the calculateTrainCo2 function returns the correct emission value given a normal value  (100) for the journey length|Success|
| test calculateTrainCo2 return boundary |boundary|This test checks if the calculateTrainCo2 function returns the correct emission value given a boundary case (0) for the journey length|Success|
| test calculateTrainCo2 negative length|erroneous|This test checks if the calculateTrainCo2 function returns the correct error message "Invalid distance input, distance should be greater than 0" when using a negative length for the distance travelled|Success|
| test calculateTrainCo2 non int length|erroneous|This test checks if the calculateTrainCo2 function returns the correct error message "Invalid distance, distance should be a number" when using a string data type for the distance travelled|Success|
| test calculateBusCo2 'local bus' return normal |normal|This test checks if the calculateBusCo2 function returns the correct emission value for a 'local bus 'given a normal value (100) for the journey length|Success|
| test calculateBusCo2 'local bus' return boundary |boundary|This test checks if the calculateBusCo2 function returns the correct emission value for a 'local bus'  given a boundary case (0) for the journey length|Success|
| test calculateBusCo2 'coach' return normal |normal|This test checks if the calculateBusCo2 function returns the correct emission value for a 'coach'given a normal value (100) for the journey length|Success|
| test calculateBusCo2 'coach' return boundary |boundary|This test checks if the calculateBusCo2 function returns the correct emission value for a 'coach  given a boundary case (0) for the journey length|Success|
| test calculateBusCo2 negative length|erroneous|This test checks if the calculateBusCo2 function returns the correct error message "Invalid distance input, distance should be greater than 0" when using a negative length for the distance travelled|Success|
| test calculateBusCo2 non int length|erroneous|This test checks if the calculateBusCo2 function returns the correct error message "Invalid distance, distance should be a number" when using a string data type for the distance travelled|Success|
| test calculateBusCo2 invalid bus type string|erroneous|This test checks if the calculateBusCo2 function returns the correct error message "Invalid mode of transit." when inputting a string other than 'bus' or 'coach' for the bus type|Success|
| test calculateBusCo2 int fuel type |erroneous|This test checks if the calculateBusCo2 function returns the correct error message "Invalid fuel type, should be Petrol or Diesel" when inputting an integer for the fuel type|Success|
| test carEmissions 'petrol' return normal|normal|This test checks if the carEmissions function returns the correct emission value when using the 'petrol' fuel type given a normal value (100) for the journey length|Success|
| test carEmissions 'petrol' return boundary|boundary|This test checks if the carEmissions function returns the correct emission value when using the 'petrol' fuel type given a boundary value (0) for the journey length|Success|
| test carEmissions 'diesel' return normal|normal|This test checks if the carEmissions function returns the correct emission value when using the 'diesel' fuel type given a normal value (100) for the journey length|Success|
| test carEmissions 'diesel' return boundary|boundary|This test checks if the carEmissions function returns the correct emission value when using the 'diesel' fuel type given a boundary value (0) for the journey length|Success|
| test carEmissions negative length|erroneous|This test checks if the carEmissions function returns the correct error message "Invalid distance input, distance should be greater than 0" when using a negative length for the distance travelled|Success|
| test carEmissions non int length|erroneous|This test checks if the carEmissions function returns the correct error message "Invalid distance, distance should be a number" when using a string data type for the distance travelled|Success|
| test carEmissions negative mpg|erroneous|This test checks if the carEmissions function returns the correct error message "Invalid mpg input, mpg should be greater than 0" when using a negative length for the miles per gallon of the car|Success|
| test carEmissions non int mpg|erroneous|This test checks if the carEmissions function returns the correct error message "Invalid mpg, mpg should be a number" when using a string data type for the miles per gallon of the car|Success|
| test carEmissions invalid string fuel type|erroneous|This test checks if the carEmissions function returns the correct error message "Invalid fuel type, should be Petrol or Diesel" when inputting a string other than 'petrol' or 'diesel' for the fuel type|Success|
| test carEmissions non string fuel type |erroneous|This test checks if the carEmissions function returns the correct error message "Invalid fuel type, should be Petrol or Diesel" when inputting an integer for the fuel type|Success|
| test motorbikeEmissions 'under 125cc' return normal|normal|This test checks if the motorbikeEmissions function returns the correct emission value for a bike under 125cc given a normal value (100) for the journey length|Success|
| test motorbikeEmissions 'under 125cc' return boundary|boundary|This test checks if the motorbikeEmissions function returns the correct emission value for a bike under 125cc  given a boundary value (0) for the journey length|Success|
| test motorbikeEmissions  '125cc-500cc' return normal|normal|This test checks if the motorbikeEmissions function returns the correct emission value for a bike from 125cc-500cc given a normal value (100) for the journey length|Success|
| test motorbikeEmissions 'under 125cc' return boundary|boundary|This test checks if the motorbikeEmissions function returns the correct emission value for a bike from'125cc-500cc'  given a boundary value (0) for the journey length|Success|
| test motorbikeEmissions 'over 500cc' return normal|normal|This test checks if the motorbikeEmissions function returns the correct emission value for a bike over 500cc given a normal value (100) for the journey length|Success|
| test motorbikeEmissions 'over 500cc' return boundary|boundary|This test checks if the motorbikeEmissions function returns the correct emission value for a bike over 500cc  given a boundary value (0) for the journey length|Success|
| test motorbikeEmissions negative length|erroneous|This test checks if the motorbikeEmissions function returns the correct error message "Invalid distance input, distance should be greater than 0" when using a negative length for the distance travelled|Success|
| test motorbikeEmissions non int length|erroneous|This test checks if the motorbikeEmissions function returns the correct error message "Invalid distance, distance should be a number" when using a string data type for the distance travelled|Success|
| test motorbikeEmissions invalid string fuel type|erroneous|This test checks if the motorbikeEmissions function returns the correct error message "Invalid engine size for motorbike. Should be Under 125cc, 125cc to 500cc, or Over 500cc" when inputting a string other than 'Under 125cc', 'Over 500cc' or '125cc to 500cc' for the fuel type|Success|
| test motorbikeEmissions non string fuel type |erroneous|This test checks if the motorbikeEmissions function returns the correct error message "Invalid engine size for motorbike. Should be Under 125cc, 125cc to 500cc, or Over 500cc" when inputting an integer for the fuel type|Success|
| test milesToKm return |normal|This test checks if the milesToKm function returns the correct number of kilometers when given a normal value (100) for input number of miles|Success|
| test milesToKm return |boundary|This test checks if the milesToKm function returns the correct number of kilometers when given a normal value (0) for input number of miles|Success|
| test calculateCo2Flight 'first class' return |normal|This test checks if the calculateCo2Flight function returns the correct emission value for a plane trip in first class  given a normal value (10000) for the journey length|Success|
| test calculateCo2Flight 'first class' return |boundary|This test checks if the calculateCo2Flight function returns the correct emission value for a plane trip in first class  given a boundary value (0) for the journey length|Success|
| test calculateCo2Flight 'premium class' return |normal|This test checks if the calculateCo2Flight function returns the correct emission value for a plane trip in premium class  given a normal value (10000) for the journey length|Success|
| test calculateCo2Flight 'premium class' return |boundary|This test checks if the calculateCo2Flight function returns the correct emission value for a plane trip in premium class given a boundary value (0) for the journey length|Success|
| test calculateCo2Flight invalid string fuel type|erroneous|This test checks if the calculateCo2Flight function returns the correct error message "Invalid fuel type, should be first or premium class" when inputting a string other than 'first class' or 'premium class' for the fuel type|Success|
| test calculateCo2Flight non string fuel type |erroneous|This test checks if the calculateCo2Flight function returns the correct error message "Invalid fuel type, should be first or premium class" when inputting an integer for the fuel type|Success|
| test toggleEmissions function|Normal|This test checks if the toggleEmissions function correctly switches the UI from the transport graph to the emissions graph|Success|
| test toggleTransport function|Normal|This test checks if the toggleTransport function correctly switches the UI from the emissions  graph to the transport graph|Success|
| test openDeletePrompt function|Normal|This test checks if openDeletePrompt function correctly displays the delete prompt on the UI|Success|
| test closeDeletePrompt function|Normal|This test checks if closeDeletePrompt function correctly closes the delete prompt on the UI when it is open|Success|
    
[Section done by James Whitley]
    

### Exploratory Testing

Exploratory testing refers to using the app with any specific aim or using specific knowledge about the app to explore the program. This test is important for provide practical in-app user experience and feedback for improving user experience, while also having the potential to discover bugs that cannot be found when using the app as intended. In this test, we have included mainly two test methods, being to use the app without any prior technical knowledge of the app, and to use it with malicious intent such as intending to confuse the calculator with locations impossible to reach.

|              Test Name              |                               Test Description                                | Test Results |
| :---------------------------------: | :---------------------------------------------------------------------------: | :----------: |
| test the calculator user experience |                 Test if the calculator function runs smoothly                 |   success    |
|        test calculator page         |           Test if the calculator rejects places that does not exist           |   success    |
|        test the error pages         |             Test if the error pages works on all pages of the app             |   success    |
|    test calculator practicality     |      Test if the calculator rejects places that are impossible to reach       |   success    |
|      test calculator language       | Test if the calculator accepts places using 2 different language (eng and jp) |   success    |

The examples of exploratory testing listed above are only a few of the cases in which we used exploratory testing. This is because we used exploratory testing throughout the development process of the program, often executing the app.py in order to see if the program compiled properly and to see if the functionality that had been developed, worked as intended.

[Section done by Felix Wong and Igor Palka]

### Usability Testing

Usability testing is a testing methodology in which the functionality of the application is tested by its users. In the case of our appliction, usability testing was performed by Igor Palka, one of the programmers of the system. Each usability test was structured around a given functional requirement. Each description of each test indicates how it was conducted and which functional requirement it demonstrates.

| Test Name | Test Description | Test Results |
|:---------:|:----------------:|:------------:|
| test if emissions transport modes breakdown works| Check if FR1 has been met: "A known user can display the breakdown of their C02 emissions for each mode of transport in a given month". Done by checking account page.|Success|
| test if emissions month breakdown works|Check if FR2 has been met: "A known user can display a graph comparing their C02 emissions for each month in a year." This is done by checking the account page.|Success|
| test if a known user can enter a journey in the calculator tab|Fulfills FR3. This is done by using the calculator page and filling in the form fields.|Success|
| test if admins can ban a user|Fulfils FR5. This is done by banning the user with id 85, and checking if it is logged in.|Success|
| test if an admin can add another admin|Fulfils FR6. Done by using the admin register function on the admin page, and then logging into that account.|Success|
| test if an admin can view security logs|Fulfils FR7. Done by using the functionality within the admin page.|Success|
| test if an admin can view graph of users over time|Fulfils FR9. Done by accessing admin page.|Success|
| test if a known user can select mode of transport|Fulfils FR10. Done by clicking each link on calculator page.|Success|
| test if a user can select a motorbike's CC category|Fulfils FR12 and FR13. Done by clicking on each icon corresponding to each category.|Success|
| test if a user can select fuel type|Fulfils FR13. For each mode of transport, the icon can be filled in.|Success|
| test if a user can select whether a journey is roundtrip or not|Fulfils FR14. This can be done by clicking on the icons at the top of any transport screen in the calculator page.|Success|
| test if the route is indicated on the Google Maps API element|Fulfils FR15. Done as part of calculation. |Success|
| test if journey form fields are valid|Fulfils FR16. Calculate button is inactive when the fields are not valid. If either of the destinations are incorrect, it returns an invalid message.|Success|
| test if journey data is indicated|Fulfils FR17. Calculate the path through Google Maps API.|Success|
| test if a journey is added to the database|Fulfils FR18. This is done automatically when a calculation is finished. Can be verified by changes in |Success|
| test users can log in through login page|Fulfils FR19. This tests the capabilities of the backend and frontend, and is verified by accessing the account page.|Success|
| test that anonymous users can register through a form|Fulfils FR20. This is verified by filling in the register form, using the login form and accessing the account page.|Success|
| test if the home page leader board works properly |Fulfils FR21. check if increasing my emission decreases my rank | success |
| test that the user can log out|Fulfils FR22. This was determined by the user's accessibility to the account page. |Success|
| test if delete account works properly |Fulfils FR23. Check if deleted account can still log in or register | success |
| test if change password works properly |Fulfils FR24. Check if new passwords can log in while the old ones cannot | success |
| test of multi-factor authentication |Fulfils FR25. The Recaptcha is accessible on the login page, and a successful login indicates its effect.|Success|
| test confirmation message|Fulfils FR26. This is indicated by using the calculation function - it shows up at the top after a calculation.|Success|
| test display of highest, smallest and overall emissions|Fulfils FR27. This is displayed and accessed on the account page.|Success|

In the case of FR4, this was not met by the current project as there was not enough time, and the requirement itself was of low priority.
FR8 was not fulfilled, as the usability testing revealed that users who were banned could be deleted, thus allowing them to re-register, thus evading any bans they may have accrued.
FR11 was also not fulfilled due to the difficulties in measuring a ferry via the google maps API. This requirement and the feature for it was ultimately cut as a result.
FR28 is not included as the capability of the other tests succeeding is directly dependent on it.

[Section done by Felix Wong and Igor Palka]

### Security Testing

Our group completed some basic security testing to check that the app could safely store data about users and  maintain the integrity of our role based access control system. We checked that user Passwords were hasshed when stored within the database so couldn't be easily stolen and that simple attacks such as 'SQL injections' and '../' attacks would not work on our system.

| Test Name                      | Test Type | Test Description                                                                                             | Test Results |
| ------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------ | ------------ |
| Register Fields: SQL Injection | White Box | We will test the validation systems on the Register page. The following query will be used: DROP TABLE users | Success      |
| Page Access: Forbidden pages for Anonymous Users | White Box | We will test that an Anonymous User can't access certain pages: Calculator, Admin, Logs, Admin register, Change password, Account pages | Success      |
| Page Access: Forbidden pages for Authenticated Users | White Box | We will test that an Authenticated User can't access certain pages: Admin, Logs, Admin register, Login, Register pages | Success      |
| Page Access: Forbidden pages for Admins | White Box | We will test that an Admin can't access certain pages: Login, Register pages | Success      |
| Page Access: Unkown Page | White Box | We will test that a 404 error page will render if an incorrect route is in the URL| Success      |
| Logging Results: Logging page & Logging file| White Box | We will test that logs are successfully logging for: Sign-in, Sign-out, Registration, New journey(Include they transport type), Invalid sign-in attempts| Success      |
|Register reCAPTCHA| Black Box |This test checked if sytem displayed a CAPTCHA after 10 failed attempts  to login   | Success      |
|Password hashing| Black Box |This test checked if user passwords were hashed when stored in the database by directly accessing it| Success |

[Section done by James Whitley and Aaron Cunningham]