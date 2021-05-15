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
    if resource == 'my profile'
      @driver.find_element(:css, ".gh-nav-bottom .gh-user-email").click
      @driver.find_elements(:css, "li[role=\"presentation\"]")[2].click
    else
      @driver.find_element(:css, "a[href=\"#/#{resource.downcase}/\"]").click
    end
    sleep 1
  end

  When(/^I change tag to "([^\"]*)"$/) do |tag|
    @driver.find_element(:css, "button.post-settings").click
    @driver.find_element(:css, "#tag-input").send_keys(tag.downcase, :enter)
    @driver.find_element(:css, 'button.close').click
  end

  When(/^I click on new "([^\"]*)" button$/) do |resource|
    if resource.downcase == "tag"
      @driver.find_element(:css, "a[href=\"#/tags/new/\"]").click
    elsif resource.downcase == "user"
      @driver.find_element(:css, "button.gh-btn-green").click
    else
      @driver.find_element(:css, "a[href=\"#/editor/#{resource.downcase}/\"]").click
    end
  end

  When(/^I click save button$/) do
    @driver.find_element(:css, "button.gh-btn-blue").click
    sleep 1
  end

  When(/^I click delete button$/) do
    @driver.find_element(:css, "button.gh-btn-red").click
    sleep 1
  end

  When(/^I enter "([^\"]*)" as email$/) do |email|
    @driver.find_element(:name, 'email').send_keys(email)
    @driver.find_element(:css, '.modal-footer .gh-btn-green').click
    sleep 1
  end

  When(/^I fill tag form with title "([^\"]*)" and description "([^\"]*)"$/) do |title, description|
    @driver.find_element(:name, 'name').send_keys(title)
    @driver.find_element(:name, 'description').send_keys(description)
    sleep 1
  end

  When(/^I fill tag form with meta title "([^\"]*)" and meta description "([^\"]*)"$/) do |title, description|
    @driver.find_element(:name, 'metaTitle').send_keys(title)
    @driver.find_element(:name, 'metaDescription').send_keys(description)
    sleep 1
  end

  When(/^I update slug with "([^\"]*)"$/) do |slug|
    @driver.find_element(:name, 'slug').send_keys(slug)
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

  When(/^I change slug to "([^\"]*)"$/) do |slug|
    #This returns index
    @driver.find_element(:css, "button.post-settings").click
    @driver.find_element(:name, 'post-setting-slug').send_keys(slug.downcase)
    @driver.find_element(:css, 'button.close').click

    sleep 1
  end

  When(/^I click on published alert$/) do
    #This returns index
    @driver.find_element(:css, ".gh-notifications").click
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

  When(/^I unpublish$/) do
    @driver.find_elements(:css, "div.gh-publishmenu-radio-content").first.click()
    @driver.find_element(:css, "button.gh-publishmenu-button").click
    sleep(1)
  end

  When(/^I revoke invitation for "([^\"]*)"$/) do |email|
    @driver.navigate.refresh
    sleep 1
    li_items = @driver.find_elements(:css, ".apps-grid-cell")
    item = li_items.find { |item| item.text.match(email)}

    raise "Fail test" unless item
    item.find_element(:css, "a[href=\"#revoke\"]").click
    sleep 1
  end

  When(/^I change name to "([^\"]*)"$/) do |name|
    @driver.find_element(:css, '#user-name').send_keys(name)
    @driver.find_element(:css, 'button.gh-btn-blue').click()
    sleep 1
  end

  When(/^I change password with "([^\"]*)"$/) do |password|
    new_password = SecureRandom.hex
    @driver.find_element(:css, '#user-password-old').send_keys(password)
    @driver.find_element(:css, '#user-password-new').send_keys(new_password)
    @driver.find_element(:css, '#user-new-password-verification').send_keys(new_password)
    @driver.find_element(:css, '.button-change-password').click

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

  Then(/^I should NOT see "([^\"]*)" in "([^\"]*)"$/) do |title, ghost_url|
    @driver.navigate.to "#{ghost_url}/#{title.downcase}"
    sleep 1

    el = @driver.find_element(:css, ".error-message .error-code")
    raise "Fail test" unless el.text.match("404")
  end

  Then(/^I should NOT see tag with "([^\"]*)" in "([^\"]*)"$/) do |title, ghost_url|
    @driver.navigate.to "#{ghost_url}/tag/#{title.downcase}"
    sleep 1

    el = @driver.find_element(:css, ".error-message .error-code")
    raise "Fail test" unless el.text.match("404")
  end

  Then(/^I should see tag with "([^\"]*)" in "([^\"]*)"$/) do |title, ghost_url|
    @driver.navigate.to "#{ghost_url}/tag/#{title.downcase}"
    sleep 1

    el = @driver.find_element(:css, "h1.site-title")
    raise "Fail test" unless el.text.match(title)
  end

  Then(/^I should see "([^\"]*)" slug on url alert$/) do |slug|
    el = @driver.find_element(:css, ".gh-notifications a")
    link = el.attribute("href")
    raise "Fail test" unless link.match(slug.downcase)
  end

  Then(/^I get url from success alert and see "([^\"]*)" on page$/) do |title|
    el = @driver.find_element(:css, ".gh-notifications a")
    link = el.attribute("href")
    @driver.navigate.to link

    text = @driver.find_element(:css, "h1.post-full-title").text
    raise "Fail test" unless text == title
  end

  Then(/^I should see slug tag engine "([^\"]*)" updated with "([^\"]*)"$/) do |ghost_url, slug|
    text = @driver.find_element(:css, ".seo-preview-link").text

    raise "Fail test" unless text.match(ghost_url)
    raise "Fail test" unless text.match(slug)
  end

  Then(/^I should see meta tag "([^\"]*)" engine in "([^\"]*)" updated with "([^\"]*)"$/) do |type, ghost_url, datum|
    text = @driver.find_element(:css, ".seo-preview-#{type}").text

    raise "Fail test" unless text.match(datum)
  end

  Then(/^I should see confirmation modal$/) do
    @driver.find_element(:css, ".modal-footer button.gh-btn-red").click()
  end

  Then(/^I should see "([^\"]*)" error$/) do |text|
    response = @driver.find_element(:css, ".response").text

    raise "Fail test" unless response.match(text)
  end

  Then(/^I should see invitation for "([^\"]*)"$/) do |email|
    @driver.navigate.refresh
    sleep 2
    text = @driver.find_element(:css, '.apps-grid').text

    raise "Fail test" unless text.match(email)
  end

  Then(/^I should NOT see invitation for "([^\"]*)"$/) do |email|
    text = @driver.find_element(:css, '.apps-grid').text

    raise "Fail test" if text.match(email)
  end

  Then(/^I should see "([^\"]*)" on navigation footer$/) do |email|
    @driver.navigate.refresh
    sleep 2

    text = @driver.find_element(:css, ".gh-nav-bottom").text
    raise "Fail test" unless text.match(email)
  end

  Then(/^I should see error message "([^\"]*)"$/) do |message|
    text = @driver.find_element(:css, ".gh-alert-red").text
    raise "Fail test" unless text.match(message)
  end

  AfterStep do |_scenario, step|
    version = ""
    if ENV["PROPERTIES_PATH"]
      file = open(ENV["PROPERTIES_PATH"])
      content = file.read
      file.close
      properties = JSON.parse(content)
      version = properties["version"]
    end

    file_name = step.location.file
    name = file_name.split("/").last.split('.').first
    step_name = step.text.gsub(/[^0-9a-z]/i, '_')
    path = "./kraken_screenshots/#{name}/#{version}_#{step_name}.png"
    dirname = File.dirname(path)
    unless File.directory?(dirname)
      FileUtils.mkdir_p(dirname)
    end
    @driver.save_screenshot(path)
  end
end
