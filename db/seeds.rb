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
User.destroy_all
UserCourse.destroy_all
TeacherCourse.destroy_all
UserCourse.destroy_all
CourseQuestion.destroy_all





  degree_course = DegreeCourse.create!( id: 1, name: "Ingegneria civile e ambientale", tipo: "Triennale" )

  degree_course.courses.create!([
      { id:1, name: "Analisi Matematica I", year: 1 },
      { id:2, name: "Geometria", year: 1 },
      { id:3, name: "Fisica Generale", year: 1 },
      { id:4, name: "Disegno Civile", year: 1 }
  ])

  degree_course = DegreeCourse.create!( id: 2, name: "Ingegneria elettronica e informatica", tipo: "Triennale" )

  degree_course.courses.create!([
      { id:5, name: "Analisi Matematica I.A", year: 1 },
      { id:6, name: "Geometria e Algebra", year: 1 },
      { id:7, name: "Analisi matematica I.B", year: 1 },
      { id:8, name: "Fisica I", year: 1 }
    ])

  degree_course = DegreeCourse.create!( id: 3, name: "Ingegneria meccanica", tipo: "Triennale" )

  degree_course.courses.create!([
    { id:9, name: "Fondamenti di Chimica e Materiali", year: 1 },
    { id:10, name: "Geometria e Algebra 2", year: 1 },
    { id:11, name: "Disegno tecnico industriale", year: 1 },
    { id:12, name: "Informatica Industriale", year: 1 }
  ])

  degree_course = DegreeCourse.create!( id: 4, name: "Ingegneria civile", tipo: "Magistrale" )

  degree_course.courses.create!([
    { id:13, name: "Tecnica delle Costruzioni", year: 1 },
    { id:14, name: "Progettazione in zona sismica", year: 1 },
    { id:15, name: "Progetti di strutture", year: 1 },
    { id:16, name: "Organizzazione del cantiere", year: 2 }
  ])

  degree_course = DegreeCourse.create!( id: 5, name: "Ingegneria elettronica e delle telecomunicazioni", tipo: "Magistrale" )

  degree_course.courses.create!([
    { id:17, name: "Architetture per sistemi embedded", year: 1 },
    { id:18, name: "Tecniche di decisione, stima e sensing distribuito", year: 1 },
    { id:19, name: "Progettazione dei sistemi elettronici ad elevata affidabilità", year: 1 },
    { id:20, name: "Laboratorio FPGA", year: 2 }
]) 


degree_course = DegreeCourse.create!( id: 6, name: "Ingegneria meccanica", tipo: "Magistrale" )

degree_course.courses.create!([
    { id:21, name: "STATISTICA E MODELLI DI DATI SPERIMENTALI", year: 1 },
    { id:22, name: "TERMOFLUIDODINAMICA NUMERICA", year: 1 },
    { id:23, name: "MECCANICA DELLE VIBRAZIONI", year: 2 },
    { id:24, name: "MATERIALI POLIMERICI E COMPOSITI", year: 2 }
])

degree_course = DegreeCourse.create!( id: 7, name: "Ingegneria informatica e dell'automazione", tipo: "Magistrale" )

degree_course.courses.create!([
    { id:25, name: "Sistemi distribuiti e mobili", year: 1 },
    { id:26, name: "Fondamenti di intelligenza artificiale", year: 1 },
    { id:27, name: "Ricerca operativa", year: 2 },
    { id:28, name: "Progetto di sistemi Web", year: 2 },
    { id:29, name: "Reti di calcolatori", year: 1 }
])



user = User.create!(id: 1, name: "Admin Admin", email: "admin@admin.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: true)
user.tags.create!([
  { id:1 , name: "Ricerca" },
  { id:2 , name: "Sviluppo Web" },
  { id:3 , name: "Sviluppo Desktop" },
  { id:4 , name: "Sviluppo mobile" }
])


user = User.create!(id:2, name: "User User", email: "user@user.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.user_courses.create!([
    {id:1, user_id: user.id, course_id: 26, follow: true}, #sta seguendo lamma: Fondamenti di intelligenza artificiale
    {id:2, user_id: user.id, course_id: 29, follow: true}, #reti di calcolatori
    {id:3, user_id: user.id, course_id: 28, follow: true}, #progetto sistemi web
    {id:4, user_id: user.id, course_id: 27, follow: false} # smesso di seguire: ricerca operativa
])

#Teacher.create!(name: "Cesare", surname: "Stefanelli", link_cv: "http://docente.unife.it/cesare.stefanelli")
teacher = Teacher.create!(name: "Evelina", surname: "Lamma", link_cv: "http://docente.unife.it/evelina.lamma/curriculum")
teacher.teacher_courses.create!([
      {year: "1990-1991", teacher_id: teacher.id, course_id: 26},
      {year: "1992-1993", teacher_id: teacher.id, course_id: 26},
      {year: "1994-1995", teacher_id: teacher.id, course_id: 26},
      {year: "2002-2003", teacher_id: teacher.id, course_id: 13},
      {year: "2001-2002", teacher_id: teacher.id, course_id: 14}
  ])


