# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comment.destroy_all
Post.destroy_all
TeacherCourse.destroy_all
Course.destroy_all
DegreeCourse.destroy_all
Thesis.destroy_all
Teacher.destroy_all
Tag.destroy_all
User.destroy_all
TeacherCourse.destroy_all

 
degree_course = DegreeCourse.create!( id: 1, name: "Ingegneria civile e ambientale", tipo: "triennale" )

degree_course.courses.create!([
    { id:1, name: "Analisi Matematica I", year: 1 },
    { id:2, name: "Geometria", year: 1 },
    { id:3, name: "Fisica Generale", year: 1 },
    { id:4, name: "Disegno Civile", year: 1 }
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

#Teacher.create!(name: "Cesare", surname: "Stefanelli", link_cv: "http://docente.unife.it/cesare.stefanelli")
Teacher.create!(name: "Evelina", surname: "Lamma", link_cv: "http://docente.unife.it/evelina.lamma")
teacher = Teacher.create!(name: "Marco", surname: "Gavanelli", link_cv: "http://docente.unife.it/marco.gavanelli/curriculum")

teacher.theses.create!([
    {title: "Titolo Uno", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {title: "Titolo Due", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {title: "Titolo Tre", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
])

teacher.teacher_courses.create!([
    {data: "2017-2018", teacher_id: teacher.id, course_id: 3},
    {data: "2015-2016", teacher_id: teacher.id, course_id: 4},
    {data: "2011-2012", teacher_id: teacher.id, course_id: 3}
])


teacher = Teacher.create!( name: "Torto", surname: "Mauronesi", link_cv:"https://de.unife.it/en/research/research-1/information-technology/computer-science/distributed-systems-group/people/mauro-tortonesi")

teacher.teacher_courses.create!([
    {data: "2017-2018", teacher_id: teacher.id, course_id: 1},
    {data: "2016-2017", teacher_id: teacher.id, course_id: 1},
    {data: "2015-2016", teacher_id: teacher.id, course_id: 2}
])
teacher = Teacher.create!( name: "Stefano", surname: "Cesarelli", link_cv:"http://docente.unife.it/cesare.stefanelli/curriculum")

teacher.teacher_courses.create!([
    {data: "2017-2018", teacher_id: teacher.id, course_id: 4},
    {data: "2013-2014", teacher_id: teacher.id, course_id: 4},
    {data: "2010-2011", teacher_id: teacher.id, course_id: 2},
    {data: "2003-2004", teacher_id: teacher.id, course_id: 1},
    {data: "2002-2003", teacher_id: teacher.id, course_id: 1},
    {data: "2001-2002", teacher_id: teacher.id, course_id: 1}
])


ThesisTag.create!(id: 1, thesis_id: 1, tag_id: 1)
ThesisTag.create!(id: 2, thesis_id: 1, tag_id: 2)
ThesisTag.create!(id: 3, thesis_id: 1, tag_id: 3)
ThesisTag.create!(id: 4, thesis_id: 2, tag_id: 1)
ThesisTag.create!(id: 5, thesis_id: 3, tag_id: 1)

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