class Api::V1::UserCoursesController < ApplicationController

  def show
    course_followed = UserCourse.where("course_id = ? AND user_id = ?", params['id'], params['user_id'])
    respond_to do |format|
      format.html
      format.json do
        json_response(course_followed.to_json)
      end
    end
  end

  # l'index di questo controller visto che usa l'utente nel path mi faccio ritornare la pagina da compilare per le statistiche
  # del corso ovvero il sondaggio

  def index

  end

end
