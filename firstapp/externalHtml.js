var webdriver = require('selenium-webdriver');
 By = webdriver.By,
 until = webdriver.until;
 
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('https://github.com');
driver.findElement(By.name('user[login]')).sendKeys("username");
driver.findElement(By.name('user[email]')).sendKeys("username");
//driver.findElement(By.name('btnG')).click();
//driver.wait(check_title,1000);

function check_title() {
    var promise = driver.getTitle().then(function(title){
        if(title === 'wiki - Google Search')
        {
            console.log('success');
        }
        else
        {
            console.log('fail --' + title);
        }
    });
    return promise;
}