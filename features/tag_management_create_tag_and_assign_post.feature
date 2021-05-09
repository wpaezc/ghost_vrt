Feature: Tag management
  @user1 @web
  Scenario: Create a tag and assign post
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "Tags" page
    When I click on new "Tag" button
    When I fill tag form with title "$name_1" and description "$name_2"
    When I click save button 
    When I navigate to "Posts" page
    When I click on new "Post" button
    When I fill editor title with "$name_3"
    When I change tag to "$$name_1"
    When I publish "now"
    Then I should see tag with "$$name_1" in "<GHOST_URL>"
