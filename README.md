# Project Title

L'applicazione consente la condivisione di materiale didattico tra gli studenti dell'università. Questi possono caricare
e scaricare file. Il materiale è cagorizzato e organizzato per i vari corsi di studio. È possibile consultare una pagina di
presentazione e statisctiche per ogni corso presente. Gli studenti inoltre possono offrire delle lezioni di ripetizione 
agli altri studenti.


## Getting Started

Prima di partire installare i seguenti pacchetti:

```
sudo apt-get install imagemagick -y
sudo apt install ffmpeg -y
sudo apt-get install mupdf mupdf-tools
```

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

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

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

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

* Come trattare le password nel codice

EDITOR=vim rails credentials:edit

Option 1: Place the config/master.key file in the server. You’ll normally want to symlink this file to a shared folder in the server filesystem. Again, do not version your config/master.key file.
Option 2: create a RAILS_MASTER_KEY ENV variable. Rails will detect it and use it as your master key, e.g. in heroku: heroku config:set RAILS_MASTER_KEY=<your-master-key-here>.