teacher = Teacher.create!(name: "Maddalena", surname: "Nonato", link_cv: "http://docente.unife.it/maddalena.nonato/curriculum")
teacher.teacher_courses.create!([
    {year: "2000-2001", teacher_id: teacher.id, course_id: 27},
    {year: "2001-2002", teacher_id: teacher.id, course_id: 27},
    {year: "2002-2003", teacher_id: teacher.id, course_id: 27}
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
    {year: "2011-2012", teacher_id: teacher.id, course_id: 3},
    {year: "2017-2018", teacher_id: teacher.id, course_id: 2},
    {year: "2013-2014", teacher_id: teacher.id, course_id: 1},
    {year: "2010-2011", teacher_id: teacher.id, course_id: 5},
    {year: "2003-2004", teacher_id: teacher.id, course_id: 6},
    {year: "2002-2003", teacher_id: teacher.id, course_id: 7},
    {year: "2001-2002", teacher_id: teacher.id, course_id: 8},
    {year: "2017-2018", teacher_id: teacher.id, course_id: 9},
    {year: "2013-2014", teacher_id: teacher.id, course_id: 10},
    {year: "2010-2011", teacher_id: teacher.id, course_id: 11},
    {year: "2003-2004", teacher_id: teacher.id, course_id: 12},
    {year: "2002-2003", teacher_id: teacher.id, course_id: 13},
    {year: "2001-2002", teacher_id: teacher.id, course_id: 14}

])


teacher = Teacher.create!( name: "Mauro", surname: "Tortonesi", link_cv:"https://de.unife.it/en/research/research-1/information-technology/computer-science/distributed-systems-group/people/mauro-tortonesi")

teacher.teacher_courses.create!([
    {year: "2017-2018", teacher_id: teacher.id, course_id: 29},
    {year: "2016-2017", teacher_id: teacher.id, course_id: 29},
    {year: "2015-2016", teacher_id: teacher.id, course_id: 29},
    {year: "2017-2018", teacher_id: teacher.id, course_id: 15},
    {year: "2015-2016", teacher_id: teacher.id, course_id: 16},
    {year: "2011-2012", teacher_id: teacher.id, course_id: 17},
    {year: "2017-2018", teacher_id: teacher.id, course_id: 18},
    {year: "2013-2014", teacher_id: teacher.id, course_id: 19},
    {year: "2010-2011", teacher_id: teacher.id, course_id: 20},
    {year: "2015-2016", teacher_id: teacher.id, course_id: 20},
    {year: "2003-2004", teacher_id: teacher.id, course_id: 21},
    {year: "2002-2003", teacher_id: teacher.id, course_id: 22},
    {year: "2001-2002", teacher_id: teacher.id, course_id: 23},
    {year: "2017-2018", teacher_id: teacher.id, course_id: 24}
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


user = User.create!(id: 3, name: "User2 User2", email: "user2@user2.com", password: "123123", confirmed_at: "2018-01-09 20:11:18.430391", admin: false)
user.user_courses.create!([
    { id:5, user_id: user.id, course_id: 1, passed: true}
])

user.course_questions.create!([
    { id:1 , question: Faker::StarWars.quote, frequency: 10, user_id: user.id, course_id: 1},
    { id:2 , question: Faker::StarWars.quote, frequency: 10, user_id: user.id, course_id: 1},
    { id:3 , question: Faker::StarWars.quote, frequency: 10, user_id: user.id, course_id: 1},
    { id:4 , question: Faker::StarWars.quote, frequency: 10, user_id: user.id, course_id: 1},
])

user = User.first
course = Course.first
5.times do
  post = Post.create!(
    message: Faker::HeyArnold.quote,
    user_id: user.id,
    course_id: course.id
  )
  post.comments.create!([
      {content: Faker::Hobbit.quote, user_id: user.id},
      {content: Faker::Hobbit.quote, user_id: User.second.id},
      {content: Faker::Hobbit.quote, user_id: user.id}])
end
user = User.second
5.times do
  post = Post.create!(
      message: Faker::HeyArnold.quote,
      user_id: user.id,
      course_id: course.id
  )
  post.comments.create!([
                            {content: Faker::Hobbit.quote, user_id: user.id},
                            {content: Faker::Hobbit.quote, user_id: User.first.id},
                            {content: Faker::Hobbit.quote, user_id: user.id}])
end
course = Course.second
5.times do
  post = Post.create!(
      message: Faker::HeyArnold.quote,
      user_id: user.id,
      course_id: course.id
  )
  post.comments.create!([
                            {content: Faker::Hobbit.quote, user_id: user.id},
                            {content: Faker::Hobbit.quote, user_id: User.first.id},
                            {content: Faker::Hobbit.quote, user_id: user.id}])
end
user = User.second
5.times do
  post = Post.create!(
      message: Faker::HeyArnold.quote,
      user_id: user.id,
      course_id: course.id
  )
  post.comments.create!([
                            {content: Faker::Hobbit.quote, user_id: user.id},
                            {content: Faker::Hobbit.quote, user_id: User.first.id},
                            {content: Faker::Hobbit.quote, user_id: user.id}])
end


user = User.second
5.times do
  Rep.create!(
               description: Faker::HarryPotter.quote,
               user_id: user.id,
               course_id: course.id,
               offer: true,
               user_competence: Faker::StarWars.quote,
               price_hours: 15,
               place: Faker::Nation.capital_city,
               home_service: true,
               week_days: "Lunedì e Martedì"
  )
end


5.times do
  Rep.create!(
      description: Faker::StarWars.quote,
      user_id: user.id,
      course_id: course.id,
      offer: true,
      price_hours: 0,
      place: Faker::Nation.capital_city,
      week_days: "Giovedì e Sabato"
  )

end

#UserCourse.create!(user_id: User.first.id, course_id: Course.first.id)