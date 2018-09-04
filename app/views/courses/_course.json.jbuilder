json.extract! course, :id, :name, :year
json.degreen course.degree_course.name
json.degreet course.degree_course.tipo
json.tc_year course.teacher_courses do |y|
  json.year y.year
end
json.teachers course.teachers do |t|
  json.name t.name
  json.surname t.surname
  json.link_cv t.link_cv
end