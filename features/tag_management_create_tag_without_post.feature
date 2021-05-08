#Feature: Tag management
#  @user1 @web
#  Scenario: Create a tag without a post
#    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
#    When I navigate to "Tags" page
#    When I click on new "Tag" button
#    When I fill tag form with title "$name_1" and description "$name_2"
#    When I click save button 
#    Then I should NOT see tag with "$$name_1" in "<GHOST_URL>"
