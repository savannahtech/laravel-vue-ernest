## Instructions

Below is the procedure to set up locally

First install composer dependencies 
- `composer install`

Install node dependencies
- `npm install`

Edit the .env file with your database info

You don't need to run the "migrate" command just run 
- `php artisan start`

It will build the db table and seed some dummy data. 

You can now run 
- `php artisan serve`

Start queue on another terminal
- `php artisan queue:work`

Now open the app on port 8000

and log in with 
- Email: admin@gmail.com
- Password: password1
