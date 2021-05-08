#Feature: Post management
#  @user1 @web
#  Scenario: Creates post with published date on future
#    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
#    When I navigate to "Posts" page
#    When I click on new "Post" button
#    When I fill editor title with "$name_1"
#    When I publish "future"
#    When I return to "Posts" page
#    Then I should see item listed with "$$name_1" and "Scheduled" state
#    Then I should NOT see "$$name_1" in "<GHOST_URL>"
