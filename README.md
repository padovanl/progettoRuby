# Project Title

L'applicazione consente la condivisione di materiale didattico tra gli studenti dell'università. Questi possono caricare
e scaricare file. Il materiale è cagorizzato e organizzato per i vari corsi di studio. È possibile consultare una pagina di
presentazione e statisctiche per ogni corso presente. Gli studenti inoltre possono offrire delle lezioni di ripetizione 
agli altri studenti.


## Getting Started

* Ruby version 2.5.1

### Configuration

For files storage we will use Amazon S3 service. For mails we will user sendgrid (Heroku) smtp servers. Both 
services requires credentials setup, for this purpose we can use encrypted credentials. You cannot use plain text credentials. There's only ```config/credentials.yml.enc```

To edit this file use:
```
EDITOR=vim rails credentials:edit
```
This will create a ```config/master.key``` file, which sotres the encryption key, this file HAVE TO remain secret. There two
option to provide the KEY to the production environment:
* Place the config/master.key file in the server. You’ll normally want to symlink this file to a shared folder in the server filesystem. Again, do not version your config/master.key file.
* Create a RAILS_MASTER_KEY ENV variable. Rails will detect it and use it as your master key, e.g. in heroku: heroku config:set RAILS_MASTER_KEY=<your-master-key-here>.

Template of ```config/credentials.yml.enc```:

```
aws:
  access_key_id: <s3_access_key>
  secret_access_key: <s3_secret_access_key>

sendgrid:
  user_name: <sendgrid_user_name>
  password: <sendgrid_pwd>
```

### Prerequisites

* System dependencies
```
sudo apt-get install imagemagick -y
sudo apt install ffmpeg -y
sudo apt-get install mupdf mupdf-tools
```

**Install postgresql database.**
If needed edit ```config/database.yml``` and set databse params.

### Installing

Install gem

```
bundle install
```

Create database and migrate schema

```
rails db:create
rails db:migrate
```

Run puma server:

```
rails s
```