Feature: User management
  @user1 @web
  Scenario: Invalid password update
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "my profile" page
    When I change password with "bad-password@#2"
    Then I should see error message "Your password is incorrect"
