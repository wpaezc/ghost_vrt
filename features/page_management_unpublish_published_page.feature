Feature: Past management
  @user1 @web
  Scenario: Unpublish a published past 
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "Pages" page
    When I click on new "Page" button
    When I fill editor title with "$name_1"
    When I publish "now"
    When I unpublish
    Then I should NOT see "$$name_1" in "<GHOST_URL>"
