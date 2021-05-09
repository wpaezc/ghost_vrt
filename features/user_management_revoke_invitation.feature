Feature: User management
  @user1 @web
  Scenario: Revokes invitation to user
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "Staff" page
    When I click on new "user" button
    When I enter "$email_1" as email
    When I revoke invitation for "$$email_1"
    Then I should NOT see invitation for "$$email_1"
