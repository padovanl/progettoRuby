# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

=begin
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
=end

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