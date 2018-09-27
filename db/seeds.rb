# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comment.destroy_all
Post.destroy_all
Document.destroy_all
Course.destroy_all
DegreeCourse.destroy_all
ThesisTag.destroy_all
Teacher.destroy_all
Tag.destroy_all
Rep.destroy_all
UserCourse.destroy_all
TeacherCourse.destroy_all
UserCourse.destroy_all
CourseQuestion.destroy_all
Notification.destroy_all
UserReport.destroy_all
Report.destroy_all
User.destroy_all


degree_course = DegreeCourse.create!(name: "Ingegneria civile e ambientale", tipo: "Triennale")
degree_course.courses.create!([
                                  {name: "Analisi Matematica I", year: 1},
                                  {name: "Geometria", year: 1},
                                  {name: "Fisica Generale", year: 1},
                                  {name: "Disegno Civile", year: 1}
                              ])


degree_course = DegreeCourse.create!(name: "Ingegneria elettronica e informatica", tipo: "Triennale")
degree_course.courses.create!([
                                  {name: "Analisi Matematica I.A", year: 1},
                                  {name: "Geometria e Algebra", year: 1},
                                  {name: "Analisi matematica I.B", year: 1},
                                  {name: "Fisica I", year: 1},
                                  {name: "SICUREZZA DEI SISTEMI INFORMATICI IN INTERNET", year: 1}
                              ])

degree_course = DegreeCourse.create!(name: "Ingegneria meccanica", tipo: "Triennale")
degree_course.courses.create!([
                                  {name: "Fondamenti di Chimica e Materiali", year: 1},
                                  {name: "Geometria e Algebra 2", year: 1},
                                  {name: "Disegno tecnico industriale", year: 1},
                                  {name: "Informatica Industriale", year: 1}
                              ])

degree_course = DegreeCourse.create!(name: "Ingegneria civile", tipo: "Magistrale")
degree_course.courses.create!([
                                  {name: "Tecnica delle Costruzioni", year: 1},
                                  {name: "Progettazione in zona sismica", year: 1},
                                  {name: "Progetti di strutture", year: 1},
                                  {name: "Organizzazione del cantiere", year: 2}
                              ])

degree_course = DegreeCourse.create!(name: "Ingegneria elettronica e delle telecomunicazioni", tipo: "Magistrale")
degree_course.courses.create!([
                                  {name: "Architetture per sistemi embedded", year: 1},
                                  {name: "Tecniche di decisione, stima e sensing distribuito", year: 1},
                                  {name: "Progettazione dei sistemi elettronici ad elevata affidabilità", year: 1},
                                  {name: "Laboratorio FPGA", year: 2}
                              ])


degree_course = DegreeCourse.create!(name: "Ingegneria meccanica", tipo: "Magistrale")
degree_course.courses.create!([
                                  {name: "STATISTICA E MODELLI DI DATI SPERIMENTALI", year: 1},
                                  {name: "TERMOFLUIDODINAMICA NUMERICA", year: 1},
                                  {name: "MECCANICA DELLE VIBRAZIONI", year: 2},
                                  {name: "MATERIALI POLIMERICI E COMPOSITI", year: 2}
                              ])

degree_course = DegreeCourse.create!(name: "Ingegneria informatica e dell'automazione", tipo: "Magistrale")
degree_course.courses.create!([
                                  {name: "Sistemi distribuiti e mobili", year: 1},
                                  {name: "Fondamenti di intelligenza artificiale", year: 1},
                                  {name: "Ricerca operativa", year: 2},
                                  {name: "Progetto di sistemi Web", year: 2},
                                  {name: "Reti di calcolatori", year: 1}
                              ])


user = User.create!(name: "Admin", email: "admin@admin.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: true)
user.tags.create!([
                      {name: "Ricerca"},
                      {name: "Sviluppo Web"},
                      {name: "Sviluppo Desktop"},
                      {name: "Sviluppo mobile"},
                      {name: "Ricerca Operativa"},
                      {name: "Client Server"},
                      {name: "CSP"},
                      {name: "VRP"},
                      {name: "Green"}
                  ])
user.user_courses.create!([
                              {course_id: Course.first.id, follow: true, passed: true, course_rate: 27, material_quality: 2, explanation: 2, average_attempts: 2, average_days: 10},
                              {course_id: Course.second.id, follow: true, passed: true, course_rate: 27, material_quality: 2, explanation: 2, average_attempts: 2, average_days: 10}
                          ])


user = User.create!(name: "User", email: "user@user.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.user_courses.create!([
                              {course_id: Course.find_by_name('Tecnica delle Costruzioni').id, follow: true}, #sta seguendo lamma: Fondamenti di intelligenza artificiale
                              {course_id: Course.find_by_name('Progettazione in zona sismica').id, follow: true}, #reti di calcolatori
                              {course_id: Course.find_by_name('Analisi Matematica I').id, follow: true}, #progetto sistemi web
                              {course_id: Course.find_by_name('Fisica Generale').id, follow: false} # smesso di seguire: ricerca operativa
                          ])

