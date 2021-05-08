#Feature: Tag management
#  @user1 @web
#  Scenario: Change slug update engine result
#    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
#    When I navigate to "Tags" page
#    When I click on new "Tag" button
#    When I fill tag form with title "$name_1" and description "$name_2"
#    When I update slug with "$name_3"
#    Then I should see slug tag engine "<GHOST_URL>" updated with "$$name_3"
