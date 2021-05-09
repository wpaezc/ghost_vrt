Feature: Tag management
  @user1 @web
  Scenario: Create a tag and remove it
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "Tags" page
    When I click on new "Tag" button
    When I fill tag form with title "$name_1" and description "$name_2"
    When I click save button 
    When I click delete button 
    Then I should see confirmation modal
