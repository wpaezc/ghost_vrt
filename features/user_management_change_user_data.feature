Feature: User management
  @user1 @web
  Scenario: Changes my profile
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "my profile" page
    When I change name to "$name_1"
    Then I should see "$$name_1" on navigation footer
