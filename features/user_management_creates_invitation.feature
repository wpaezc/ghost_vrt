Feature: User management
  @user1 @web
  Scenario: Creates an invitation to new user
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "Staff" page
    When I click on new "user" button
    When I enter "$email_1" as email
    Then I should see invitation for "$$email_1"
