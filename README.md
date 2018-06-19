# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

Prima di partire installare i seguenti pacchetti:

sudo apt-get install imagemagick -y
sudo apt install ffmpeg -y
sudo apt-get install mupdf mupdf-tools

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


* Come trattare le password nel codice

EDITOR=vim rails credentials:edit

Option 1: Place the config/master.key file in the server. You’ll normally want to symlink this file to a shared folder in the server filesystem. Again, do not version your config/master.key file.
Option 2: create a RAILS_MASTER_KEY ENV variable. Rails will detect it and use it as your master key, e.g. in heroku: heroku config:set RAILS_MASTER_KEY=<your-master-key-here>.