teacher = Teacher.create!(name: "Evelina", surname: "Lamma", link_cv: "http://docente.unife.it/evelina.lamma/curriculum")


teacher = Teacher.create!(name: "Maddalena", surname: "Nonato", link_cv: "http://docente.unife.it/maddalena.nonato/curriculum")

teacher.theses.create!([
                           {title: "Titolo Green VRP",
                            content: "un commesso viaggiatore deve visitare n clienti percorrendo un tour che inizia e termina al deposito. Poiché utilizza un veicolo elettrico che ha autonomia K km, all’occorrenza tra un cliente e il successivo, può visitare una stazione di ricarica dove esegue la ricarica completa acquistando nuovamente autonomia K. Note le distanze tra il deposito, i clienti e le stazioni di ricarica, si determini il tour di durata minima.
si estenda il problema precedente considerando una flotta di m veicoli identici, di capacità Q, e la domanda qi >0 di ogni cliente i. Si determinino gli m tour di costo minimo in modo che tutti i clienti siano serviti, un veicolo visiti una stazione di ricarica almeno ogni K km, e la domanda dei clienti serviti dallo stesso veicolo non superi Q.
si estenda il problema precedente permettendo ai veicoli di fare delle ricariche parziali (proporzionali alla durata della sosta presso una stazione di ricarica), e minimizzando la somma delle durate dei tours."},
                           {title: "Titolo TSP", content: "A partire dalla base (nodo 0) un tecnico deve rifornire n vending machines poste in n siti diversi, che aprono a un tempo ti, e rientrare alla base. Se arriva in loco prima di ti deve attendere fino a ti, se si arriva al tempo tj>ti si paga una penale di (tj-ti). Noti i tempi di percorrenza da sito a sito e alla base, si determini il tour di costo minimo (durata + penalità) che visita tutti i siti e la base, partendo al tempo t0."},
                           {title: "Titolo Pedibus", content: "dati di input: gli indirizzi di n bambini (1 indirizzo per bambino) e l’indirizzo della scuola. Determinare il numero minimo di percorsi che partono dalla casa di un bambino e terminano alla scuola passando da altre case, in modo tale che: ogni bambino i sia parte di ex 1 percorso e la durata del suo percorso tra casa e scuola sia non superiore a  volte la sua distanza minima dalla scuola (es. =1.5). Suggerimento: lavorare sul grafo astratto completo, i cui nodi sono gli indirizzi e il costo degli archi è la durata del percorso minimo nodo-nodo sulla rete stradale."},
                           {title: "Titolo Degree constrained spanning tree", content: "(2 persone) si cerca lo spanning tree di costo minimo di radice r tale che ogni nodo non abbia + di k archi incidenti."}
                       ])


teacher = Teacher.create!(name: "Marco", surname: "Gavanelli", link_cv: "http://docente.unife.it/marco.gavanelli/curriculum")
teacher.theses.create!([
                           {title: "Titolo Infermiera", content: "Una infermiera deve visitare a casa dei pazienti. Ogni paziente va visitato in una determinata fascia oraria. Il file pazienti.pl contiene per ogni paziente un fatto
paziente(ID,OrarioMinimo,OrarioMassimo)dove ID è un numero intero che identifica univocamente il paziente OrarioMinimo e OrarioMassimo sono il minimo e massimo orario in cui deve avvenire la visita. Il file pazienti.pl contiene inoltre, per ogni coppia di pazienti (diversi) un fatto
distanza(Paziente1,Paziente2,Tempo) che indica quanto tempo è necessario per andare dal domicilio del Paziente1 a quello del Paziente2.L'infermiera parte dall'ospedale e alla fine della giornata ritorna all'ospedale, indicato nel file pazienti.pl dall'identificatore 0.
Si scriva un programma CLP(FD) che calcola qual è il tragitto ottimale dell'infermiera, in modo da minimizzare il tempo totale impiegato dall'infermiera.
Si supponga per semplicità che la visita sia istantanea (abbia durata nulla) e che l'infermiera non possa effettuare pause fra una visita e l'altra, ma riparta immediatamente per la destinazione successiva (il prossimo paziente o l'ospedale, se si sono già visitati tutti i pazienti)."},

                           {title: "Titolo Attività", content: "Un insieme di attività è definito tramite il predicato task/2 nel file task.pl . Il predicato task è definito tramite alcuni fatti Prolog, con questa sintassi:
task(ID,Durata). doveID è un identificatore univoco dell'attività. Durata è un intero che rappresenta la durata dell'attività. Ciascuna attività deve essere eseguita su una macchina e, una volta iniziata, l'attività non può essere interrotta. Ogni macchina può eseguire una sola attività alla volta.
Poiché si vuole terminare tutte le attività entro un tempo dato Tmax, si desidera sapere qual è il numero minimo di macchine necessario.
Si scriva un programma CLP(FD) che, preso in ingresso un parametro Tmax, fornisce il minimo numero di macchine necessario per eseguire tutti i task e l'istante di tempo in cui ciascuna attività inizia."},
                       ])


teacher = Teacher.create!(name: "Mauro", surname: "Tortonesi", link_cv: "https://de.unife.it/en/research/research-1/information-technology/computer-science/distributed-systems-group/people/mauro-tortonesi")


teacher.theses.create!([
                           {title: "Titolo EchoReverse", content: "Si progetti un'applicazione distribuita Client/Server utilizzando le socket datagram in Java. Il Client deve offrire la seguente interfaccia:
java EchoReverseClient nodoServer portaServer dove nodoServer e portaServer sono rispettivamente il nome della macchina e il numero di porta su cui il Server è in ascolto.
Il Client deve richiedere all’utente le stringhe da inviare al processo Server, che è incaricato di invertirle e rimandarle indietro al Client. Per esempio, se il Client invia, la stringa 'Ciao mondo', il Server deve restituire al Client la stringa 'odnom oaiC'."},

                           {title: "Titolo Remote Square", content: "Si realizzi un'applicazione distribuita che permetta di calcolare il quadrato dei numeri inseriti dall'utente a terminale. L'applicazione deve avere la seguente interfaccia:
java RemoteSquareClient hostname porta dove hostname è il nome dell'host dove risiede il Server e porta è il numero di porta a cui esso è associato.
Per prima cosa, il Client deve interfacciarsi con l'utente, da cui riceve, via terminale un numero intero N. Il Client deve quindi trasmettere il numero N al Server, che a sua volta dovrà occuparsi di calcolare il quadrato di N (ovverosia N*N) e di restituirlo al Client, che lo stamperà a video.
Al termine di ogni richiesta, il Client dovrà attendere che l'utente inserisca un nuovo numero. Il Client dovrà terminare nel caso l'utente inserisca la stringa 'fine'."}
                       ])


ThesisTag.create!([
                      #nonato
                      {tag_id: Tag.first.id, thesis_id: Thesis.first.id}
                  ])


teacher = Teacher.create!(name: "Cesare", surname: "Stefanelli", link_cv: "http://docente.unife.it/cesare.stefanelli/curriculum")


user = User.create!(name: "User2", email: "user2@user2.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.user_courses.create!([
                              {course_id: Course.first.id, follow: true, passed: true, course_rate: 25, material_quality: 1, explanation: 1, average_attempts: 4, average_days: 10}
                          ])
user = User.create!(name: "User3", email: "user3@user3.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.user_courses.create!([
                              {course_id: Course.first.id, follow: true, passed: true, course_rate: 27, material_quality: 2, explanation: 2, average_attempts: 2, average_days: 10}
                          ])


user = User.create!(name: "User4", email: "user4@user4.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.user_courses.create!([
                              {course_id: Course.first.id, follow: true, passed: true, course_rate: 31, material_quality: 5, explanation: 2, average_attempts: 1, average_days: 40}
                          ])


user = User.create!(name: "User5", email: "user5@user5.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.user_courses.create!([
                              {course_id: Course.first.id, follow: true, passed: true, course_rate: 22, material_quality: 3, explanation: 2, average_attempts: 1, average_days: 20}
                          ])


user = User.create!(name: "User6", email: "user6@user6.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.user_courses.create!([
                              {course_id: Course.first.id, follow: true, passed: true, course_rate: 18, material_quality: 5, explanation: 3, average_attempts: 1, average_days: 15}
                          ])


user = User.create!(name: "User7", email: "user7@user7.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.user_courses.create!([
                              {course_id: Course.first.id, follow: true, passed: true, course_rate: 30, material_quality: 5, explanation: 4, average_attempts: 4, average_days: 10}
                          ])


