json.extract! tc, :id, :data, :created_at, :updated_at
json.course_name tc.course.name
json.course_year tc.course.year
json.teacher_name tc.teacher.name
json.teacher_surname tc.teacher.surname
json.teacher_cv tc.teacher.link_cv