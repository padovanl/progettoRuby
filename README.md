# Project Title

L'applicazione consente la condivisione di materiale didattico tra gli studenti dell'università. Questi possono caricare
e scaricare file. Il materiale è cagorizzato e organizzato per i vari corsi di studio. È possibile consultare una pagina di
presentazione e statisctiche per ogni corso presente. Gli studenti inoltre possono offrire delle lezioni di ripetizione 
agli altri studenti.


## Getting Started

* Ruby version 2.5.1

### System dependencies
```
sudo apt-get install imagemagick -y
sudo apt install ffmpeg -y
sudo apt-get install mupdf mupdf-tools
```

We will use postgresql database.

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


### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc








Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