=begin
5.times do
  user = User.create!(
      name: Faker::HeyArnold.quote,
      email: Faker::Internet.safe_email,
      password: "123123",
      admin: false
  )
  user.user_courses.create!([
    {user_id: user.id,
     course_id: 1,
     follow: true,
     passed: true,
     course_rate: rand(18..31),
     material_quality: rand(1..5),
     explanation: rand(1..5),
     average_attempts: rand(1..10),
     average_days: rand(1..20)}
])
end
=end
=begin
user.course_questions.create!([
    { id:1 , question: Faker::StarWars.quote, user_id: user.id, course_id: 1},
    { id:2 , question: Faker::StarWars.quote, user_id: user.id, course_id: 1},
])

user.course_tips.create!([
    { id:1 , tip: Faker::StarWars.quote, user_id: user.id, course_id: 1},
    { id:2 , tip: Faker::StarWars.quote, user_id: user.id, course_id: 1},
])

user.frequency_questions.create!([
   {user_id: user.id, course_question_id: 1},
   {user_id: user.id, course_question_id: 2},
])

=end

user = User.first
course = Course.first
5.times do
  post = Post.create!(
      message: Faker::HeyArnold.quote,
      user_id: user.id,
      course_id: course.id
  )
  post.comments.create!([
                            {content: Faker::Hobbit.quote, user_id: user.id, course_id: course.id},
                            {content: Faker::StarWars.quote, user_id: User.second.id, course_id: course.id},
                            {content: Faker::Hobbit.quote, user_id: user.id, course_id: course.id}])
