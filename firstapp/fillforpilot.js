var webdriver = require('selenium-webdriver');
 By = webdriver.By,
 until = webdriver.until;


var fill = function (username, email,password) {
  var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
    //https://rohtangpermits.nic.in/Home/OnlinePermitRequest?Length=4
    driver.get('https://github.com/login');
    driver.findElement(By.name('login')).sendKeys(email);
    driver.findElement(By.name('password')).sendKeys(password);
    driver.findElement(By.name('commit')).click();
 }

  module.exports.fill = fill;