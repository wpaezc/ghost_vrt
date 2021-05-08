require 'byebug'

if ENV["ADB_DEVICE_ARG"].nil?
  require 'kraken-mobile/steps/web/kraken_steps'

  Given(/^I am a signed user in "([^\"]*)" with "([^\"]*)" and "([^\"]*)"$/) do |ghost_url, user, password|
    @driver.navigate.to "#{ghost_url}/ghost/#/signin"
    sleep 1
    @driver.find_element(:name, 'identification').send_keys(user)
    @driver.find_element(:name, 'password').send_keys(password)
    @driver.find_element(:css, 'button.login').click
    sleep 1
  end

  When(/^I navigate to "([^\"]*)" page$/) do |resource|
    @driver.find_element(:css, "a[href=\"#/#{resource.downcase}/\"]").click
    sleep 1
  end

  When(/^I click on new "([^\"]*)" button$/) do |resource|
    @driver.find_element(:css, "a[href=\"#/editor/#{resource.downcase}/\"]").click
    sleep 1
  end

  When(/^I fill editor title with "([^\"]*)"$/) do |title|
    @driver.find_element(:css, "textarea.gh-editor-title").send_keys(title)
    #This triggers save
    @driver.find_element(:css, "div.f-supersmall").click
    sleep 2
  end

  When(/^I return to "([^\"]*)" page$/) do |resource|
    #This returns index
    @driver.find_element(:css, "a[href=\"#/#{resource.downcase}/\"].blue").click
    sleep 1
  end

  When(/^I publish "([^\"]*)"$/) do |resource|
    #This returns index
    @driver.find_element(:css, "div.gh-publishmenu-trigger").click
    sleep 1
    if resource == 'future'
      @driver.find_element(:css, "div.gh-date-time-picker-date input").click
      @driver.find_element(:css, "div.gh-date-time-picker-date input").clear()
      @driver.find_element(:css, "div.gh-date-time-picker-date input").send_keys('2040-12-12')
      @driver.find_element(:css, "div.gh-date-time-picker-time input").clear()
      @driver.find_element(:css, "div.gh-date-time-picker-time input").send_keys('23:59')
      @driver.find_element(:css, "button.gh-publishmenu-button").click
    else
      @driver.find_element(:css, "button.gh-publishmenu-button").click
    end
    sleep 1
  end

  Then(/^I should see item listed with "([^\"]*)" and "([^\"]*)" state$/) do |title, state|
    li_items = @driver.find_elements(:css, "li.gh-list-row")

    evaluated = false
    li_items.each do |item|
      if item.text.include?(state.upcase)
        raise "Fail test" unless item.text.include? title
        evaluated = true
        break
      end
    end

    raise "Fail test" unless evaluated
  end

  Then(/^I should see "([^\"]*)" post in "([^\"]*)"$/) do |title, ghost_url|
    @driver.navigate.to ghost_url
    sleep 1

    article_item = @driver.find_elements(:css, ".post-feed article").first
    raise "Fail test" unless article_item.text.include? title
  end

  Then(/^I should NOT see "([^\"]*)" post in "([^\"]*)"$/) do |title, ghost_url|
    @driver.navigate.to ghost_url
    sleep 1

    article_item = @driver.find_elements(:css, ".post-feed article").first
    raise "Fail test" if article_item.text.include? title
  end
end
