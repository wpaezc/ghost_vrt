#Feature: Page management
#  @user1 @web
#  Scenario: Creates page with published state
#    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
#    When I navigate to "Pages" page
#    When I click on new "Page" button
#    When I fill editor title with "$name_1"
#    When I publish "now"
#    Then I get url from success alert and see "$$name_1" on page
