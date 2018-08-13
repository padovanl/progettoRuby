# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

begin
Course.destroy_all
DegreeCourse.destroy_all
 
degree_course = DegreeCourse.create!( id: 1, name: "Ingegneria civile e ambientale", tipo: "triennale" )

degree_course.courses.create!([
    { name: "Analisi Matematica I", year: 1 },
    { name: "Geometria", year: 1 },
    { name: "Fisica Generale", year: 1 },
    { name: "Disegno Civile", year: 1 }
])

degree_course = DegreeCourse.create!( id: 2, name: "Ingegneria elettronica e informatica", tipo: "triennale" )

degree_course.courses.create!([
    { name: "Analisi Matematica I.A", year: 1 },
    { name: "Geometria e Algebra", year: 1 },
    { name: "Analisi matematica I.B", year: 1 },
    { name: "Fisica I", year: 1 }
  ])

  degree_course = DegreeCourse.create!( id: 3, name: "Ingegneria meccanica", tipo: "triennale" )

  degree_course.courses.create!([
    { name: "Fondamenti di Chimica e Materiali", year: 1 },
    { name: "Geometria e Algebra", year: 1 },
    { name: "Disegno tecnico industriale", year: 1 },
    { name: "Informatica Industriale", year: 1 }
  ])

  degree_course = DegreeCourse.create!( id: 4, name: "Ingegneria civile", tipo: "magistrale" )

  degree_course.courses.create!([
    { name: "Tecnica delle Costruzioni", year: 1 },
    { name: "Progettazione in zona sismica", year: 1 },
    { name: "Progetti di strutture", year: 1 },
    { name: "Organizzazione del cantiere", year: 2 }
  ])

  degree_course = DegreeCourse.create!( id: 5, name: "Ingegneria elettronica e delle telecomunicazioni", tipo: "magistrale" )

  degree_course.courses.create!([
    { name: "Architetture per sistemi embedded", year: 1 },
    { name: "Tecniche di decisione, stima e sensing distribuito", year: 1 },
    { name: "Progettazione dei sistemi elettronici ad elevata affidabilità", year: 1 },
    { name: "Laboratorio FPGA", year: 2 }
]) 


degree_course = DegreeCourse.create!( id: 6, name: "Ingegneria meccanica", tipo: "magistrale" )

degree_course.courses.create!([
    { name: "STATISTICA E MODELLI DI DATI SPERIMENTALI", year: 1 },
    { name: "TERMOFLUIDODINAMICA NUMERICA", year: 1 },
    { name: "MECCANICA DELLE VIBRAZIONI", year: 2 },
    { name: "MATERIALI POLIMERICI E COMPOSITI", year: 2 }
])

degree_course = DegreeCourse.create!( id: 7, name: "Ingegneria informatica e dell'automazione", tipo: "magistrale" )

degree_course.courses.create!([
    { name: "Sistemi distribuiti e mobili", year: 1 },
    { name: "Fondamenti di intelligenza artificiale", year: 1 },
    { name: "Ricerca operativa", year: 2 },
    { name: "Progetto di sistemi Web", year: 2 }
])



user = User.create!(name: "Admin Admin", email: "admin@admin.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: true)
User.create!(name: "User User", email: "user@user.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.tags.create!([
  { id:1 , name: "Ricerca" },
  { id:2 , name: "Sviluppo Web" },
  { id:3 , name: "Sviluppo Desktop" },
  { id:4 , name: "Sviluppo mobile" }
])

Teacher.create!(name: "Cesare", surname: "Stefanelli", link_cv: "http://docente.unife.it/cesare.stefanelli")
Teacher.create!(name: "Evelina", surname: "Lamma", link_cv: "http://docente.unife.it/evelina.lamma")
teacher = Teacher.create!(name: "Marco", surname: "Gavanelli", link_cv: "http://docente.unife.it/marco.gavanelli")

teacher.theses.create!([
    {title: "Titolo Uno", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {title: "Titolo Due", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {title: "Titolo Tre", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},

])



end

user = User.first
course = Course.first
10.times do
  post = Post.create!(
    message: Faker::HeyArnold.quote,
    user_id: user.id,
    course_id: course.id
  )
  post.comments.create!([
      {content: Faker::Hobbit.quote, user_id: user.id},
      {content: Faker::Hobbit.quote, user_id: user.id},
      {content: Faker::Hobbit.quote, user_id: user.id}])
end