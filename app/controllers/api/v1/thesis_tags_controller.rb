class Api::V1::ThesisTagsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    thesisTags = ThesisTag.where(:thesis_id => params['thesis_id']).includes([:tag])
    json_response(thesisTags.to_json(include: [:tag]))
  end
  def create
    temp = params['thesisTag']['tag_id']
    #data_parsed = json_decode(temp)
    tagCollegati = ThesisTag.where(thesis_id: params['thesis_id']).where(tag_id: temp).all
    if tagCollegati.length > 0 then
      json_response({error: "Tag gia collegato"})
      return
    end

    thesisTags = ThesisTag.create(thesisTags_params)
    json_response(thesisTags.to_json(include: [:tag]))
  end

  def destroy
    ThesisTag.destroy(params[:id])
  end

  #def update
  #  thesisTags = ThesisTag.find(params[:id])
  #  thesisTags.update_attributes(thesisTags_params)
  #  render json: thesisTags
  #end

  private
  def thesisTags_params
    params.require(:thesisTag).permit(:thesis_id, :tag_id)
  end
end