end
user = User.second
5.times do
  post = Post.create!(
      message: Faker::HeyArnold.quote,
      user_id: user.id,
      course_id: course.id
  )
  post.comments.create!([
                            {content: Faker::StarWars.quote, user_id: user.id, course_id: course.id},
                            {content: Faker::Hobbit.quote, user_id: User.first.id, course_id: course.id},
                            {content: Faker::Hobbit.quote, user_id: user.id, course_id: course.id}])
end
course = Course.second
5.times do
  post = Post.create!(
      message: Faker::HeyArnold.quote,
      user_id: user.id,
      course_id: course.id
  )
  post.comments.create!([
                            {content: Faker::Hobbit.quote, user_id: user.id, course_id: course.id},
                            {content: Faker::StarWars.quote, user_id: User.first.id, course_id: course.id},
                            {content: Faker::Hobbit.quote, user_id: user.id, course_id: course.id}])
end
user = User.second
5.times do
  post = Post.create!(
      message: Faker::HeyArnold.quote,
      user_id: user.id,
      course_id: course.id
  )
  post.comments.create!([
                            {content: Faker::StarWars.quote, user_id: user.id, course_id: course.id},
                            {content: Faker::StarWars.quote, user_id: User.first.id, course_id: course.id},
                            {content: Faker::StarWars.quote, user_id: user.id, course_id: course.id}])
end


courses = Course.all
courses.each {|x| x.teacher_courses.create!(teacher: Teacher.create!(name: Faker::Name.first_name, surname: Faker::Name.last_name, link_cv: "http://unife.it"), year: '2017-2018')}

=begin
user = User.second
course = Course.first
5.times do
  Rep.create!(
      description: Faker::HarryPotter.quote,
      user_id: user.id,
      course_id: course.id,
      offer: true,
      user_competence: Faker::StarWars.quote,
      price_hours: 15,
      place: Faker::Hobbit.location,
      home_service: true,
      week_days: "Lunedì e Martedì"
  )
end


5.times do
  Rep.create!(
      description: Faker::StarWars.quote,
      user_id: user.id,
      course_id: course.id,
      offer: false,
      price_hours: 0,
      place: Faker::StarTrek.location,
      week_days: "Giovedì e Sabato"
  )
end
=end