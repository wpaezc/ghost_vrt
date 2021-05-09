Feature: User management
  @user1 @web
  Scenario: Creates an invitation with bad email
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "Staff" page
    When I click on new "user" button
    When I enter "BAd-Email" as email
    Then I should see "Invalid Email" error

