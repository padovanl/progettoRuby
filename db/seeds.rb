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
ThesisTag.destroy_all
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
      { id:5, name: "Analisi Matematica I.A", year: 1 },
      { id:6, name: "Geometria e Algebra", year: 1 },
      { id:7, name: "Analisi matematica I.B", year: 1 },
      { id:8, name: "Fisica I", year: 1 }
    ])

  degree_course = DegreeCourse.create!( id: 3, name: "Ingegneria meccanica", tipo: "triennale" )

  degree_course.courses.create!([
    { id:9, name: "Fondamenti di Chimica e Materiali", year: 1 },
    { id:10, name: "Geometria e Algebra", year: 1 },
    { id:11, name: "Disegno tecnico industriale", year: 1 },
    { id:12, name: "Informatica Industriale", year: 1 }
  ])

  degree_course = DegreeCourse.create!( id: 4, name: "Ingegneria civile", tipo: "magistrale" )

  degree_course.courses.create!([
    { id:13, name: "Tecnica delle Costruzioni", year: 1 },
    { id:14, name: "Progettazione in zona sismica", year: 1 },
    { id:15, name: "Progetti di strutture", year: 1 },
    { id:16, name: "Organizzazione del cantiere", year: 2 }
  ])

  degree_course = DegreeCourse.create!( id: 5, name: "Ingegneria elettronica e delle telecomunicazioni", tipo: "magistrale" )

  degree_course.courses.create!([
    { id:17, name: "Architetture per sistemi embedded", year: 1 },
    { id:18, name: "Tecniche di decisione, stima e sensing distribuito", year: 1 },
    { id:19, name: "Progettazione dei sistemi elettronici ad elevata affidabilità", year: 1 },
    { id:20, name: "Laboratorio FPGA", year: 2 }
]) 


degree_course = DegreeCourse.create!( id: 6, name: "Ingegneria meccanica", tipo: "magistrale" )

degree_course.courses.create!([
    { id:21, name: "STATISTICA E MODELLI DI DATI SPERIMENTALI", year: 1 },
    { id:22, name: "TERMOFLUIDODINAMICA NUMERICA", year: 1 },
    { id:23, name: "MECCANICA DELLE VIBRAZIONI", year: 2 },
    { id:24, name: "MATERIALI POLIMERICI E COMPOSITI", year: 2 }
])

degree_course = DegreeCourse.create!( id: 7, name: "Ingegneria informatica e dell'automazione", tipo: "magistrale" )

degree_course.courses.create!([
    { id:25, name: "Sistemi distribuiti e mobili", year: 1 },
    { id:26, name: "Fondamenti di intelligenza artificiale", year: 1 },
    { id:27, name: "Ricerca operativa", year: 2 },
    { id:28, name: "Progetto di sistemi Web", year: 2 },
    { id:29, name: "Reti di calcolatori", year: 1 }
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
teacher = Teacher.create!(name: "Evelina", surname: "Lamma", link_cv: "http://docente.unife.it/evelina.lamma")
teacher.teacher_courses.create!([
      {year: "1990-1991", teacher_id: teacher.id, course_id: 26},
      {year: "1992-1993", teacher_id: teacher.id, course_id: 26},
      {year: "1994-1995", teacher_id: teacher.id, course_id: 26}
  ])


teacher = Teacher.create!(name: "Marco", surname: "Gavanelli", link_cv: "http://docente.unife.it/marco.gavanelli/curriculum")

teacher.theses.create!([
    {title: "Titolo Uno", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {title: "Titolo Due", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {title: "Titolo Tre", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
])

teacher.teacher_courses.create!([
    {year: "2017-2018", teacher_id: teacher.id, course_id: 3},
    {year: "2015-2016", teacher_id: teacher.id, course_id: 4},
    {year: "2011-2012", teacher_id: teacher.id, course_id: 3}
])


teacher = Teacher.create!( name: "Mauro", surname: "Tortonesi", link_cv:"https://de.unife.it/en/research/research-1/information-technology/computer-science/distributed-systems-group/people/mauro-tortonesi")

teacher.teacher_courses.create!([
    {year: "2017-2018", teacher_id: teacher.id, course_id: 29},
    {year: "2016-2017", teacher_id: teacher.id, course_id: 29},
    {year: "2015-2016", teacher_id: teacher.id, course_id: 29}
])
teacher = Teacher.create!( name: "Cesare", surname: "Stefanelli", link_cv:"http://docente.unife.it/cesare.stefanelli/curriculum")

teacher.teacher_courses.create!([
    {year: "2017-2018", teacher_id: teacher.id, course_id: 25},
    {year: "2013-2014", teacher_id: teacher.id, course_id: 25},
    {year: "2010-2011", teacher_id: teacher.id, course_id: 25},
    {year: "2003-2004", teacher_id: teacher.id, course_id: 25},
    {year: "2002-2003", teacher_id: teacher.id, course_id: 25},
    {year: "2001-2002", teacher_id: teacher.id, course_id: 25},
    {year: "2017-2018", teacher_id: teacher.id, course_id: 28},
    {year: "2013-2014", teacher_id: teacher.id, course_id: 28},
    {year: "2010-2011", teacher_id: teacher.id, course_id: 28},
    {year: "2003-2004", teacher_id: teacher.id, course_id: 28},
    {year: "2002-2003", teacher_id: teacher.id, course_id: 28},
    {year: "2001-2002", teacher_id: teacher.id, course_id: 28}
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
