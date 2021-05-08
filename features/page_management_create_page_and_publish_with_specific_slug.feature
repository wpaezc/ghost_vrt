#Feature: Page management
#  @user1 @web
#  Scenario: Creates page and publish with specific slug
#    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
#    When I navigate to "Pages" page
#    When I click on new "Page" button
#    When I fill editor title with "$name_1"
#    When I change slug to "$name_2"
#    When I publish "now"
#    Then I should see "$$name_2" slug on url alert
