#Feature: Tag management
#  @user1 @web
#  Scenario: Change tag meta data
#    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
#    When I navigate to "Tags" page
#    When I click on new "Tag" button
#    When I fill tag form with title "$name_1" and description "$name_2"
#    When I fill tag form with meta title "$name_3" and meta description "$name_4"
#    Then I should see meta tag "title" engine in "<GHOST_URL>" updated with "$$name_3"
#    Then I should see meta tag "description" engine in "<GHOST_URL>" updated with "$$name_4"
