Feature: Page management
  @user1 @web
  Scenario: Creates page with published date on future
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "Pages" page
    When I click on new "Page" button
    When I fill editor title with "$name_1"
    When I publish "future"
    When I return to "Pages" page
    Then I should see item listed with "$$name_1" and "Scheduled" state
