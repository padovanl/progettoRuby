# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_21_142706) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "users_id"
    t.bigint "posts_id"
    t.index ["posts_id"], name: "index_comments_on_posts_id"
    t.index ["users_id"], name: "index_comments_on_users_id"
  end

  create_table "course_questions", force: :cascade do |t|
    t.string "question"
    t.integer "frequency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "course_id"
    t.index ["course_id"], name: "index_course_questions_on_course_id"
  end

  create_table "course_tips", force: :cascade do |t|
    t.string "tip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "courses_id"
    t.index ["courses_id"], name: "index_course_tips_on_courses_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "degree_courses_id"
    t.index ["degree_courses_id"], name: "index_courses_on_degree_courses_id"
  end

  create_table "degree_courses", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "document_posts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "posts_id"
    t.bigint "documents_id"
    t.index ["documents_id"], name: "index_document_posts_on_documents_id"
    t.index ["posts_id"], name: "index_document_posts_on_posts_id"
  end

  create_table "document_tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "tags_id"
    t.bigint "documents_id"
    t.index ["documents_id"], name: "index_document_tags_on_documents_id"
    t.index ["tags_id"], name: "index_document_tags_on_tags_id"
  end

  create_table "documents", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.string "content", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "users_id"
    t.bigint "courses_id"
    t.index ["courses_id"], name: "index_posts_on_courses_id"
    t.index ["users_id"], name: "index_posts_on_users_id"
  end

  create_table "reps", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "users_id"
    t.bigint "courses_id"
    t.index ["courses_id"], name: "index_reps_on_courses_id"
    t.index ["users_id"], name: "index_reps_on_users_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teacher_courses", force: :cascade do |t|
    t.string "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "teachers_id"
    t.bigint "courses_id"
    t.index ["courses_id"], name: "index_teacher_courses_on_courses_id"
    t.index ["teachers_id"], name: "index_teacher_courses_on_teachers_id"
  end

  create_table "teachers", force: :cascade do |t|
    t.string "name"
    t.string "surname"
    t.string "link_cv"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "theses", force: :cascade do |t|
    t.string "title"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "teachers_id"
    t.index ["teachers_id"], name: "index_theses_on_teachers_id"
  end

  create_table "thesis_tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "tags_id"
    t.bigint "thesis_id"
    t.index ["tags_id"], name: "index_thesis_tags_on_tags_id"
    t.index ["thesis_id"], name: "index_thesis_tags_on_thesis_id"
  end

  create_table "user_courses", force: :cascade do |t|
    t.integer "rating"
    t.integer "course_rate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "users_id"
    t.bigint "courses_id"
    t.index ["courses_id"], name: "index_user_courses_on_courses_id"
    t.index ["users_id"], name: "index_user_courses_on_users_id"
  end

  create_table "user_notifications", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "users_id"
    t.bigint "notifications_id"
    t.index ["notifications_id"], name: "index_user_notifications_on_notifications_id"
    t.index ["users_id"], name: "index_user_notifications_on_users_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.string "name"
    t.text "image"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "comments", "posts", column: "posts_id"
  add_foreign_key "comments", "users", column: "users_id"
  add_foreign_key "course_questions", "courses"
  add_foreign_key "course_tips", "courses", column: "courses_id"
  add_foreign_key "courses", "degree_courses", column: "degree_courses_id"
  add_foreign_key "document_posts", "documents", column: "documents_id"
  add_foreign_key "document_posts", "posts", column: "posts_id"
  add_foreign_key "document_tags", "documents", column: "documents_id"
  add_foreign_key "document_tags", "tags", column: "tags_id"
  add_foreign_key "posts", "courses", column: "courses_id"
  add_foreign_key "posts", "users", column: "users_id"
  add_foreign_key "reps", "courses", column: "courses_id"
  add_foreign_key "reps", "users", column: "users_id"
  add_foreign_key "teacher_courses", "courses", column: "courses_id"
  add_foreign_key "teacher_courses", "teachers", column: "teachers_id"
  add_foreign_key "theses", "teachers", column: "teachers_id"
  add_foreign_key "thesis_tags", "tags", column: "tags_id"
  add_foreign_key "thesis_tags", "theses"
  add_foreign_key "user_courses", "courses", column: "courses_id"
  add_foreign_key "user_courses", "users", column: "users_id"
  add_foreign_key "user_notifications", "notifications", column: "notifications_id"
  add_foreign_key "user_notifications", "users", column: "users_id"
end
